export default function DesktopHome() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="flex">
        <aside className="w-60 border-r border-neutral-200 p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/blacktts.png" alt="TTS" className="mb-8 h-6 w-auto" />
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
          <div className="max-w-[980px] mx-auto pt-20 px-10 space-y-8">
            {/* Top pill */}
            <div className="flex justify-center">
              <span className="rounded-full bg-blue-600 px-4 py-1.5 text-xs text-white shadow-sm">
                Dive into a whole new understanding of water
              </span>
            </div>

            {/* Headline row */}
            <div className="flex items-center gap-6">
              <h1 className="text-3xl font-light whitespace-nowrap">
                Change your life by education and information alone.
              </h1>
              <div className="flex-1 border-t border-gray-300" />
            </div>

            {/* Quote block */}
            <div className="max-w-[760px] space-y-1">
              <p className="text-sm italic text-gray-400">
                Of all electrical phenomena electrolysis appears the most likely to furnish us with a real insight into the true nature of the electric current. because we find currents of ordinary matter and current of electricity forming essential parts of the same phenomenon.
              </p>
              <p className="text-xs text-gray-400">— James Clerk Maxwell</p>
              <p className="text-xs italic text-gray-400">A Treatise on Electricity and Magnetism</p>
              <p className="text-xs italic text-gray-400">Vol. 1, Oxford, 1873</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
