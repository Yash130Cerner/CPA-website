import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export default function TestimonialCard({
  name,
  role,
  quote,
  rating,
}: TestimonialCardProps) {
  return (
    <article className="bg-white rounded-card shadow-card p-8 flex flex-col border-l-4 border-gold overflow-hidden">
      <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: rating }).map((_, i) => (
          <Star
            key={i}
            className="w-[18px] h-[18px] fill-gold text-gold"
            aria-hidden="true"
          />
        ))}
      </div>
      <blockquote className="mt-4 text-body text-[#111827] font-serif italic font-medium leading-relaxed flex-1">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="mt-6">
        <p className="text-h3 text-[#111827] font-bold">{name}</p>
        <p className="text-small text-[#374151] font-medium">{role}</p>
      </div>
    </article>
  );
}
