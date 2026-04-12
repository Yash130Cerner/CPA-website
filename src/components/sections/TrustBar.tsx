import { Shield, Clock, Users, Star, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { trustBadges } from "../../data/content";

const iconMap: Record<string, LucideIcon> = { Shield, Clock, Users, Star, Globe };

export default function TrustBar() {
  return (
    <section
      className="bg-surface-gray border-y border-border py-8"
      aria-label="Credentials"
    >
      <div className="max-w-container mx-auto px-6">
        <div className="grid grid-cols-2 lg:flex lg:justify-center gap-8 lg:gap-12">
          {trustBadges.map((badge) => {
            const Icon = iconMap[badge.icon];
            return (
              <div
                key={badge.label}
                className="flex items-center justify-center gap-3"
              >
                {"logo" in badge && badge.logo ? (
                  <img
                    src={badge.logo}
                    alt="CPA Canada Member"
                    className="h-24 -my-8 w-auto object-contain mix-blend-multiply"
                  />
                ) : Icon ? (
                  <Icon
                    className="w-6 h-6 text-teal"
                    aria-hidden="true"
                  />
                ) : null}
                <span className="text-small text-[#374151] font-semibold">
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
