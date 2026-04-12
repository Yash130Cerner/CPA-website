import { UserCircle } from "lucide-react";
import { aboutContent } from "../../data/content";
import SectionHeading from "../ui/SectionHeading";

export default function About() {
  return (
    <section
      id="about"
      className="bg-surface-gray py-section"
      aria-labelledby="about-heading"
    >
      <div className="max-w-container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Image placeholder */}
          <div className="lg:w-[45%] w-[80%] mx-auto lg:mx-0 max-w-[420px]">
            <div className="relative max-h-[360px] md:max-h-[520px]">
              {/* Decorative rectangle behind - hidden on mobile */}
              <div
                className="hidden md:block absolute inset-0 bg-gold/[0.12] rounded-card translate-x-3 translate-y-3 rotate-2 z-0"
                aria-hidden="true"
              />
              <div className="relative z-10 aspect-[3/4] max-h-[360px] md:max-h-[520px] rounded-2xl overflow-hidden bg-gradient-to-br from-teal to-teal-dark flex flex-col items-center justify-center">
                <UserCircle
                  className="w-[100px] h-[100px] text-white/40"
                  strokeWidth={0.8}
                  aria-hidden="true"
                />
                <span
                  className="mt-3 text-small text-white/30 uppercase tracking-widest font-medium"
                  aria-hidden="true"
                >
                  Photo
                </span>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="lg:w-[55%]">
            <SectionHeading
              id="about-heading"
              title="Meet Your Accountant"
              align="left"
            />

            <p className="text-h2 text-[#111827] font-bold">
              {aboutContent.name}
            </p>
            <p className="text-body-lg text-teal font-semibold mt-1">
              {aboutContent.title} &mdash; {aboutContent.role}
            </p>

            <div className="mt-6 space-y-4">
              {aboutContent.bio.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-body text-[#374151] font-medium leading-relaxed [&_strong]:font-bold [&_strong]:text-[#111827]"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {aboutContent.credentials.map((cred) => (
                <span
                  key={cred}
                  className="bg-surface-white border border-teal text-teal text-small font-semibold rounded-full px-3 py-1"
                >
                  {cred}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
