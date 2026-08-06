'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RefreshCw, Home, Mail } from 'lucide-react';

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
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Error Icon */}
        <div className="w-16 h-16 bg-[#2A2A2A] flex items-center justify-center mx-auto mb-6">
          <span className="text-[#E67E22] text-3xl">!</span>
        </div>

        {/* Title */}
        <h1 className="font-heading text-3xl md:text-4xl text-[#F5F5F5] mb-4">
          Something Went Wrong
        </h1>

        {/* Message */}
        <p className="text-muted-foreground text-sm mb-8">
          We encountered an unexpected error. Please try again, or contact us if the problem persists.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Button
            onClick={reset}
            className="bg-[#E67E22] hover:bg-[#F39C12] text-[#0D0D0D] font-accent font-semibold uppercase tracking-wider"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Button asChild variant="outline" className="border-[#2A2A2A] text-[#F5F5F5] hover:border-[#E67E22] font-accent uppercase tracking-wider">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Back Home
            </Link>
          </Button>
        </div>

        {/* Help text */}
        <p className="text-muted-foreground/80 text-xs">
          If this keeps happening,{' '}
          <a
            href="https://wa.me/264811691942"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E67E22] hover:underline"
          >
            let us know
          </a>
        </p>
      </div>
    </div>
  );
}
