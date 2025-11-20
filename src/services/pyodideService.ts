import { loadPyodide, PyodideInterface } from 'pyodide';

export interface PythonExecutionResult {
  output: string;
  error: string | null;
  returnValue: any;
  executionTime: number;
}

class PyodideService {
  private pyodide: PyodideInterface | null = null;
  private isInitialized: boolean = false;
  private readonly TIMEOUT_MS = 10000; // 10 seconds
  private readonly PACKAGES = ['pandas', 'numpy', 'matplotlib', 'micropip'];
  private readonly MAX_CODE_LENGTH = 50000; // 50KB max code length
  private readonly MAX_EXECUTIONS_PER_MINUTE = 20; // Rate limiting
  private executionTimestamps: number[] = [];
  private lastMemoryCleanup: number = 0;
  private readonly MEMORY_CLEANUP_INTERVAL = 60000; // Clean memory every minute

  async initialize(): Promise<void> {
    if (this.isInitialized && this.pyodide) {
      return;
    }

    try {
      // Suppress Pyodide loader warnings for error-stack-parser and stackframe
      // These are non-critical internal dependencies that may fail to load
      const originalWarn = console.warn;
      const originalError = console.error;
      const suppressedMessages = [
        'error-stack-parser',
        'stackframe',
        'Duplicate definition of module',
        'Loading "stackframe" failed',
        'Failed to load resource: stackframe'
      ];

      const suppressPyodideWarnings = (...args: any[]) => {
        const message = args.join(' ');
        const shouldSuppress = suppressedMessages.some(msg => 
          message.includes(msg)
        );
        if (!shouldSuppress) {
          originalWarn.apply(console, args);
        }
      };

      const suppressPyodideErrors = (...args: any[]) => {
        const message = args.join(' ');
        const shouldSuppress = suppressedMessages.some(msg => 
          message.includes(msg)
        );
        if (!shouldSuppress) {
          originalError.apply(console, args);
        }
      };

      // Temporarily replace console methods during Pyodide loading
      console.warn = suppressPyodideWarnings;
      console.error = suppressPyodideErrors;

      try {
        // Load Pyodide from CDN (use version-agnostic URL or match package version)
        this.pyodide = await loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
        });
      } finally {
        // Restore original console methods
        console.warn = originalWarn;
        console.error = originalError;
      }

      // Install essential packages
      await this.pyodide.loadPackage(this.PACKAGES);

      // Set up matplotlib to work in browser
      await this.pyodide.runPython(`
        import matplotlib
        matplotlib.use('Agg')
        import matplotlib.pyplot as plt
        import io
        import base64
      `);

      // Configure stdout/stderr capture
      await this.pyodide.runPython(`
        import sys
        from io import StringIO
        
        class OutputCapture:
            def __init__(self):
                self.buffer = StringIO()
            
            def write(self, s):
                self.buffer.write(s)
            
            def flush(self):
                pass
            
            def getvalue(self):
                return self.buffer.getvalue()
        
        stdout_capture = OutputCapture()
        stderr_capture = OutputCapture()
        sys.stdout = stdout_capture
        sys.stderr = stderr_capture
      `);

