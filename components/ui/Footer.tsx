import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10">
      <div className="mx-auto w-full max-w-4xl px-6 pb-8">
        <div className="flex items-start gap-5">
          {/* Square mark (no rounding) */}
          <div className="relative h-12 w-12 shrink-0 sm:h-14 sm:w-14">
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
            <p className="text-[22px] italic text-white/90 sm:text-2xl">
              Building and designing anew.
            </p>
            <p className="mt-1 text-[18px] font-medium text-green-500 sm:text-lg">
              {year}©
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
