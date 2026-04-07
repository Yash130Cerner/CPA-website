import { ctaBanner } from "../../data/content";
import Button from "../ui/Button";

export default function CTABanner() {
  return (
    <section
      className="bg-gradient-to-br from-navy to-navy-dark py-16"
      aria-label="Call to action"
    >
      <div className="max-w-container mx-auto px-6 text-center">
        <h2 className="text-h1 text-white font-bold">{ctaBanner.headline}</h2>
        <p className="mt-4 text-body-lg text-white/85 font-medium max-w-[500px] mx-auto">
          {ctaBanner.subtext}
        </p>
        <div className="mt-8">
          <Button href="#contact" variant="primary" size="large">
            {ctaBanner.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
