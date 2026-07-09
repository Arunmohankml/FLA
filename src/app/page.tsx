import { Hero } from "@/components/sections/Hero";
import { AcademyPreview } from "@/components/sections/AcademyPreview";
import { CoursesShowcase } from "@/components/sections/CoursesShowcase";
import { LifeInGermany } from "@/components/sections/LifeInGermany";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ProcessPath } from "@/components/sections/ProcessPath";
import { FloatingStats } from "@/components/sections/FloatingStats";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SiteMediaProvider } from "@/components/SiteMediaProvider";

export default function HomePage() {
  return (
    <SiteMediaProvider>
      <Hero />
      <AcademyPreview />
      <LifeInGermany />
      <CoursesShowcase />
      <WhyChooseUs />
      <ProcessPath />
      <FloatingStats />
      <FinalCTA />
    </SiteMediaProvider>
  );
}
