import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import NeumorphicCard from './NeumorphicCard';
import NeumorphicButton from './NeumorphicButton';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleRefresh = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/dashboard';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-aris-gradient flex items-center justify-center p-4">
          <NeumorphicCard variant="floating" padding="xl" className="max-w-2xl w-full text-center">
            <img 
              src="/logo_icon_1024.png" 
              alt="ARIS Logo" 
              className="w-16 h-16 mx-auto mb-4"
            />
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-400 to-red-500 rounded-full mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-gray-100" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-100 mb-4">Oops! Something went wrong</h1>
            <p className="text-gray-200 mb-6">
              We're sorry, but something unexpected happened. Our team has been notified and is working to fix this issue.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <NeumorphicCard variant="pressed" padding="md" className="mb-6 text-left">
                <h3 className="font-semibold text-gray-100 mb-2">Error Details:</h3>
                <pre className="text-sm text-red-600 overflow-auto">
                  {this.state.error.toString()}
                </pre>
                {this.state.errorInfo && (
                  <pre className="text-xs text-gray-300 mt-2 overflow-auto">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </NeumorphicCard>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NeumorphicButton
                variant="accent"
                size="lg"
                onClick={this.handleRefresh}
                icon={RefreshCw}
              >
                Try Again
              </NeumorphicButton>
              
              <NeumorphicButton
                variant="secondary"
                size="lg"
                onClick={this.handleGoHome}
                icon={Home}
              >
                Go to Dashboard
              </NeumorphicButton>
            </div>
          </NeumorphicCard>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
