import { howItWorks } from "../../data/content";
import SectionHeading from "../ui/SectionHeading";

export default function HowItWorks() {
  return (
    <section
      className="bg-surface-white py-section"
      aria-labelledby="howitworks-heading"
    >
      <div className="max-w-container mx-auto px-6">
        <SectionHeading id="howitworks-heading" title="How It Works" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-0 relative">
          {/* Horizontal dashed connector (desktop) */}
          <div
            className="hidden lg:block absolute top-7 left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] border-t-2 border-dashed border-teal-light/50"
            aria-hidden="true"
          />

          {howItWorks.map((step, i) => (
            <div
              key={step.step}
              className="flex flex-col items-center text-center lg:w-1/3 relative"
            >
              {/* Vertical dashed connector (mobile) */}
              {i < howItWorks.length - 1 && (
                <div
                  className="lg:hidden absolute top-14 left-1/2 -translate-x-1/2 h-12 border-l-2 border-dashed border-teal-light/50"
                  aria-hidden="true"
                />
              )}

              <div className="w-14 h-14 rounded-full bg-navy text-white flex items-center justify-center text-h2 font-bold relative z-10">
                {step.step}
              </div>
              <h3 className="text-h3 text-[#111827] font-bold mt-6">
                {step.title}
              </h3>
              <p className="text-body text-[#374151] mt-2 max-w-[280px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
