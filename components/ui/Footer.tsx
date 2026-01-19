import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10">
      <div className="mx-auto w-full max-w-4xl px-6 pb-8">
        {/* optical alignment with product card */}
        <div className="flex items-start gap-4 -ml-1">
          {/* Square mark (consistent size everywhere) */}
          <div className="relative h-11 w-11 shrink-0">
            <Image
              src="/images/ttsfav.png"
              alt="TTS"
              fill
              className="object-cover"
              priority={false}
            />
          </div>

          {/* Copy */}
          <div className="leading-tight">
            <p className="text-[12px] italic text-white/90 sm:text-2xl">
              Building and designing anew.
            </p>
            <p className="mt-1 text-[10px] font-medium text-green-500 sm:text-lg">
              {year}©
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
