import initSqlJs, { Database, SqlJsStatic } from 'sql.js';

export interface QueryResult {
  columns: string[];
  values: any[][];
  rowCount: number;
}

export interface QueryError {
  message: string;
  sql: string;
}

class SQLEngineService {
  private sqlJs: SqlJsStatic | null = null;
  private database: Database | null = null;
  private isInitialized: boolean = false;
  private readonly MAX_ROWS = 1000;

  async initialize(): Promise<void> {
    if (this.isInitialized && this.sqlJs) {
      return;
    }

    try {
      // Load SQL.js library
      // Load WASM file from public folder (production-ready)
      const SQL = await initSqlJs({
        locateFile: (file: string) => {
          // Use local WASM file from public folder
          if (file.endsWith('.wasm')) {
            return `/sqljs/${file}`;
          }
          return file;
        }
      });

      this.sqlJs = SQL;
      this.isInitialized = true;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to initialize SQL.js:', error);
      }
      throw new Error('Failed to initialize SQL engine. Please refresh the page and try again.');
    }
  }

  async loadDatabase(dbBytes: Uint8Array): Promise<void> {
    if (!this.isInitialized || !this.sqlJs) {
      await this.initialize();
    }

    try {
      // Close existing database if any
      if (this.database) {
        this.database.close();
        this.database = null;
      }

      // Validate that we have valid bytes
      if (!dbBytes || dbBytes.length === 0) {
        throw new Error('Invalid database file: file is empty');
      }

      // Check for SQLite magic header
      const header = String.fromCharCode(...Array.from(dbBytes.slice(0, 16)));
      if (!header.startsWith('SQLite format 3')) {
        throw new Error('Invalid database file: not a valid SQLite database');
      }

      // Load new database from bytes
      this.database = new this.sqlJs.Database(dbBytes);
      
      // Validate database by running a simple test query
      try {
        this.database.exec('SELECT 1');
      } catch (testError) {
        this.database.close();
        this.database = null;
          throw new Error('Database file is corrupted or invalid');
        }
    } catch (error: any) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to load database:', error);
      }
      if (this.database) {
        this.database.close();
        this.database = null;
      }
      throw new Error(error.message || 'Failed to load database. Please try again.');
    }
  }

  async executeQuery(query: string): Promise<QueryResult> {
    if (!this.database) {
      throw new Error('No database loaded. Please select a dataset first.');
    }

    if (!this.isInitialized || !this.sqlJs) {
      throw new Error('SQL engine not initialized. Please refresh the page.');
    }

    if (!query || !query.trim()) {
      throw new Error('Query cannot be empty.');
    }

    // Sanitize query - only allow SELECT statements (read-only)
    // Use regex to detect actual SQL statements, not just keyword presence in strings
    const trimmedQuery = query.trim();
    
    // Remove comments and strings to avoid false positives
    const withoutComments = trimmedQuery.replace(/--.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
    const withoutStrings = withoutComments.replace(/['"`][^'"`]*['"`]/g, '');
    const cleanQuery = withoutStrings.toUpperCase();
    
    // Check for forbidden statements using regex (must be at statement start or after semicolon)
    const forbiddenPatterns = [
      /^\s*(INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|TRUNCATE|EXEC|EXECUTE)/i,
      /;\s*(INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|TRUNCATE|EXEC|EXECUTE)/i
    ];
    
    for (const pattern of forbiddenPatterns) {
      if (pattern.test(cleanQuery)) {
        const match = cleanQuery.match(pattern);
        const keyword = match?.[1] || match?.[2];
        throw new Error(`For security reasons, ${keyword} statements are not allowed. Only SELECT queries are permitted.`);
      }
    }

    try {
      // Execute query
      const result = this.database.exec(query);

      if (result.length === 0) {
        return {
          columns: [],
          values: [],
          rowCount: 0
        };
      }

      // Get first result set
      const firstResult = result[0];
      let values = firstResult.values;

      // Limit rows to prevent memory issues
      if (values.length > this.MAX_ROWS) {
        values = values.slice(0, this.MAX_ROWS);
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Result set truncated to ${this.MAX_ROWS} rows`);
        }
      }

      return {
        columns: firstResult.columns,
        values: values,
        rowCount: firstResult.values.length
      };
    } catch (error: any) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Query execution error:', error);
      }
      throw new Error(error.message || 'Failed to execute query. Please check your SQL syntax.');
    }
  }

  async getTableSchema(tableName: string): Promise<{ name: string; type: string; notnull: number; dflt_value: any; pk: number }[]> {
    if (!this.database) {
      throw new Error('No database loaded.');
    }

    try {
      const result = this.database.exec(`PRAGMA table_info(${tableName})`);
      
      if (result.length === 0) {
        return [];
      }

      const columns = result[0].columns;
      const values = result[0].values;

      return values.map((row: any[]) => {
        const column: any = {};
        columns.forEach((colName: string, index: number) => {
          column[colName] = row[index];
        });
        return column;
      });
    } catch (error: any) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error getting table schema:', error);
      }
      throw new Error(`Failed to get schema for table ${tableName}`);
    }
  }

  async getTableNames(): Promise<string[]> {
    if (!this.database) {
      throw new Error('No database loaded.');
    }

    try {
      const result = this.database.exec(`
        SELECT name FROM sqlite_master 
        WHERE type='table' AND name NOT LIKE 'sqlite_%'
        ORDER BY name
      `);

      if (result.length === 0) {
        return [];
      }

      return result[0].values.map((row: any[]) => row[0] as string);
    } catch (error: any) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error getting table names:', error);
      }
      return [];
    }
  }

  getDatabase(): Database | null {
    return this.database;
  }

  getSqlJs(): SqlJsStatic | null {
    return this.sqlJs;
  }

  isReady(): boolean {
    return this.isInitialized && this.database !== null;
  }

  close(): void {
    try {
      if (this.database) {
        this.database.close();
        this.database = null;
        }
    } catch (error) {
      // Silently handle close errors
      if (process.env.NODE_ENV === 'development') {
        console.warn('Error closing database:', error);
      }
      this.database = null;
    }
  }
}

export const sqlEngineService = new SQLEngineService();

