"use client";

import * as React from "react";
import Image from "next/image";
import { ProductCard } from "../components/ui/product-card-1";
import { Footer } from "../components/ui/Footer";
import { Marquee } from "../components/ui/marquee";
import WaitlistModal from "../components/ui/waitlist-modal";
import EoiModal from "../components/ui/eoi-modal";
import { TemplatePromoCard } from "../components/ui/template-promo-card";
import { NegentropicWorkflowPreview } from "../components/negentropic/NegentropicWorkflowPreview";
import { K8_USED_BY } from "../lib/usedBy";

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

export default function MobileHome() {
  const [waitlistOpen, setWaitlistOpen] = React.useState(false);
  const [eoiOpen, setEoiOpen] = React.useState(false);
  const [clientAcqOpen, setClientAcqOpen] = React.useState(false);
  const [negentropicOpen, setNegentropicOpen] = React.useState(false);

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

            {/* Decorative brand mark — 3×4 pixel ASCII art, IS implementation language */}
            <pre
              aria-hidden="true"
              className="pointer-events-none select-none font-mono text-white opacity-[0.14] overflow-hidden my-2"
              style={{ fontSize: "6px", lineHeight: "1.1", letterSpacing: "0" }}
            >{`▪▪▪ ▪·▪ ▪▪▪ ▪▪▪ ▪·▪ ▪▪▪ ▪·▪ ▪·▪ ▪▪▪ ▪·▪ ▪▪· ·▪▪ ▪▪· ▪▪▪ ▪▪· ▪▪▪ ▪▪▪
·▪· ▪▪▪ ▪▪· ·▪· ▪▪▪ ·▪· ▪▪▪ ▪▪· ·▪· ▪▪▪ ▪·· ▪▪· ▪·▪ ·▪· ▪·▪ ·▪· ·▪·
·▪· ▪·▪ ▪·· ·▪· ▪·▪ ·▪· ▪·▪ ▪·▪ ·▪· ▪·▪ ▪·▪ ·▪▪ ▪▪· ·▪· ▪▪· ·▪· ·▪·
·▪· ▪·▪ ▪▪▪ ·▪· ▪·▪ ▪▪▪ ▪·▪ ▪·▪ ▪▪▪ ▪·▪ ▪▪▪ ▪▪· ▪·· ▪▪▪ ▪·▪ ▪▪▪ ·▪·`}</pre>

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
                  accent="white"
                  eyebrow="Electrochemical Medical Grade Device engineered by Enagic®"
                  imageUrl="/images/newaqua.png"
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
                  usedByItems={K8_USED_BY}
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

                {/* Client Acquisition — mobile only */}
                <div className="block md:hidden">
                  <ProductCard
                    accent="blue"
                    imageUrl="/images/clientacquisition.png"
                    imageUrlMobile="/images/clientacquisition.png"
                    imageUrlDesktop="/images/clientacquisition.png"
                    title="Client Acquisition w/ Llewellyn"
                    toolingLine="Client Acquisition w/ Llewellyn"
                    ctaLabel="Contact me to learn more"
                    specifications={[
                      "Traffic systems engineered to attract ready-to-buy demand",
                      "Structured lead capture & enrichment (no untracked leads)",
                      "Automated qualification to separate buyers from browsers",
                      "AI-driven follow-up & appointment booking (24/7, sub-60s response)",
                      "Accelerated delivery via Negentropic Agentic® Workflows in your I.D.E.",
                    ]}
                    secondaryCtaLabel="Enter Queue"
                    onSecondaryCtaClick={() => setClientAcqOpen(true)}
                  />
                </div>

                {/* Negentropic Agentic Workflows — mobile only */}
                <div className="block md:hidden">
                  <ProductCard
                    accent="yellow"
                    title="Negentropic Agentic Workflows"
                    ctaLabel="View Workflows"
                    specifications={[
                      "Self-annealing agentic workflows built for your I.D.E.",
                      "Open the workflow, enter provided prompts — work done in seconds",
                      "Speech-to-flow: dictate your desired workflow via voice",
                      "Lead generation, document generation & more",
                    ]}
                    headerContent={
                      <NegentropicWorkflowPreview className="rounded-lg overflow-hidden" />
                    }
                    secondaryCtaLabel="Join"
                    onSecondaryCtaClick={() => setNegentropicOpen(true)}
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
      <WaitlistModal
        open={clientAcqOpen}
        onOpenChange={setClientAcqOpen}
        theme="blue"
        title="Enter Queue"
        subtitle="Share your details and Llewellyn will reach out to discuss your client acquisition setup."
        source="blue_client_acquisition_card"
      />
      <WaitlistModal
        open={negentropicOpen}
        onOpenChange={setNegentropicOpen}
        theme="yellow"
        title="Join Waitlist"
        subtitle="Get early access to Negentropic Agentic® Workflows for your I.D.E."
        source="yellow_negentropic_card"
      />
      <EoiModal open={eoiOpen} onOpenChange={setEoiOpen} />
    </>
  );
}
