import { Header } from "./Header";
import { Slider } from "./Slider";
import { Footer } from "./Footer";
import React, { useEffect, useState } from "react";
import { WaveBackground } from "./WaveBackground";
import {useLocation} from "react-router-dom";

interface LayoutRouteProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutRouteProps) {
  const { pathname } = useLocation();
  const [intro, setIntro] = useState(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    if (!intro) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const finish = () => setIntro(false);
    // Two seconds of opening plus the 500 ms content reveal = 2.5 seconds.
    const timer = window.setTimeout(finish, 2000);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => { if (motion.matches) finish(); };
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") finish(); };
    motion.addEventListener("change", onMotionChange);
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      motion.removeEventListener("change", onMotionChange);
      window.removeEventListener("keydown", onKey);
    };
  }, [intro]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={`site-experience ${intro ? "is-intro" : "is-ready"}`}>
      <div className="wave-scene" aria-hidden="true"><WaveBackground /></div>
      {intro && <button className="intro-skip" onClick={() => setIntro(false)}>Pular abertura</button>}
      <div className="site-content pr-[14px]" inert={intro} aria-hidden={intro}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main id="page-content" className="flex-1 pt-20">{children}</main>
        <Footer />
      </div>
      <Slider />
      </div>
    </div>
  );
}
