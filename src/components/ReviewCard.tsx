"use client";

import { useState, useEffect } from "react";
import { Review, SUPPORTED_LANGUAGES } from "@/data/reviews";
import {
  translateText,
  getSystemLanguage,
  detectLanguage,
  type TranslationProgress,
} from "@/utils/translation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";
import { Label } from "@/components/Label";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [showOriginal, setShowOriginal] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);

  const systemLanguage = getSystemLanguage();

  // Detect language on mount
  useEffect(() => {
    const detectOnMount = async () => {
      setIsDetecting(true);
      try {
        const detected = await detectLanguage(review.text);
        setDetectedLanguage(detected);
      } catch (err) {
        console.error("Failed to detect language on mount:", err);
      } finally {
        setIsDetecting(false);
      }
    };
    detectOnMount();
  }, [review.text]);

  const isSystemLanguage = detectedLanguage === systemLanguage;

  const handleTranslate = async () => {
    if (!selectedLanguage) return;

    setError(null);
    setIsTranslating(true);
    setIsDownloading(false);
    setDownloadProgress(0);
    setShowOriginal(false);

    try {
      // Ensure we have detected the language
      if (!detectedLanguage) {
        setIsDetecting(true);
        const detected = await detectLanguage(review.text);
        setDetectedLanguage(detected);
        setIsDetecting(false);

        if (!detected) {
          throw new Error(
            "Language Detection API is not available. Please use Chrome 138+ and enable the Translation API flag at chrome://flags/#translation-api"
          );
        }
      }

      const translated = await translateText(
        review.text,
        selectedLanguage,
        detectedLanguage!,
        (progress: TranslationProgress) => {
          setIsDownloading(true);
          setDownloadProgress(progress.percentage);
        }
      );
      setTranslatedText(translated);
      setIsDownloading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Translation failed");
      setTranslatedText(null);
    } finally {
      setIsTranslating(false);
      setIsDownloading(false);
      setIsDetecting(false);
    }
  };

  const toggleOriginal = () => {
    setShowOriginal(!showOriginal);
  };

  const displayText =
    translatedText && !showOriginal ? translatedText : review.text;
  const isShowingTranslation = translatedText && !showOriginal;

  return (
    <div
      className={`rounded-lg border p-6 space-y-4 transition-all ${
        isShowingTranslation
          ? "border-translated-border bg-translated-bg"
          : "border-border bg-card"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold">{review.author}</h3>
            {isSystemLanguage && !isDetecting && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary border border-primary/20 whitespace-nowrap">
                Your language
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={i < review.rating ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4 text-yellow-500"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {new Date(review.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-end shrink-0">
          {isDetecting ? (
            <span className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground border border-border flex items-center gap-1.5">
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
                className="h-3 w-3 animate-spin"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Detecting...
            </span>
          ) : detectedLanguage ? (
            <span className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground border border-border whitespace-nowrap">
              {
                SUPPORTED_LANGUAGES.find((l) => l.code === detectedLanguage)
                  ?.flag
              }{" "}
              {SUPPORTED_LANGUAGES.find((l) => l.code === detectedLanguage)
                ?.name || detectedLanguage}
            </span>
          ) : (
            <span className="text-xs px-2 py-1 rounded-md bg-yellow-100 text-yellow-800 border border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-200 dark:border-yellow-800 whitespace-nowrap">
              Language unknown
            </span>
          )}
          {isShowingTranslation && (
            <span className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 flex items-center gap-1 whitespace-nowrap">
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
                className="h-3 w-3"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
              Translated
            </span>
          )}
        </div>
      </div>

      {/* Review Text */}
      <p className="text-sm leading-relaxed break-words">{displayText}</p>

      {/* Translation Controls */}
      <div className="pt-4 border-t border-border space-y-3">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <Label
              htmlFor={`language-${review.id}`}
              className="text-xs mb-2 block"
            >
              Translate to:
            </Label>
            <Select
              value={selectedLanguage}
              onValueChange={setSelectedLanguage}
            >
              <SelectTrigger id={`language-${review.id}`} className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <SelectItem
                    key={lang.code}
                    value={lang.code}
                    className={
                      lang.code === systemLanguage
                        ? "bg-primary/5 font-medium"
                        : ""
                    }
                  >
                    <span className="flex items-center gap-2">
                      {lang.flag} {lang.name}
                      {lang.code === systemLanguage && (
                        <span className="text-xs text-primary">(System)</span>
                      )}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <button
            onClick={handleTranslate}
            disabled={!selectedLanguage || isTranslating}
            className="h-10 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm transition-colors flex items-center gap-2"
          >
            {isTranslating ? (
              <>
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
                  className="h-4 w-4 animate-spin"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                {isDetecting
                  ? "Detecting..."
                  : isDownloading
                  ? `${downloadProgress}%`
                  : "Translating..."}
              </>
            ) : (
              <>
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
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
                Translate
              </>
            )}
          </button>
        </div>

        {/* Show Original Toggle */}
        {translatedText && (
          <button
            onClick={toggleOriginal}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
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
              className="h-3 w-3"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {showOriginal ? "Show translation" : "Show original"}
          </button>
        )}

        {/* Error Message */}
        {error && (
          <div className="text-xs text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-md p-2">
            {error}
          </div>
        )}

        {/* Download Progress */}
        {isDownloading && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Downloading translation model...</span>
              <span>{downloadProgress}%</span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${downloadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
