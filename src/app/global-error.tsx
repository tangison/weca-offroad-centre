'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0D0D0D] text-[#F5F5F5] antialiased">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            {/* Error Icon */}
            <div className="w-16 h-16 bg-[#2A2A2A] flex items-center justify-center mx-auto mb-6">
              <span className="text-[#E67E22] text-3xl">!</span>
            </div>

            {/* Title */}
            <h1 className="font-heading text-3xl md:text-4xl text-[#F5F5F5] mb-4">
              Critical Error
            </h1>

            {/* Message */}
            <p className="text-[#888888] text-sm mb-8">
              A critical error occurred. Please refresh the page or try again later.
            </p>

            {/* Action */}
            <button
              onClick={reset}
              className="bg-[#E67E22] hover:bg-[#F39C12] text-[#0D0D0D] font-accent font-semibold uppercase tracking-wider text-sm px-8 py-4 transition-colors"
            >
              Try Again
            </button>

            {/* Help text */}
            <p className="mt-8 text-[#888888]/60 text-xs">
              Contact us:{' '}
              <a
                href="mailto:wecaoffroadcentre@gmail.com"
                className="text-[#E67E22] hover:underline"
              >
                wecaoffroadcentre@gmail.com
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
