"use client";

import { useState } from "react";

export default function TranslationBanner() {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="border-l-4 border-primary bg-primary/5 p-4 rounded-md mb-8">
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-primary"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        </div>
        <div className="flex-1 space-y-2">
          <h3 className="font-semibold text-sm">
            Psst... this demo works best in Chrome 138+ 😉
          </h3>
          <p className="text-sm text-muted-foreground">
            This demo showcases Chrome&apos;s built-in{" "}
            <a
              href="https://developer.chrome.com/docs/ai/built-in-apis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Translation API
            </a>
            . To experience the full functionality:
          </p>
          <ol className="text-sm text-muted-foreground space-y-1 ml-4 list-decimal">
            <li>
              Download{" "}
              <a
                href="https://www.google.com/chrome/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Chrome 138 or later
              </a>
            </li>
            <li>
              Navigate to{" "}
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                chrome://flags/#language-detection-api
              </code>
            </li>
            <li>Enable the &quot;Language Detection API&quot; flag</li>
            <li>
              Also enable{" "}
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                #optimization-guide-on-device-model
              </code>
            </li>
            <li>Restart Chrome and come back to try it out!</li>
            <li>
              Check{" "}
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                chrome://components/
              </code>{" "}
              to ensure &quot;Optimization Guide On Device Model&quot; is
              downloaded
            </li>
          </ol>
          <p className="text-xs text-muted-foreground italic">
            Note: The translation model will download on first use
            (approximately 1-2GB). Make sure you have at least 22GB of free disk
            space.
          </p>
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Dismiss"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
