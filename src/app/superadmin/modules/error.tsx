'use client';

import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle
            className="text-destructive"
            size={64}
            strokeWidth={1.5}
          />
        </div>

        <h1 className="text-3xl font-bold text-foreground">
          Oops! Something went wrong
        </h1>

        <p className="text-muted-foreground mb-4">
          We encountered an unexpected error. Don&apos;t worry, we&apos;re here
          to help.
        </p>

        {error.digest && (
          <div className="bg-muted p-3 rounded-lg text-sm text-muted-foreground">
            <p>Error ID: {error.digest}</p>
          </div>
        )}

        <div className="flex flex-col space-y-4">
          <button onClick={() => reset()} className="w-full">
            Try Again
          </button>

          <button
            onClick={() => (window.location.href = '/')}
            className="w-full"
          >
            Return to Home
          </button>
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          If the problem persists, please contact support with the Error ID.
        </p>
      </div>
    </div>
  );
}
