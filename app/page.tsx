"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { Aperture, ArrowRight, CalendarCheck, Play } from "lucide-react";

const bookingHref = "https://calendly.com/keyvisualsdfw";
const logoSrc = "/Logos/Key Visuals Logo.jpg";
const salesVideoSrc = "/Videos/Advertisement%202.mp4";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const proofItems = [
  "Athletes + fitness brands",
  "Campaign reels",
  "Launch cutdowns",
  "Social assets",
  "Brand stories",
];

const portfolio = [
  {
    title: "Fight Week Energy",
    category: "Athlete x Brand Campaign",
    metric: "77.1K views",
    videoSrc: "/Videos/LOOPS/AB REEL LOOP.mp4",
  },
  {
    title: "Lineman Performance Coach",
    category: "Fitness brand",
    metric: "20% booking lift",
    videoSrc: "/Videos/LOOPS/DHAWK REEL LOOP.mp4",
  },
  {
    title: "Spring Collection",
    category: "Clothing brand",
    metric: "12 short form assets",
    videoSrc: "/Videos/LOOPS/LA Volonte Loop.mp4",
  },
];

const contentSystem = [
  {
    title: "Strategy",
    body: "Campaign angle, audience, offer, and shot plan.",
    items: ["Audience mapping", "Creative direction", "Shot list"],
  },
  {
    title: "Production",
    body: "Cinematic assets built for social campaigns.",
    items: ["Brand shoots", "Launch films", "Reels"],
  },
  {
    title: "Distribution",
    body: "Edits sequenced for attention, trust, and action.",
    items: ["Posting direction", "Asset sequencing", "Review"],
  },
];

const process = [
  {
    step: "01",
    title: "Build the content angle",
    body: "Story, offer, audience, proof.",
  },
  {
    step: "02",
    title: "Capture cinematic assets",
    body: "Authority, emotion, identity.",
  },
  {
    step: "03",
    title: "Cut for attention and conversion",
    body: "Hooks, rhythm, retention, action.",
  },
  {
    step: "04",
    title: "Review performance and refine",
    body: "Review response. Sharpen the next batch.",
  },
];

function LogoMark({ className = "" }: { className?: string }) {
  return (
    <Image
      src={logoSrc}
      alt="Key Visuals"
      width={1254}
      height={1254}
      priority
      className={`invert ${className}`}
    />
  );
}

function PrimaryCTA({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={bookingHref}
      className={`group inline-flex min-h-12 items-center justify-center gap-3 border border-white bg-white px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-black transition duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black ${className}`}
    >
      <CalendarCheck size={17} strokeWidth={2.2} />
      <span>{children}</span>
      <ArrowRight
        size={17}
        strokeWidth={2.2}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </a>
  );
}

function SecondaryCTA({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="inline-flex min-h-12 items-center justify-center border border-white/35 px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition duration-300 hover:border-white hover:bg-white hover:text-black"
    >
      {children}
    </a>
  );
}

function FrameCorners({ subtle = false }: { subtle?: boolean }) {
  const color = subtle ? "border-white/35" : "border-white/55";

  return (
    <>
      <span className={`absolute left-4 top-4 h-6 w-6 border-l border-t ${color}`} />
      <span className={`absolute right-4 top-4 h-6 w-6 border-r border-t ${color}`} />
      <span className={`absolute bottom-4 left-4 h-6 w-6 border-b border-l ${color}`} />
      <span className={`absolute bottom-4 right-4 h-6 w-6 border-b border-r ${color}`} />
    </>
  );
}

function VideoFrame({
  title,
  category,
  metric,
  videoSrc,
}: {
  title: string;
  category: string;
  metric: string;
  videoSrc: string;
}) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="group relative min-h-[390px] overflow-hidden border border-white/20 bg-black lg:min-h-[610px]"
    >
      <video
        src={videoSrc}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105 group-hover:contrast-125 lg:grayscale lg:group-hover:grayscale-0"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={`${title} portfolio video`}
      />
      <div className="absolute inset-0 bg-black/18 transition duration-500 group-hover:bg-black/12 lg:bg-black/28 lg:group-hover:bg-black/18" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.72),transparent_26%,rgba(0,0,0,.78)_88%)]" />
      <FrameCorners subtle />
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-white/58">
          {category}
        </p>
        <h3 className="mt-3 max-w-lg text-3xl font-black uppercase leading-[0.9] tracking-tight text-white sm:text-4xl">
          {title}
        </h3>
        <div className="mt-5 inline-flex border border-white/25 bg-black/45 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-white backdrop-blur">
          {metric}
        </div>
      </div>
    </motion.article>
  );
}

function SalesHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  function playSalesVideo() {
    void videoRef.current?.play();
  }

  return (
    <div className="relative overflow-hidden bg-black shadow-2xl shadow-black/60">
      <video
        ref={videoRef}
        src={salesVideoSrc}
        className="aspect-[9/16] w-full bg-black object-contain"
        controls
        playsInline
        preload="metadata"
        aria-label="Key Visuals sales video"
        onPlay={() => setHasStarted(true)}
      />
      <button
        type="button"
        onClick={playSalesVideo}
        aria-label="Watch the Key Visuals sales video"
        className={`absolute inset-0 flex items-center justify-center bg-black transition-opacity duration-500 ${
          hasStarted ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <LogoMark className="w-[86%] max-w-[420px] object-contain opacity-100" />
        <span className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3 bg-black/70 px-4 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-white backdrop-blur transition duration-300 hover:bg-white hover:text-black sm:bottom-10">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white bg-white text-black">
            <Play size={16} fill="currentColor" />
          </span>
          Watch
        </span>
      </button>
    </div>
  );
}

function AccordionItem({
  id,
  number,
  label,
  title,
  children,
}: {
  id: string;
  number: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details id={id} className="group border-b border-white/12 last:border-b-0">
      <summary className="grid cursor-pointer list-none gap-3 px-5 py-5 transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:gap-5 sm:px-8 sm:py-7 lg:grid-cols-[0.22fr_1fr_auto] lg:items-center lg:px-10 [&::-webkit-details-marker]:hidden">
        <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.24em] text-white/50">
          <span className="text-white/35">{number}</span>
          <span className="h-px w-8 bg-white/30" />
          {label}
        </div>
        <h2 className="text-2xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-6xl">
          {title}
        </h2>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/25 text-white transition group-open:bg-white group-open:text-black">
          <Play
            aria-hidden="true"
            size={17}
            fill="currentColor"
            className="ml-0.5 transition group-open:rotate-90"
          />
        </span>
      </summary>
      <div className="px-5 pb-8 sm:px-8 lg:px-10">{children}</div>
    </details>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <section className="relative border-b border-white/10 px-5 pb-10 pt-5 sm:px-8 sm:pb-14 lg:px-12">
        <div className="absolute inset-0 hero-media" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.25),#000_95%)]" />

        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between border-b border-white/15 pb-4">
          <a href="#top" className="flex items-center gap-3">
            <LogoMark className="h-12 w-12 object-cover sm:h-11 sm:w-11" />
            <span className="text-base font-black uppercase tracking-[0.24em] sm:text-sm sm:tracking-[0.32em]">
              Key Visuals
            </span>
          </a>
          <a
            href={bookingHref}
            className="border border-white/35 px-4 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black"
          >
            Book
          </a>
        </nav>

        <motion.div
          id="top"
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 mx-auto grid max-w-7xl items-center gap-5 pt-8 sm:min-h-[760px] sm:gap-7 sm:pt-10 lg:min-h-[calc(100vh-5rem)] lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:pt-12"
        >
          <div>
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="mb-4 flex max-w-md items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/55 sm:mb-5 sm:text-[11px] sm:tracking-[0.3em]"
            >
              <Aperture size={16} />
              Content systems for demand
            </motion.div>
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-5xl text-balance text-[2.82rem] font-black uppercase leading-[0.86] tracking-[-0.045em] text-white sm:text-7xl lg:text-8xl xl:text-9xl"
            >
              Premium content that turns attention into demand
            </motion.h1>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-5 max-w-2xl border-l border-white/35 pl-5 text-base leading-7 text-white/70 sm:mt-6 sm:text-xl sm:leading-8"
            >
              Cinematic content systems for athletes, fitness brands, and
              lifestyle teams built to create trust, demand, and action.
            </motion.p>
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center"
            >
              <PrimaryCTA>Book a call</PrimaryCTA>
              <SecondaryCTA href="#portfolio">Watch work</SecondaryCTA>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-[250px] sm:max-w-[320px] lg:max-w-[420px]"
          >
            <SalesHeroVideo />
          </motion.div>
        </motion.div>
      </section>

      <section className="border-b border-white/10 px-5 py-6 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-px bg-white/15 md:grid-cols-5">
          {proofItems.map((item) => (
            <div
              key={item}
              className="bg-black px-4 py-4 text-sm font-bold leading-6 text-white/70"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#050505] px-0 py-6 sm:py-10">
        <div className="mx-auto max-w-7xl border-y border-white/12">
          <AccordionItem
            id="portfolio"
            number="01"
            label="Portfolio"
            title="Cinematic frames. Measurable intent."
          >
            <p className="mb-6 max-w-2xl text-base leading-7 text-white/58">
              Documentary energy. Social-first edits. Clear intent.
            </p>
            <div className="grid gap-5 lg:grid-cols-3">
              {portfolio.map((item) => (
                <VideoFrame key={item.title} {...item} />
              ))}
            </div>
            <div className="mt-6 border border-white/15 p-5 sm:hidden">
              <PrimaryCTA className="w-full">Book a call</PrimaryCTA>
            </div>
          </AccordionItem>

          <AccordionItem
            id="content-system"
            number="02"
            label="Content System"
            title="Strategy. Production. Distribution."
          >
            <div className="grid gap-px bg-white/15 lg:grid-cols-3">
              {contentSystem.map((service, index) => (
                <article key={service.title} className="bg-black p-6 sm:p-7">
                  <p className="text-sm font-black text-white/35">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-8 text-3xl font-black uppercase leading-none tracking-tight text-white">
                    {service.title}
                  </h3>
                  <p className="mt-5 leading-7 text-white/58">{service.body}</p>
                  <div className="mt-7 grid gap-3">
                    {service.items.map((item) => (
                      <div
                        key={item}
                        className="border-t border-white/15 pt-3 text-sm font-bold text-white/72"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </AccordionItem>

          <AccordionItem
            id="process"
            number="03"
            label="Process"
            title="Precision before production."
          >
            <div className="grid gap-px bg-white/15 md:grid-cols-2 xl:grid-cols-4">
              {process.map((item) => (
                <article
                  key={item.step}
                  className="relative min-h-[190px] bg-black p-6 sm:min-h-[230px]"
                >
                  <FrameCorners subtle />
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-white/42">
                    {item.step}
                  </p>
                  <h3 className="mt-10 text-2xl font-black uppercase leading-none tracking-tight text-white sm:mt-14">
                    {item.title}
                  </h3>
                  <p className="mt-4 leading-7 text-white/55">{item.body}</p>
                </article>
              ))}
            </div>
          </AccordionItem>

          <AccordionItem
            id="proof"
            number="04"
            label="Proof"
            title="Built for trust and momentum."
          >
            <blockquote className="border-l border-white/25 pl-6 text-2xl font-black uppercase leading-[1.08] tracking-[-0.03em] text-white sm:text-4xl">
              “We’ve worked with Kerry for over six months to elevate the look
              and performance of our fitness and athletic club’s social media.
              His ability to bring ideas to life has had a major impact on our
              brand presence, engagement, and overall growth online. We’re
              excited to continue working together and highly recommend him to
              anyone looking to elevate their brand through content and
              videography.”
              <footer className="mt-7 text-sm font-bold normal-case leading-6 tracking-normal text-white/45">
                Gillian Haworth, Lifetime Fitness
              </footer>
            </blockquote>
          </AccordionItem>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-7xl border border-white/20 bg-white px-6 py-12 text-black sm:px-10 lg:px-14 lg:py-16"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="max-w-4xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.04em] sm:text-7xl">
                Your content should do more than look good.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-black/68">
                Create trust, demand, and action.
              </p>
            </div>
            <a
              href={bookingHref}
              className="inline-flex min-h-12 items-center justify-center gap-3 border border-black bg-black px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
            >
              <CalendarCheck size={17} />
              Book a discovery call
              <ArrowRight size={17} />
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
