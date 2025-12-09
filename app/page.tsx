import Link from "next/link";
import { Spotlight, BackgroundSpotlight } from "@/components/Spotlight";
import { MagneticButton } from "@/components/MagneticButton";
import { Hero3D } from "@/components/Hero3D";
import { BentoGrid } from "@/components/BentoGrid";
import { LiveDemo } from "@/components/LiveDemo";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-deep-slate text-white selection:bg-neon-indigo/30">
      <BackgroundSpotlight />

      {/* Navbar (Simple Overlay) */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-deep-slate/50 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-gradient-to-br from-neon-indigo to-neon-violet" />
            <span className="text-lg font-bold tracking-tight">DataViz</span>
          </div>
          <div className="hidden gap-8 text-sm font-medium text-slate-400 md:flex">
            <a href="#" className="hover:text-white transition-colors">Product</a>
            <a href="#" className="hover:text-white transition-colors">Solutions</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <Link href="/dashboard">
            <button className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors">
              Login
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center pt-24">
        <Spotlight className="absolute inset-0 z-0" />

        <div className="container relative z-10 grid max-w-7xl grid-cols-1 gap-12 px-4 md:grid-cols-2">
          <div className="flex flex-col justify-center space-y-8">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neon-violet backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-violet opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-violet"></span>
              </span>
              v2.0 is now live
            </div>

            <h1 className="text-5xl font-bold tracking-tighter leading-tight md:text-7xl">
              Chat with your Data. <br />
              <span className="animate-text-reveal bg-gradient-to-r from-neon-indigo via-purple-500 to-neon-violet bg-clip-text text-transparent bg-[length:200%_auto]">
                See the Future.
              </span>
            </h1>

            <p className="max-w-md text-lg text-slate-400">
              Stop staring at spreadsheets. Start having conversations.
              DataViz uses advanced AI to instantly visualize trends and forecast outcomes with 99% accuracy.
            </p>

            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <MagneticButton className="group relative flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-4 text-black transition-transform hover:scale-105 active:scale-95">
                  <span className="relative z-10 font-bold">Start Free Trial</span>
                  <div className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-neon-indigo to-neon-violet transition-transform duration-300 group-hover:translate-y-0" />
                </MagneticButton>
              </Link>

              <button className="flex items-center gap-2 px-6 py-4 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                View Documentation
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            {/* Hero 3D Element */}
            <Hero3D />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 animate-bounce text-slate-600">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5" /></svg>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section id="features" className="relative z-10 bg-deep-slate">
        <BentoGrid />
      </section>

      {/* Live Demo Section */}
      <section className="relative z-10 border-t border-white/5 bg-deep-slate">
        <div className="container mx-auto px-4 pt-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Works like <span className="text-neon-indigo">magic</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            No complex queries. No learning curve. Just ask, and watch your data come to life in real-time.
          </p>
        </div>
        <LiveDemo />
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 text-center text-sm text-slate-600">
        <p>© 2025 DataViz Inc. All rights reserved.</p>
      </footer>
    </main>
  );
}
