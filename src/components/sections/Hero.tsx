import { UserCircle } from "lucide-react";
import { heroContent } from "../../data/content";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section id="home" className="bg-surface-white" aria-labelledby="hero-heading">
      <div className="max-w-container mx-auto px-6 pt-8 pb-10 md:pt-10 md:pb-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
        {/* Text column */}
        <div className="flex-[1_1_55%] text-center lg:text-left">
          <h1
            id="hero-heading"
            className="text-h1 md:text-display text-navy font-bold"
          >
            {heroContent.headline}
          </h1>
          <p className="mt-6 text-body-lg text-[#374151] font-medium max-w-[540px] mx-auto lg:mx-0">
            {heroContent.subtext}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button href="#contact" variant="primary">
              {heroContent.primaryCta}
            </Button>
            <Button href="#services" variant="outlined">
              {heroContent.secondaryCta}
            </Button>
          </div>
        </div>

        {/* Image placeholder column */}
        <div className="flex-[1_1_40%] w-full max-w-[480px]">
          <div className="aspect-[4/5] max-h-[320px] md:max-h-[500px] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-teal to-navy flex flex-col items-center justify-center shadow-card relative">
            {/* Decorative circle */}
            <div
              className="absolute top-[15%] -right-[10%] w-[60%] aspect-square rounded-full bg-white/10"
              aria-hidden="true"
            />
            <div
              className="absolute bottom-[10%] -left-[8%] w-[40%] aspect-square rounded-full bg-white/[0.07]"
              aria-hidden="true"
            />
            <UserCircle
              className="w-[120px] h-[120px] text-white/40 relative z-10"
              strokeWidth={0.8}
              aria-hidden="true"
            />
            <span
              className="mt-3 text-small text-white/30 uppercase tracking-widest font-medium relative z-10"
              aria-hidden="true"
            >
              Photo
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
