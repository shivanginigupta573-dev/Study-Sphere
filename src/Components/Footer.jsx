import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div>
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
            StudySphere
          </h3>
          <p className="text-sm text-neutral-500">
            Plan. Focus. Grow.
          </p>
        </div>

        <p className="text-sm text-neutral-500">
          © {new Date().getFullYear()} StudySphere
        </p>

        <div className="flex gap-5 text-sm text-neutral-500">
          <a href="#" className="hover:text-teal-700">
            Privacy
          </a>
          <a href="#" className="hover:text-teal-700">
            Terms
          </a>
          <a href="#" className="hover:text-teal-700">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}