"use client";

import React from "react";
import { Badge, Button } from "../UI";

export default function Hero({ hero, onBtnClick }) {
  return (
    <section className="bg-white border-b border-gray-200 relative overflow-hidden">
      {hero.bg_image_url && (
        <div className="absolute inset-0 z-0">
          <img
            src={hero.bg_image_url}
            className="w-full h-full object-cover"
            alt="Latar Belakang"
          />
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex flex-col items-center text-center relative z-10">
        <Badge
          variant="outline"
          className="mb-6 rounded-full border-gray-200 text-gray-500 bg-white/80 backdrop-blur-sm px-4 py-1.5 shadow-sm"
        >
          {hero.badge}
        </Badge>
        <h1 className="text-[36px] md:text-[56px] font-bold font-display text-gray-900 leading-tight mb-6 max-w-4xl tracking-tight drop-shadow-sm">
          {hero.title1} <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent drop-shadow-sm">
            {hero.title2}
          </span>
        </h1>
        <p className="text-[18px] text-gray-700 font-medium mb-10 max-w-2xl leading-relaxed drop-shadow-sm">
          {hero.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button
            variant="primary"
            className="px-8 py-4 shadow-lg"
            onClick={() => onBtnClick(hero.btn1_target)}
          >
            {hero.btn1_text}
          </Button>
          <Button
            variant="outline"
            className="px-8 py-4 bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white"
            onClick={() => onBtnClick(hero.btn2_target)}
          >
            {hero.btn2_text}
          </Button>
        </div>
      </div>
    </section>
  );
}