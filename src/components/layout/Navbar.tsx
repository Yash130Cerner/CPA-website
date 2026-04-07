import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig, navLinks } from "../../data/content";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { cn } from "../../utils/cn";
import Button from "../ui/Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const activeLink = useScrollSpy(
    navLinks.map((l) => l.href),
    120
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Escape key closes menu
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // Focus trap inside mobile menu
  useEffect(() => {
    if (!mobileOpen || !mobileMenuRef.current) return;

    const menu = mobileMenuRef.current;
    const focusableSelector =
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';

    const onTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusable = menu.querySelectorAll<HTMLElement>(focusableSelector);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onTab);

    // Auto-focus close button on open
    const closeBtn = menu.querySelector<HTMLElement>("button[aria-label='Close menu']");
    closeBtn?.focus();

    return () => window.removeEventListener("keydown", onTab);
  }, [mobileOpen]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 bg-white transition-shadow duration-200",
        scrolled && "shadow-nav"
      )}
      aria-label="Main navigation"
    >
      <div className="max-w-container mx-auto px-6 h-[72px] flex items-center justify-between">
        <a href="#home" className="text-navy font-bold text-xl tracking-tight">
          {siteConfig.firmName}
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "text-[0.9375rem] text-[#374151] font-medium hover:text-[#111827] transition-colors duration-200 pb-1",
                  activeLink === link.href &&
                    "!text-[#111827] !font-semibold border-b-2 border-teal"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button href="#contact" variant="primary">
            Book Free Consultation
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={hamburgerRef}
          className="lg:hidden p-2 -mr-2 text-navy cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        ref={mobileMenuRef}
        className={cn(
          "fixed inset-0 z-50 bg-white flex flex-col transition-transform duration-300 lg:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="flex items-center justify-between px-6 h-[72px]">
          <a
            href="#home"
            className="text-navy font-bold text-xl tracking-tight"
            onClick={closeMobile}
          >
            {siteConfig.firmName}
          </a>
          <button
            onClick={closeMobile}
            className="p-2 -mr-2 text-navy cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <ul className="flex flex-col items-center justify-center flex-1 gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={closeMobile}
                className={cn(
                  "text-h2 text-content-secondary hover:text-navy transition-colors duration-200",
                  activeLink === link.href && "text-navy"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="px-6 pb-10">
          <Button
            href="#contact"
            variant="primary"
            className="w-full text-center"
            onClick={closeMobile}
          >
            Book Free Consultation
          </Button>
        </div>
      </div>
    </nav>
  );
}
