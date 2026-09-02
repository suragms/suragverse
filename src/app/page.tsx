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
import EducationGrowthSection from "@/components/sections/EducationGrowthSection";
import DigitalWorldSection from "@/components/sections/DigitalWorldSection";
import GallerySection from "@/components/sections/GallerySection";
import FutureSection from "@/components/sections/FutureSection";
import ConnectSection from "@/components/sections/ConnectSection";
import EnquiriesSection from "@/components/sections/EnquiriesSection";
import SocialUniverse from "@/components/sections/SocialUniverse";
import EnquiryForm from "@/components/sections/EnquiryForm";
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
          {/* 02 — HELLO, I'M SURAG */}
          <HeroSection />
          {/* 03 — WHO AM I */}
          <WhoAmISection />
          {/* 04 — MY JOURNEY */}
          <ScrollStory />
          {/* 05 — MY STORY & CHALLENGES */}
          <ChallengesSection />
          {/* 06 — TECHNOLOGY EXPANDS POSSIBILITIES */}
          <TechPossibilitySection />
          {/* 07 — WHAT I DO */}
          <WhatIDoSection />
          {/* 08 — WHERE I AM NOW */}
          <StatusSection />
          {/* 09 — LEARNING & GROWTH */}
          <EducationGrowthSection />
          {/* 10 — EXPLORE MY WORK */}
          <DigitalWorldSection />
          {/* 11 — MOMENTS FROM MY JOURNEY */}
          <GallerySection />
          {/* 12 — THE FUTURE */}
          <FutureSection />
          {/* 13 — LET'S CONNECT */}
          <ConnectSection />
          {/* Functional enquiries & contact */}
          <EnquiriesSection />
          <SocialUniverse />
          <EnquiryForm />
          {/* FINAL CTA — THE JOURNEY CONTINUES */}
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
