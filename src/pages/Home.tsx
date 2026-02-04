
import FeaturesSection from "@/components/modules/homepage/FeaturesSection";
import CTASection from "@/components/modules/homepage/CTASection";
import RolesSection from "@/components/modules/homepage/RolesSection";
import TestimonialSlider from "@/components/modules/homepage/TestimonialSlider";
import HeroSection from "@/components/modules/homepage/HeroSection";
import NetworkSection from "@/components/modules/homepage/NetworkSection";
import HowToProcess from "@/components/modules/homepage/HowToProcess";


export default function Home() {
  return (
    <div className="flex flex-col space-y-20 md:space-y-24 lg:space-y-40">
      <HeroSection />
      <HowToProcess />
      <NetworkSection />
      <FeaturesSection />
      <TestimonialSlider />
      <RolesSection />
      <CTASection />
    </div>
  );
}
