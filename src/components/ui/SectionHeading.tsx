import { cn } from "../../utils/cn";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  id?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" && "text-center"
      )}
    >
      <h2
        id={id}
        className="text-h1 text-navy font-bold"
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-3 text-body text-content-secondary font-medium max-w-[600px]",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
