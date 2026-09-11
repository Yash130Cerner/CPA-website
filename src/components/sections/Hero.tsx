import { heroContent } from "../../data/content";
import Button from "../ui/Button";

const PORTRAIT_SIZES = "(max-width: 1023px) 80vw, 480px";

export default function Hero() {
  return (
    <section id="home" className="bg-surface-white" aria-labelledby="hero-heading">
      <div className="max-w-site mx-auto px-6 pt-8 pb-10 md:pt-10 md:pb-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
        {/* Text column */}
        <div className="flex-[1_1_55%] text-center lg:text-left">
          {heroContent.headline ? (
            <>
              <h1
                id="hero-heading"
                className="text-h1 md:text-display text-navy font-bold"
              >
                {heroContent.headline}
              </h1>
              <p className="mt-6 text-body-lg text-[#374151] font-medium max-w-[540px] mx-auto lg:mx-0">
                {heroContent.subtext}
              </p>
            </>
          ) : (
            <h1
              id="hero-heading"
              className="text-3xl lg:text-4xl font-bold text-navy leading-tight max-w-xl mx-auto lg:mx-0"
            >
              {heroContent.subtext}
            </h1>
          )}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button href="#contact" variant="primary">
              {heroContent.primaryCta}
            </Button>
            <Button href="#services" variant="outlined">
              {heroContent.secondaryCta}
            </Button>
          </div>
        </div>

        {/* Portrait */}
        <div className="flex-[1_1_40%] w-full max-w-[480px]">
          <picture>
            <source
              type="image/webp"
              srcSet="/images/priya-shah-540.webp 540w, /images/priya-shah.webp 1080w"
              sizes={PORTRAIT_SIZES}
            />
            <img
              src="/images/priya-shah.jpg"
              srcSet="/images/priya-shah-540.jpg 540w, /images/priya-shah.jpg 1080w"
              sizes={PORTRAIT_SIZES}
              width={1080}
              height={1446}
              loading="eager"
              fetchPriority="high"
              alt="Priya Shah, CPA, MBA, founder of P. Shah Accounting and Tax Services"
              className="aspect-[4/5] w-full rounded-2xl object-cover object-[50%_20%] shadow-card"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
