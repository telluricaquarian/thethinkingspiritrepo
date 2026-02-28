export default function DesktopHome() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="flex">
        <aside className="w-60 border-r border-neutral-200 p-6">
          <div className="mb-8 text-sm font-semibold tracking-wide">TTS</div>
          <nav>
            <ul className="space-y-3 text-sm text-neutral-700">
              <li>Home</li>
              <li>Water Resources</li>
              <li>Tools &amp; Functions</li>
              <li>Products &amp; Services</li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-10">
          <div className="max-w-6xl mx-auto">
            Desktop content placeholder
          </div>
        </main>
      </div>
    </div>
  );
}
