"use client";

import SmoothScroll from "@/components/animations/SmoothScroll";
import LoadingScreen from "@/components/layout/LoadingScreen";
import CustomCursor from "@/components/layout/CustomCursor";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Navbar from "@/components/layout/Navbar";
import MobileBottomNav from "@/components/navigation/MobileBottomNav";
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
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <div className="noise-overlay">
        <Navbar />
        <MobileBottomNav />
        <main>
          {/* 01 — HELLO, I'M SURAG */}
          <HeroSection />
          {/* 02 — WHO I AM */}
          <WhoAmISection />
          {/* 03 — MY JOURNEY */}
          <ScrollStory />
          {/* 04 — MY STORY */}
          <ChallengesSection />
          {/* 05 — TECHNOLOGY & POSSIBILITY */}
          <TechPossibilitySection />
          {/* 06 — WHAT I DO */}
          <WhatIDoSection />
          {/* 07 — RIGHT NOW */}
          <StatusSection />
          {/* 08 — MY WORK */}
          <DigitalWorldSection />
          {/* 09 — MOMENTS FROM THE JOURNEY */}
          <GallerySection />
          {/* 10 — STILL BECOMING */}
          <FutureSection />
          {/* 11 — LET'S CONNECT */}
          <ConnectSection />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
