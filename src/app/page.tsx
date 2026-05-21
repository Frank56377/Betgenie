import Hero from '@/components/sections/Hero';
import HowItWorks from '@/components/sections/HowItWorks';
import DailyFreeTips from '@/components/sections/DailyFreeTips';
import FeaturesSpotlight from '@/components/sections/FeaturesSpotlight';
import PerformanceResults from '@/components/sections/PerformanceResults';
import Testimonials from '@/components/sections/Testimonials';
import PricingPlans from '@/components/sections/PricingPlans';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <HowItWorks />
      <DailyFreeTips />
      <FeaturesSpotlight />
      <PerformanceResults />
      <Testimonials />
      <PricingPlans />
      <CTA />
      <Footer />
    </main>
  );
}
