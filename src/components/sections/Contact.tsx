import { useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Globe,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { siteConfig } from "../../data/content";
import SectionHeading from "../ui/SectionHeading";

const inputClass =
  "w-full border border-[#7A8493] rounded-lg px-4 py-3 text-[#111827] font-medium bg-white focus:border-[#2A7F8E] focus:ring-2 focus:ring-[#2A7F8E]/10 focus:outline-none transition-colors duration-200 disabled:bg-surface-gray disabled:text-[#4A5568]";

const labelClass = "block text-small text-[#111827] font-semibold mb-1.5";

const FALLBACK_ERROR =
  "Something went wrong while sending your message. Please try again, or reach us directly using the details alongside.";

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = formRef.current;
    if (!form || status === "submitting") return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(siteConfig.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });

      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        setErrorMessage(result.error || FALLBACK_ERROR);
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setErrorMessage(FALLBACK_ERROR);
      setStatus("error");
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <section
      id="contact"
      className="bg-surface-gray py-section"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-site mx-auto px-6">
        <SectionHeading id="contact-heading" title="Get in Touch" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <div>
            {status === "success" ? (
              <div
                role="status"
                className="bg-white border border-success/40 border-l-4 border-l-success rounded-card p-8 shadow-card"
              >
                <CheckCircle2
                  className="w-10 h-10 text-success"
                  aria-hidden="true"
                />
                <p className="text-h3 text-[#111827] font-bold mt-4">
                  Thank you &ndash; your message has been sent.
                </p>
                <p className="text-body text-[#374151] mt-2 leading-relaxed">
                  We have emailed you a confirmation and will get back to you
                  shortly. If your question is urgent, please call{" "}
                  <a
                    href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                    className="text-teal font-semibold hover:underline"
                  >
                    {siteConfig.phone}
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-body text-teal font-semibold hover:underline cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
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

                <p className="text-small text-[#4A5568]">
                  Name, email, and message are required.
                </p>

                <div>
                  <label htmlFor="name" className={labelClass}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    maxLength={100}
                    disabled={isSubmitting}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="email"
                    maxLength={254}
                    disabled={isSubmitting}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone{" "}
                    <span className="font-medium text-[#4A5568]">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    maxLength={40}
                    disabled={isSubmitting}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    maxLength={5000}
                    disabled={isSubmitting}
                    className={`${inputClass} min-h-[120px] resize-vertical`}
                  />
                </div>

                {status === "error" && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 bg-white border border-[#B42318]/30 border-l-4 border-l-[#B42318] rounded-lg p-4"
                  >
                    <AlertCircle
                      className="w-5 h-5 text-[#B42318] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <p className="text-small text-[#111827] leading-relaxed">
                      {errorMessage}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-gold text-navy font-semibold rounded-lg py-3.5 text-body hover:bg-gold-dark transition-colors duration-200 cursor-pointer mt-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting && (
                    <Loader2
                      className="w-4 h-4 animate-spin motion-reduce:animate-none"
                      aria-hidden="true"
                    />
                  )}
                  {isSubmitting ? "Sending…" : "Send Message"}
                </button>

                <p className="sr-only" aria-live="polite">
                  {isSubmitting ? "Sending your message." : ""}
                </p>
              </form>
            )}
          </div>

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
