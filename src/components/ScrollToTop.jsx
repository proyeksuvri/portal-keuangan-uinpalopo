"use client";

import React, { useState, useEffect } from "react";
import { Icons } from "./Icons";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) setIsVisible(true);
      else setIsVisible(false);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-[60] p-3 rounded-full bg-primary text-white shadow-lg hover:bg-secondary hover:-translate-y-1 transition-all duration-300 animate-in fade-in zoom-in group"
      aria-label="Scroll to top"
    >
      <Icons.ChevronRight className="w-6 h-6 -rotate-90 group-hover:scale-110 transition-transform" />
    </button>
  );
}