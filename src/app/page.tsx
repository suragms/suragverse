"use client";

import SmoothScroll from "@/components/animations/SmoothScroll";
import LoadingScreen from "@/components/layout/LoadingScreen";
import CustomCursor from "@/components/layout/CustomCursor";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import WhoAmISection from "@/components/sections/WhoAmISection";
import ScrollStory from "@/components/sections/ScrollStory";
import ChallengesSection from "@/components/sections/ChallengesSection";
import TechPossibilitySection from "@/components/sections/TechPossibilitySection";
import WhatIDoSection from "@/components/sections/WhatIDoSection";
import StatusSection from "@/components/sections/StatusSection";
import DigitalWorldSection from "@/components/sections/DigitalWorldSection";
import GallerySection from "@/components/sections/GallerySection";
import FutureSection from "@/components/sections/FutureSection";
import ConnectSection from "@/components/sections/ConnectSection";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <div className="noise-overlay">
        <Navbar />
        <main>
          {/* 01 — LOADING (handled by LoadingScreen) */}
          {/* 02 — HELLO, I'M SURAG */}
          <HeroSection />
          {/* 03 — WHO I AM */}
          <WhoAmISection />
          {/* 04 — MY JOURNEY */}
          <ScrollStory />
          {/* 05 — MY STORY */}
          <ChallengesSection />
          {/* 06 — TECHNOLOGY & POSSIBILITY */}
          <TechPossibilitySection />
          {/* 07 — WHAT I DO */}
          <WhatIDoSection />
          {/* 08 — WHERE I AM NOW */}
          <StatusSection />
          {/* 09 — MY WORK */}
          <DigitalWorldSection />
          {/* 10 — MOMENTS FROM THE JOURNEY */}
          <GallerySection />
          {/* 11 — WHAT'S NEXT */}
          <FutureSection />
          {/* 12 — LET'S CONNECT */}
          <ConnectSection />
          {/* Epilogue */}
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
