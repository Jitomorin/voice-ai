import { Navbar } from "@/components/layout/navbar";
import { BenefitsSection } from "@/components/layout/sections/benefits";
import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturesSection } from "@/components/layout/sections/features";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { PricingSection } from "@/components/layout/sections/pricing";
import { ServicesSection } from "@/components/layout/sections/services";
import { SponsorsSection } from "@/components/layout/sections/sponsors";
import { TestimonialSection } from "@/components/layout/sections/testimonial";
import { cookies } from "next/headers";

export default function Home() {
  const cookieStore = cookies();
  let accessToken = cookieStore.get("accessToken")?.value;
  let userLoggedIn = accessToken ? true : false;

  return (
    <>
      <Navbar />
      <HeroSection userLoggedIn={userLoggedIn} />
      <SponsorsSection />
      <BenefitsSection />
      <FeaturesSection />
      <ServicesSection />
      <TestimonialSection />
      <PricingSection />
      <FAQSection />
      {/* <FooterSection /> */}
    </>
  );
}
