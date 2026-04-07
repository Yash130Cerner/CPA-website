import { Phone, Mail, Clock } from "lucide-react";
import { siteConfig } from "../../data/content";

export default function TopBar() {
  return (
    <div className="bg-navy-dark text-white text-small">
      <div className="max-w-container mx-auto px-6 h-10 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a
            href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
            className="flex items-center gap-2 hover:text-gold-light transition-colors duration-200"
          >
            <Phone className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{siteConfig.phone}</span>
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="hidden md:flex items-center gap-2 hover:text-gold-light transition-colors duration-200"
          >
            <Mail className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{siteConfig.email}</span>
          </a>
        </div>
        <div className="hidden md:flex items-center gap-2 text-white/70">
          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{siteConfig.hours.weekdays}</span>
        </div>
      </div>
    </div>
  );
}
