export default function BreakpointBadge() {
  return (
    <div className="fixed bottom-2 left-2 z-[100] rounded bg-black/80 px-3 py-1.5 font-mono text-xs text-white shadow-lg backdrop-blur-sm pointer-events-none">
      <span className="sm:hidden">base (до 640px)</span>
      <span className="hidden sm:inline md:hidden">sm (від 640px)</span>
      <span className="hidden md:inline lg:hidden">md (від 768px)</span>
      <span className="hidden lg:inline xl:hidden">lg (від 1024px)</span>
      <span className="hidden xl:inline">xl (від 1280px)</span>
    </div>
  )
}
