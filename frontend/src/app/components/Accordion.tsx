"use client";
import { useState } from "react";

type LessonType = {
  id: number;
  title: string;
  duration: string;
};

type SectionType = {
  id: number;
  title: string;
  lessons: LessonType[];
};

type AccordionProps = {
  sections: SectionType[];
};

const Accordion = ({ sections }: AccordionProps) => {
  const [openSections, setOpenSections] = useState<number[]>([]);

  const toggleSection = (sectionId: number) => {
    setOpenSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className="space-y-2">
      {sections.map((section) => (
        <div
          key={section.id}
          className="bg-[#141625] rounded-lg overflow-hidden mb-[15px]"
        >
          <button
            className="w-full p-4 flex items-center justify-between text-white hover:bg-[#2A2C3B] transition-colors"
            onClick={() => toggleSection(section.id)}
          >
            <div className="flex items-center gap-3">
              <span className="font-medium">{section.title}</span>
            </div>
            <i
              className={`fa-solid fa-chevron-down transition-transform ${
                openSections.includes(section.id) ? "rotate-180" : ""
              }`}
            ></i>
          </button>

          {openSections.includes(section.id) && (
            <div className="border-t border-[#2A2C3B]">
              {section.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="p-4 flex items-center justify-between text-[#E5E4E4] hover:bg-[#2A2C3B] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-circle-play bg-gradient-to-r from-[#eaafc8] to-[#654ea3] bg-clip-text text-transparent text-[20px]"></i>
                    <span>{lesson.title}</span>
                  </div>
                  <span className="text-sm">{lesson.duration}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
