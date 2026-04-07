import { Phone, Mail, MapPin, Clock, Globe } from "lucide-react";
import { siteConfig } from "../../data/content";
import SectionHeading from "../ui/SectionHeading";

const inputClass =
  "w-full border border-[#E8E9EC] rounded-lg px-4 py-3 text-[#111827] font-medium bg-white focus:border-[#2A7F8E] focus:ring-2 focus:ring-[#2A7F8E]/10 focus:outline-none transition-colors duration-200";

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-surface-gray py-section"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-container mx-auto px-6">
        <SectionHeading id="contact-heading" title="Get in Touch" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form
            action={siteConfig.formAction}
            method="POST"
            className="flex flex-col gap-5"
          >
            {/* Honeypot */}
            <input
              type="text"
              name="_gotcha"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div>
              <label
                htmlFor="name"
                className="block text-small text-[#111827] font-semibold mb-1.5"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-small text-[#111827] font-semibold mb-1.5"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-small text-[#111827] font-semibold mb-1.5"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-small text-[#111827] font-semibold mb-1.5"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className={`${inputClass} min-h-[120px] resize-vertical`}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gold text-navy font-semibold rounded-lg py-3.5 text-body hover:bg-gold-dark transition-colors duration-200 cursor-pointer mt-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            >
              Send Message
            </button>
          </form>

          {/* Contact details */}
          <div>
            <div className="space-y-5">
              <a
                href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                className="flex items-center gap-4 text-body text-[#374151] font-medium hover:text-teal transition-colors duration-200"
              >
                <Phone className="w-5 h-5 text-teal shrink-0" aria-hidden="true" />
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-4 text-body text-[#374151] font-medium hover:text-teal transition-colors duration-200"
              >
                <Mail className="w-5 h-5 text-teal shrink-0" aria-hidden="true" />
                {siteConfig.email}
              </a>
              <div className="flex items-start gap-4 text-body text-[#374151] font-medium">
                <MapPin className="w-5 h-5 text-teal shrink-0 mt-0.5" aria-hidden="true" />
                {siteConfig.address}
              </div>
              <div className="flex items-start gap-4 text-body text-[#374151] font-medium">
                <Clock className="w-5 h-5 text-teal shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p>{siteConfig.hours.weekdays}</p>
                  <p>{siteConfig.hours.weekends}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 text-body text-[#374151] font-medium">
                <Globe className="w-5 h-5 text-teal shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-[#111827]">Languages spoken</p>
                  <p>{siteConfig.languages.join(" · ")}</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8">
              <iframe
                src={siteConfig.mapEmbedUrl}
                title="Office location"
                width="100%"
                height="220"
                className="rounded-card border border-border"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
