import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto flex max-w-5xl items-start gap-6 px-6 py-10">
        {/* Mark */}
        <div className="shrink-0">
          <div className="relative h-16 w-16 overflow-hidden rounded-[10px] bg-black/40 ring-1 ring-white/10">
            <Image
              src="/images/ttsfav.png"
              alt="TTS"
              fill
              className="object-cover"
              priority={false}
            />
          </div>
        </div>

        {/* Copy */}
        <div className="leading-tight">
          <p className="text-2xl italic text-white/90">
            Building and designing anew.
          </p>
          <p className="mt-2 text-lg font-medium text-green-500">
            {year}©
          </p>
        </div>
      </div>
    </footer>
  );
}
