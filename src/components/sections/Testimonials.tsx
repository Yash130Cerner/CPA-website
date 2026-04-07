import { testimonials } from "../../data/content";
import SectionHeading from "../ui/SectionHeading";
import TestimonialCard from "../ui/TestimonialCard";

export default function Testimonials() {
  return (
    <section
      id="reviews"
      className="bg-surface-cream py-section"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-container mx-auto px-6">
        <SectionHeading
          id="testimonials-heading"
          title="What Our Clients Say"
        />

        {/* Mobile: horizontal scroll, Desktop: 2-col grid */}
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 md:overflow-visible md:pb-0">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="min-w-[300px] snap-start md:min-w-0"
            >
              <TestimonialCard {...t} />
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://share.google/xcjkBvZ853g8UByWf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal font-medium hover:underline transition-colors duration-200"
          >
            View All Google Reviews &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
