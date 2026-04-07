import { useState } from "react";
import { faqs } from "../../data/content";
import SectionHeading from "../ui/SectionHeading";
import AccordionItem from "../ui/AccordionItem";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="bg-surface-white py-section"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-[760px] mx-auto px-6">
        <SectionHeading id="faq-heading" title="Frequently Asked Questions" />

        <div>
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              id={`faq-${i}`}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
