import { Header } from "./Header";
import { Slider } from "./Slider";
import { Footer } from "./Footer";
import React, { useEffect } from "react";
import {useLocation} from "react-router-dom";

interface LayoutRouteProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutRouteProps) {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="pr-[14px]">
      <div className="flex min-h-screen flex-col">
        <Header />
        <main id="page-content" className="flex-1 pt-20">{children}</main>
        <Footer />
      </div>
      <Slider />
    </div>
  );
}
