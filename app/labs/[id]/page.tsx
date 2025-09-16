"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getLabById, getAllLabs } from "@/lib/labs-data";
import { LabSidebar } from "@/components/labs/lab-sidebar";
import { LabHeader } from "@/components/labs/lab-header";
import { MarkdownContent } from "@/components/labs/markdown-content";

export default function LabPage() {
  const params = useParams();
  const labId = params.id as string;
  const [currentSectionId, setCurrentSectionId] = useState<string>("");

  const lab = getLabById(labId);
  const allLabs = getAllLabs();

  useEffect(() => {
    // Set first section as active by default
    if (lab?.sections && lab.sections.length > 0) {
      setCurrentSectionId(lab.sections[0].id);
    }

    // Handle hash changes for section navigation
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && lab?.sections?.find((s) => s.id === hash)) {
        setCurrentSectionId(hash);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [lab]);

  if (!lab) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Lab Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The requested lab could not be found.
          </p>
          <Link
            href="/labs"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Labs
          </Link>
        </div>
      </div>
    );
  }

  const currentSection =
    lab.sections.find((s) => s.id === currentSectionId) || lab.sections[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="py-4 space-y-2">
            <Link
              href="/labs"
              className="inline-block text-sm text-gray-600 hover:text-gray-900"
            >
              ← Labs
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">{lab.title}</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <LabSidebar
            labs={allLabs}
            currentLabId={labId}
            currentSectionId={currentSectionId}
          />

          {/* Main Content */}
          <main className="flex-1 max-w-4xl">
            <LabHeader lab={lab} />

            {currentSection && (
              <div id={currentSection.id}>
                <MarkdownContent content={currentSection.content} />
              </div>
            )}

            {/* Navigation between sections */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
              {(() => {
                const currentIndex = lab.sections.findIndex(
                  (s) => s.id === currentSectionId
                );
                const prevSection =
                  currentIndex > 0 ? lab.sections[currentIndex - 1] : null;
                const nextSection =
                  currentIndex < lab.sections.length - 1
                    ? lab.sections[currentIndex + 1]
                    : null;

                return (
                  <>
                    <div>
                      {prevSection && (
                        <a
                          href={`#${prevSection.id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                          onClick={() => setCurrentSectionId(prevSection.id)}
                        >
                          ← {prevSection.title}
                        </a>
                      )}
                    </div>
                    <div>
                      {nextSection && (
                        <a
                          href={`#${nextSection.id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                          onClick={() => setCurrentSectionId(nextSection.id)}
                        >
                          {nextSection.title} →
                        </a>
                      )}
                    </div>
                  </>
                );
              })()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
