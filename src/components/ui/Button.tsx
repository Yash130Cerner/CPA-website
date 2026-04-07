import { cn } from "../../utils/cn";

type ButtonVariant = "primary" | "secondary" | "outlined";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
  className?: string;
  size?: "default" | "large";
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-navy font-semibold hover:bg-gold-dark hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
  secondary:
    "bg-navy text-white font-semibold hover:bg-navy-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
  outlined:
    "border-2 border-navy text-navy bg-transparent font-semibold hover:bg-navy hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
};

export default function Button({
  variant = "primary",
  href,
  children,
  className,
  size = "default",
  ...props
}: ButtonProps) {
  const base = cn(
    "inline-flex items-center justify-center rounded-lg cursor-pointer transition-all duration-200",
    size === "large" ? "px-10 py-4 text-body-lg" : "px-6 py-3 text-body",
    variantClasses[variant],
    className
  );

  if (href) {
    return (
      <a href={href} className={base}>
        {children}
      </a>
    );
  }

  return (
    <button className={base} {...props}>
      {children}
    </button>
  );
}
