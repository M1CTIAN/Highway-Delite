import { XCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
        <div className="flex items-start">
          <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="ml-3 flex-1">
            <h3 className="text-lg font-medium text-red-900 mb-2">Error</h3>
            <p className="text-sm text-red-700">{message}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="mt-4 btn btn-primary text-sm"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
