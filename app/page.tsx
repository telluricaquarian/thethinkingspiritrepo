"use client";

import * as React from "react";
import Image from "next/image";
import { ProductCard } from "../components/ui/product-card-1";
import { Footer } from "../components/ui/Footer";
import { Marquee } from "../components/ui/marquee";
import WaitlistModal from "../components/ui/waitlist-modal";
import EoiModal from "../components/ui/eoi-modal";
import { TemplatePromoCard } from "../components/ui/template-promo-card";

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

          {/* PRODUCT CARDS - Bento layout on desktop */}
          <div className="w-full max-w-4xl xl:max-w-6xl mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] xl:items-stretch gap-6">
              {/* Left column: Primary cards */}
              <div className="min-w-0 space-y-6">
                {/* K8 card */}
                <ProductCard
                  accent="green"
                  eyebrow="Electrochemical Medical Grade Device engineered by Enagic®"
                  imageUrl="/images/k8mob.png"
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
                  imageUrlMobile="/images/internal-os.png"
                  rightImageUrlDesktop="/images/internal-os.png"
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

                {/* BLUE: Client Acquisition — mobile only */}
                <div className="block md:hidden">
                  {/* Hero image with signal-flow overlay */}
                  <div className="relative w-full rounded-2xl overflow-hidden mb-4">
                    <Image
                      src="/images/withoutlines.png"
                      alt="Client Acquisition w/ Llewellyn"
                      width={1920}
                      height={1080}
                      className="w-full h-auto"
                      priority
                    />
                    {/* SVG overlay — connector lines + pulse */}
                    <svg
                      viewBox="0 0 1000 563"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      preserveAspectRatio="xMidYMid slice"
                    >
                      {/* Static connector line */}
                      <path
                        d="M 40,260 C 180,250 380,100 640,55"
                        stroke="white"
                        strokeWidth="1"
                        strokeOpacity="0.12"
                      />
                      {/* Secondary connector */}
                      <path
                        d="M 40,310 C 200,300 420,140 640,55"
                        stroke="white"
                        strokeWidth="0.7"
                        strokeOpacity="0.07"
                      />
                      {/* Animated dotted pulse — travels left→right toward top-middle Apollo node */}
                      <path
                        d="M 40,260 C 180,250 380,100 640,55"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeOpacity="0.3"
                        strokeLinecap="round"
                        className="signal-pulse"
                      />
                    </svg>
                  </div>

                  <ProductCard
                    accent="blue"
                    imageUrl="/images/clientacquisition.png"
                    imageUrlMobile="/images/clientacquisition.png"
                    title="Client Acquisition w/ Llewellyn"
                    toolingLine="Client Acquisition w/ Llewellyn"
                    ctaLabel="Contact me to learn more"
                    specifications={[
                      "Traffic → lead capture systems engineered for speed-to-lead",
                      "Structured qualification to separate buyers from browsers",
                      "AI-driven follow-up & appointment booking (24/7, sub-60s response)",
                      "Pipeline visibility with clean CRM handoff for sales conversion",
                      "Accelerated delivery via Negentropic Agentic® Workflows in your I.D.E.",
                    ]}
                    secondaryCtaLabel="Enter Queue"
                    onSecondaryCtaClick={() => setWaitlistOpen(true)}
                  />
                </div>
              </div>

              {/* Right column: Template promo cards (desktop only) */}
              <div className="hidden xl:grid xl:grid-rows-2 xl:gap-6 xl:h-full">
                <TemplatePromoCard
                  variant="bentoHero"
                  imageSrc="/images/LHT.png"
                  title="LHT Template"
                  description="Functional workflows, on-site scheduling, estimates & invoicing."
                  ctaLabel="Purchase"
                  href="https://buy.stripe.com/00wbJ35WndwL8wnc3XfQI03"
                />
                <TemplatePromoCard
                  variant="bentoHero"
                  imageSrc="/images/tts-card3.png"
                  title="TTS Template"
                  description="Want this site as an empty skeletal template?"
                  ctaLabel="Purchase"
                  href="https://buy.stripe.com/5kQ28t2Kb3Wb8wn8RLfQI02"
                />
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </main>

      <WaitlistModal open={waitlistOpen} onOpenChange={setWaitlistOpen} />
      <EoiModal open={eoiOpen} onOpenChange={setEoiOpen} />
    </>
  );
}
