import { useState, useEffect, useRef } from "react";

export function useScrollSpy(sectionIds: string[], offset = 120): string {
  const [activeId, setActiveId] = useState(sectionIds[0] || "");
  const visibleSet = useRef(new Set<string>());

  useEffect(() => {
    const lastId = sectionIds[sectionIds.length - 1] || "";

    const pickActive = () => {
      // If at bottom of page, activate last section
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50;
      if (atBottom && lastId) {
        setActiveId(lastId);
        return;
      }

      // From all currently visible sections, pick the one whose top is closest
      // to (but not above) the offset line
      let best: string | null = null;
      let bestTop = Infinity;

      for (const id of visibleSet.current) {
        const el = document.getElementById(id.replace("#", ""));
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top < bestTop) {
          bestTop = top;
          best = id;
        }
      }

      if (best) setActiveId(best);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = `#${entry.target.id}`;
          if (entry.isIntersecting) {
            visibleSet.current.add(id);
          } else {
            visibleSet.current.delete(id);
          }
        }
        pickActive();
      },
      {
        rootMargin: `-${offset}px 0px -40% 0px`,
        threshold: 0,
      }
    );

    const elements = sectionIds
      .map((id) => document.getElementById(id.replace("#", "")))
      .filter(Boolean) as HTMLElement[];

    elements.forEach((el) => observer.observe(el));

    window.addEventListener("scroll", pickActive, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", pickActive);
      visibleSet.current.clear();
    };
  }, [sectionIds, offset]);

  return activeId;
}
