export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        {/* Spinner */}
        <div className="w-10 h-10 border-2 border-[#2A2A2A] border-t-[#E67E22] animate-spin mx-auto mb-4" style={{ borderRadius: 0 }} />
        
        {/* Loading text */}
        <p className="text-muted-foreground text-sm font-accent uppercase tracking-wider">
          Loading...
        </p>
      </div>
    </div>
  );
}
