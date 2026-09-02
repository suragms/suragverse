"use client";

import SmoothScroll from "@/components/animations/SmoothScroll";
import LoadingScreen from "@/components/layout/LoadingScreen";
import CustomCursor from "@/components/layout/CustomCursor";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ScrollStory from "@/components/sections/ScrollStory";
import ProjectTransition from "@/components/sections/ProjectTransition";
import UniverseSection from "@/components/sections/UniverseSection";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import ProjectGalaxy from "@/components/sections/ProjectGalaxy";
import AboutSection from "@/components/sections/AboutSection";
import ProfessionalSection from "@/components/sections/ProfessionalSection";
import TechStack from "@/components/sections/TechStack";
import Roadmap from "@/components/sections/Roadmap";
import GallerySection from "@/components/sections/GallerySection";
import CTASection from "@/components/sections/CTASection";
import EnquiriesSection from "@/components/sections/EnquiriesSection";
import SocialUniverse from "@/components/sections/SocialUniverse";
import EnquiryForm from "@/components/sections/EnquiryForm";
import ContactCTA from "@/components/sections/ContactCTA";
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
          {/* THE BRAND → THE CREATOR */}
          <HeroSection />
          {/* THE JOURNEY */}
          <ScrollStory />
          {/* THE WORK → THE PROJECTS */}
          <ProjectTransition />
          <UniverseSection />
          <FeaturedProjects />
          <ProjectGalaxy />
          {/* THE UNIVERSE */}
          <AboutSection />
          <ProfessionalSection />
          <TechStack />
          <Roadmap />
          <GallerySection />
          <CTASection />
          <EnquiriesSection />
          <SocialUniverse />
          <EnquiryForm />
          {/* THE FUTURE */}
          <ContactCTA />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
