import { Phone, Mail, MapPin } from "lucide-react";
import { siteConfig, navLinks } from "../../data/content";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="max-w-container mx-auto px-6 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Col 1: Firm info */}
          <div>
            <p className="text-h3 font-bold">{siteConfig.firmName}</p>
            <p className="mt-2 text-body text-white/75 font-medium">{siteConfig.tagline}</p>

            <p className="mt-4 text-small text-white/50">Serving clients across Canada - virtually &amp; in person</p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <p className="text-small font-bold uppercase tracking-wider mb-4">
              Quick Links
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-body text-white/75 font-medium hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <p className="text-small font-bold uppercase tracking-wider mb-4">
              Contact
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-3 text-body text-white/70 hover:text-white transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-body text-white/70 hover:text-white transition-colors duration-200"
                >
                  <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-body text-white/75 font-medium">
                <MapPin className="w-4 h-4 shrink-0 mt-1" aria-hidden="true" />
                {siteConfig.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-small text-white/50">
            &copy; 2026 {siteConfig.firmName}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
