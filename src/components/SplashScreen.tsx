import React, { useEffect, useState } from "react";
import { AppScreen } from "../types";

interface SplashScreenProps {
  onComplete: (nextScreen: AppScreen) => void;
  targetScreen?: AppScreen;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  targetScreen = "home",
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(targetScreen), 400);
          return 100;
        }
        return prev + 5;
      });
    }, 80);

    return () => clearInterval(timer);
  }, [onComplete, targetScreen]);

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] text-[#F2F2F2] min-h-screen flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none">
      {/* Top Header metadata */}
      <header className="flex justify-between items-start border-b border-white/10 pb-6">
        <div className="flex flex-col">
          <span className="text-[10px] tracking-[0.3em] font-bold uppercase text-[#d9ff00] mb-1 font-mono-code">
            Volume 04 / Issue 01
          </span>
          <h1 className="font-syne text-2xl sm:text-3xl font-black tracking-tighter uppercase">
            WRITESPHERE
          </h1>
        </div>
        <div className="flex gap-4 items-center">
          <span className="text-[10px] font-mono-code uppercase tracking-widest text-white/40">
            SYS_INIT_2026
          </span>
          <div className="w-10 h-10 border border-[#d9ff00] text-[#d9ff00] flex items-center justify-center text-xs font-black">
            M
          </div>
        </div>
      </header>

      {/* Main Bold Hero */}
      <main className="flex-1 flex flex-col justify-center relative py-8">
        <div className="flex flex-col">
          <div className="overflow-hidden">
            <h2 className="font-syne text-5xl sm:text-8xl md:text-9xl font-black leading-none tracking-[-0.05em] uppercase m-0 text-white">
              Creative
            </h2>
          </div>
          <div className="flex items-baseline gap-4 mt-2">
            <div className="h-[3px] bg-[#d9ff00] w-16 sm:w-32 mb-2"></div>
            <h2 className="font-syne text-5xl sm:text-8xl md:text-9xl font-black leading-none tracking-[-0.05em] uppercase m-0 text-[#d9ff00]">
              Engine
            </h2>
          </div>
          <div className="max-w-md mt-6">
            <p className="text-sm sm:text-base font-light leading-relaxed text-white/80">
              An advanced design-led publishing platform built for high-performance editorial workflows and real-time narrative visual logic.
            </p>
          </div>
        </div>

        {/* Floating Status Box */}
        <div className="mt-8 sm:mt-0 sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2 w-full sm:w-72 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-none">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-end border-b border-white/10 pb-2">
              <span className="text-[9px] uppercase tracking-wider text-white/40 font-mono-code">System Protocol</span>
              <span className="text-xs font-mono-code text-[#d9ff00]">Alpha-9</span>
            </div>
            <div className="flex justify-between items-end border-b border-white/10 pb-2">
              <span className="text-[9px] uppercase tracking-wider text-white/40 font-mono-code">Threads</span>
              <span className="text-xs font-mono-code">14,209</span>
            </div>
            <div className="flex justify-between items-end border-b border-white/10 pb-2">
              <span className="text-[9px] uppercase tracking-wider text-white/40 font-mono-code">Efficiency</span>
              <span className="text-xs font-mono-code">MAX</span>
            </div>

            {/* Progress bar */}
            <div className="mt-2 space-y-1.5">
              <div className="w-full h-1 bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-[#d9ff00] transition-all duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[9px] font-mono-code text-white/50 tracking-widest uppercase">
                <span>INITIALIZING</span>
                <span>{progress}%</span>
              </div>
            </div>

            <button
              onClick={() => onComplete(targetScreen)}
              className="mt-2 w-full bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] py-3 hover:bg-[#d9ff00] transition-colors cursor-pointer"
            >
              INITIALIZE SYNC &rarr;
            </button>
          </div>
        </div>
      </main>

      {/* Footer Metrics */}
      <footer className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-6">
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-widest text-[#d9ff00] mb-2 font-mono-code">Active Stories</span>
          <div className="font-syne text-2xl sm:text-3xl font-black italic tracking-tighter">24</div>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-widest text-white/40 mb-2 font-mono-code">System Load</span>
          <div className="font-mono-code text-xs text-[#d9ff00]">6.2ms Latency</div>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-widest text-white/40 mb-2 font-mono-code">Nodes</span>
          <div className="font-mono-code text-xs">LD / NY / TK / SYD</div>
        </div>
        <div className="flex flex-col justify-end text-right">
          <span className="text-[10px] font-mono-code opacity-60">LOC 51.5074° N</span>
        </div>
      </footer>
    </div>
  );
};

