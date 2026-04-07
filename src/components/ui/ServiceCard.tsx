import {
  FileText,
  Building2,
  BookOpen,
  Receipt,
  Home,
  Briefcase,
  Search,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  FileText,
  Building2,
  BookOpen,
  Receipt,
  Home,
  Briefcase,
  Search,
  User,
};

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  const IconComponent = iconMap[icon];

  return (
    <article className="bg-white border border-border rounded-card p-7 transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 motion-reduce:hover:transform-none">
      <div className="w-12 h-12 rounded-full bg-surface-gray flex items-center justify-center">
        {IconComponent && <IconComponent className="w-6 h-6 text-teal" strokeWidth={1.5} />}
      </div>
      <h3 className="text-h3 text-[#111827] mt-4 font-bold">{title}</h3>
      <p
        className="text-body text-[#374151] mt-1.5 font-medium leading-relaxed [&_strong]:font-bold [&_strong]:text-[#111827]"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </article>
  );
}
