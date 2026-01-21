import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10">
      {/* Match card container geometry */}
      <div className="relative mx-auto w-full max-w-4xl px-6 pb-10">
        <div className="flex items-center gap-4">
          {/* Figma mark size: 34x34 (no rounding) */}
          <div className="relative h-[34px] w-[34px] shrink-0">
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
            <p className="text-[12px] italic text-white/90 sm:text-[14px]">
              Building and designing anew.
            </p>
            <p className="mt-1 text-[10px] font-medium text-green-500 sm:text-[12px]">
              {year}©
            </p>
          </div>
        </div>

        {/* Script logotype – bottom right */}
        <div className="absolute bottom-0 right-0 h-[34px] w-[34px]">
          <Image
            src="/images/telluricaquarian.png"
            alt="Telluric Aquarian"
            fill
            className="object-contain"
            priority={false}
          />
        </div>
      </div>
    </footer>
  );
}
