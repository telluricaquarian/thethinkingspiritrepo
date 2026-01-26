"use client";

import * as React from "react";
import Image from "next/image";
import { ProductCard } from "../components/ui/product-card-1";
import { Footer } from "../components/ui/Footer";
import { Marquee } from "../components/ui/marquee";
import WaitlistModal from "../components/ui/waitlist-modal";
import EoiModal from "../components/ui/eoi-modal";

function ProfilePill() {
  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      <div className="relative overflow-hidden rounded-[22px] border border-white/20 bg-gradient-to-r from-white/10 via-white/5 to-white/0 px-6 py-5">
        {/* Ghost marquee background */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center opacity-[0.12] blur-[0.5px]">
          <Marquee
            text="Building and designing anew"
            duration={18}
            repeat={14}
            className="w-full"
          >
            <span className="inline-flex ml-1">
              <span className="typing-dot">.</span>
              <span className="typing-dot delay-1">.</span>
              <span className="typing-dot delay-2">.</span>
            </span>
          </Marquee>
        </div>

        {/* subtle green edge accent */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[6px] bg-green-500/70" />

        <div className="relative z-10 flex items-center gap-4">
          {/* avatar */}
          <div className="relative h-14 w-14 overflow-hidden rounded-full ring-1 ring-white/20 bg-black/60">
            <Image
              src="/images/displaypicture.png"
              alt="Llewellyn Y. Fisher"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-medium text-green-400">
              @thethinkingspirit
            </p>
            <p className="truncate text-xl font-semibold text-white">
              Llewellyn Y. Fisher
            </p>
            {/* MOBILE FIX HERE */}
            <p className="truncate text-sm sm:text-base text-white/55">
              Agency Owner &amp; Product Distributor
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [waitlistOpen, setWaitlistOpen] = React.useState(false);
  const [eoiOpen, setEoiOpen] = React.useState(false);

  return (
    <>
      <main className="relative min-h-screen bg-black text-white flex items-start justify-center p-6">
        <div className="w-full">
          <ProfilePill />

          {/* HERO INTRO COPY */}
          <div className="w-full max-w-4xl mx-auto mb-10 px-1">
            <p className="text-lg text-white mb-2">
              Welcome to my custom modular / bento links repo.
            </p>

            <p className="text-lg font-medium text-green-400">
              Currently building &amp; designing
              <span className="inline-flex ml-1">
                <span className="typing-dot">.</span>
                <span className="typing-dot delay-1">.</span>
                <span className="typing-dot delay-2">.</span>
              </span>
            </p>
          </div>

          {/* PRODUCT CARDS */}
          <div className="w-full max-w-4xl mx-auto space-y-6">
            {/* K8 card */}
            <ProductCard
              accent="green"
              eyebrow="Electrochemical Device engineered by Enagic®"
              imageUrl="/images/schematictypebeat2.png"
              title="Leveluk K8 Water Ionizer"
              specifications={[
                "8 platinum-coated titanium plates for high ORP stability",
                "Electrolyzed, hydrogen-rich water (et al. 2025)",
                "Supports cellular hydration & metabolic efficiency",
                "Reduced deuterium concentration vs. standard water",
                "Designed for long-term daily use & durability",
              ]}
              price={6787}
              currencyLabel="AUD"
              isAssured={true}
              bankOffer="Payment options available · From ~$252/mo (E-Payment or finance)"
              ctaLabel="Contact for Procurement"
              usedByItems={[
                {
                  name: "Bryson DeChambeau",
                  handle: "@brysondechambeau",
                  role: "Professional Golfer",
                  avatarSrc: "/images/bryson.jpeg",
                  verified: true,
                },
                {
                  name: "Wardell Stephen Curry II",
                  handle: "@stephencurry30",
                  role: "Olympic Gold Medalist",
                  avatarSrc: "/images/stephencurry.jpeg",
                  verified: true,
                },
                {
                  name: "Jhene Aiko Efuru Chilombo",
                  handle: "@jheneaiko",
                  role: "Musician",
                  avatarSrc: "/images/jheneaiko.jpg",
                  verified: true,
                },
                {
                  name: "Diplo",
                  handle: "@diplo",
                  role: "DJ / Producer",
                  avatarSrc: "/images/diplo.jpeg",
                  verified: true,
                },
              ]}
              secondaryCtaLabel="Inquire"
              onSecondaryCtaClick={() => setEoiOpen(true)}
            />

            {/* ORANGE: Areculateir service delivery */}
            <ProductCard
              accent="orange"
              imageUrl="/images/onitos.png"
              imageUrlMobile="/images/orangeservice2.png"
              imageUrlDesktop="/images/orangeservice2.png"
              title="Full-Stack Build"
              specifications={[
                "High-end UI build with conversion-first layout + polish",
                "Automation & integrations (forms, email, CRM, Sheets, etc.)",
                "Fast iteration: ship in stages (prototype → MVP → scale)",
                "Optional AI/agentic workflows where it actually helps",
              ]}
              price={2800}
              currencyLabel="AUD"
              bankOffer="Payment options also available"
              ctaLabel="Contact to join Waitlist"
              toolingLine="VS Code · Claude Code · UI Libraries"
              secondaryCtaLabel="Join"
              onSecondaryCtaClick={() => setWaitlistOpen(true)}
            />
          </div>

          <Footer />
        </div>
      </main>

      <WaitlistModal open={waitlistOpen} onOpenChange={setWaitlistOpen} />
      <EoiModal open={eoiOpen} onOpenChange={setEoiOpen} />
    </>
  );
}