      this.isInitialized = true;
      this.lastMemoryCleanup = Date.now();
    } catch (error) {
      // Only log critical initialization errors
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to initialize Pyodide:', error);
      }
      throw new Error('Failed to initialize Python engine. Please refresh the page and try again.');
    }
  }

  private cleanupOldExecutions(): void {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    this.executionTimestamps = this.executionTimestamps.filter(timestamp => timestamp > oneMinuteAgo);
  }

  private checkRateLimit(): void {
    this.cleanupOldExecutions();
    if (this.executionTimestamps.length >= this.MAX_EXECUTIONS_PER_MINUTE) {
      throw new Error('Rate limit exceeded. Please wait a moment before executing more code.');
    }
    this.executionTimestamps.push(Date.now());
  }

  private performMemoryCleanup(): void {
    const now = Date.now();
    if (now - this.lastMemoryCleanup > this.MEMORY_CLEANUP_INTERVAL && this.pyodide) {
      try {
        this.pyodide.runPython(`
          import gc
          gc.collect()
        `);
        this.lastMemoryCleanup = now;
      } catch {
        // Silent cleanup failure
      }
    }
  }

  async executeCode(code: string): Promise<PythonExecutionResult> {
    if (!this.isInitialized || !this.pyodide) {
      await this.initialize();
    }

    if (!code || !code.trim()) {
      throw new Error('Code cannot be empty.');
    }

    // Validate code length
    if (code.length > this.MAX_CODE_LENGTH) {
      throw new Error(`Code is too long. Maximum length is ${this.MAX_CODE_LENGTH} characters.`);
    }

    // Check rate limit
    this.checkRateLimit();

    // Perform periodic memory cleanup
    this.performMemoryCleanup();

    const startTime = Date.now();
    let output = '';
    let error: string | null = null;
    let returnValue: any = null;

    try {
      // Reset stdout/stderr buffers
      this.pyodide!.runPython(`
        stdout_capture.buffer = StringIO()
        stderr_capture.buffer = StringIO()
      `);

      // Execute code with timeout protection
      const executePromise = this.pyodide!.runPythonAsync(code);
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Code execution timed out. Please check for infinite loops.')), this.TIMEOUT_MS);
      });

      try {
        returnValue = await Promise.race([executePromise, timeoutPromise]);
      } catch (execError: any) {
        if (execError.message.includes('timed out')) {
          throw execError;
        }
        // Capture Python exceptions
        error = execError.message || String(execError);
      }

      // Get captured output
      try {
        const stdoutResult = this.pyodide!.runPython('stdout_capture.getvalue()');
        const stderrResult = this.pyodide!.runPython('stderr_capture.getvalue()');

        output = stdoutResult || '';
        if (stderrResult && !error) {
          output += stderrResult;
        }
      } catch {
        // Output capture failed, continue silently
      }

      // Check for matplotlib figures
      try {
        const hasFigure = this.pyodide!.runPython('plt.get_fignums()');
        if (hasFigure && hasFigure.length > 0) {
          // Convert figure to base64 image
          const imageBase64 = this.pyodide!.runPython(`
            import io
            import base64
            
            buf = io.BytesIO()
            plt.savefig(buf, format='png', bbox_inches='tight')
            buf.seek(0)
            img_str = base64.b64encode(buf.read()).decode()
            plt.close('all')
            img_str
          `);
          
          if (imageBase64) {
            output = `<img src="data:image/png;base64,${imageBase64}" alt="Plot" style="max-width: 100%;" />\n${output}`;
          }
        }
      } catch {
        // No plot generated, continue
      }

    } catch (execError: any) {
      // Only log in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Python execution error:', execError);
      }
      error = execError.message || 'Failed to execute Python code. Please check your syntax.';
    }

    const executionTime = Date.now() - startTime;

    return {
      output: output.trim(),
      error,
      returnValue,
      executionTime
    };
  }

  async loadPackage(packageName: string): Promise<void> {
    if (!this.isInitialized || !this.pyodide) {
      await this.initialize();
    }

    try {
      await this.pyodide!.loadPackage(packageName);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`Failed to load package ${packageName}:`, error);
      }
      throw new Error(`Failed to load package: ${packageName}`);
    }
  }

  async setVariable(name: string, value: any): Promise<void> {
    if (!this.isInitialized || !this.pyodide) {
      await this.initialize();
    }

    try {
      this.pyodide!.globals.set(name, value);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`Failed to set variable ${name}:`, error);
      }
      throw new Error(`Failed to set variable: ${name}`);
    }
  }

  async getVariable(name: string): Promise<any> {
    if (!this.isInitialized || !this.pyodide) {
      await this.initialize();
    }

    try {
      return this.pyodide!.globals.get(name);
    } catch {
      return null;
    }
  }

  reset(): void {
    if (this.pyodide) {
      try {
        // Clear Python namespace
        this.pyodide.runPython(`
          import sys
          import gc
          gc.collect()
        `);
      } catch {
        // Silent cleanup failure
      }
    }
  }

  isReady(): boolean {
    return this.isInitialized && this.pyodide !== null;
  }

  close(): void {
    try {
      if (this.pyodide) {
        this.reset();
        this.pyodide = null;
        this.isInitialized = false;
        this.executionTimestamps = [];
      }
    } catch {
      // Silent cleanup failure
      this.pyodide = null;
      this.isInitialized = false;
      this.executionTimestamps = [];
    }
  }
}

export const pyodideService = new PyodideService();

