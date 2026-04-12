import { services } from "../../data/content";
import SectionHeading from "../ui/SectionHeading";
import ServiceCard from "../ui/ServiceCard";

export default function Services() {
  return (
    <section
      id="services"
      className="bg-surface-white py-section"
      aria-labelledby="services-heading"
    >
      <div className="max-w-container mx-auto px-6">
        <SectionHeading
          id="services-heading"
          title="Our Services"
          subtitle="Comprehensive accounting and tax solutions tailored to your needs"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
