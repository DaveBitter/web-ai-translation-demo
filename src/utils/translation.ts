// Type definitions for Chrome's Translation API (experimental)
declare global {
  interface Window {
    LanguageDetector?: {
      availability?: () => Promise<string>;
      create?: () => Promise<LanguageDetectorInstance>;
    };
    Translator?: {
      availability?: () => Promise<string>;
      create?: (options: {
        sourceLanguage: string;
        targetLanguage: string;
      }) => Promise<TranslatorInstance>;
    };
  }

  interface TranslatorInstance {
    translate: (text: string) => Promise<string>;
    ready?: Promise<void>;
    addEventListener?: (
      event: string,
      callback: (e: { loaded: number; total: number }) => void
    ) => void;
  }

  interface LanguageDetectorInstance {
    detect: (text: string) => Promise<DetectionResult[]>;
  }

  interface DetectionResult {
    detectedLanguage: string;
    confidence: number;
  }
}

export interface TranslationProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export type TranslationStatus =
  | "idle"
  | "downloading"
  | "translating"
  | "completed"
  | "error";

/**
 * Check if the Translation API is available in the browser
 */
export async function checkTranslationSupport(): Promise<boolean> {
  try {
    if (window.Translator?.availability) {
      const availability = await window.Translator.availability();
      return availability === "readily" || availability === "after-download";
    }
    return false;
  } catch (error) {
    console.error("Error checking translation support:", error);
    return false;
  }
}

/**
 * Detect the language of a given text
 */
export async function detectLanguage(text: string): Promise<string | null> {
  try {
    if (!window.LanguageDetector) {
      return null;
    }

    // Check availability
    if (window.LanguageDetector.availability) {
      const availability = await window.LanguageDetector.availability();

      if (availability === "no") {
        return null;
      }
    }

    if (window.LanguageDetector.create) {
      const detector = await window.LanguageDetector.create();
      const results = await detector.detect(text);

      if (results && results.length > 0) {
        return results[0].detectedLanguage;
      }
    }
    return null;
  } catch (error) {
    console.error("Error detecting language:", error);
    return null;
  }
}

/**
 * Get the user's system language
 */
export function getSystemLanguage(): string {
  const lang = navigator.language.toLowerCase();
  // Extract just the language code (e.g., 'en' from 'en-US')
  return lang.split("-")[0];
}

/**
 * Translate text from one language to another
 */
export async function translateText(
  text: string,
  targetLanguage: string,
  sourceLanguage: string,
  onProgress?: (progress: TranslationProgress) => void
): Promise<string> {
  try {
    if (!sourceLanguage) {
      throw new Error("Source language must be detected before translation");
    }

    if (!window.Translator?.create) {
      throw new Error(
        "Translator API not available. Enable #language-detection-api flag in chrome://flags"
      );
    }

    const translator = await window.Translator.create({
      sourceLanguage,
      targetLanguage,
    });

    // Listen for download progress
    if (translator.addEventListener && onProgress) {
      translator.addEventListener("downloadprogress", (e) => {
        onProgress({
          loaded: e.loaded,
          total: e.total,
          percentage: Math.round((e.loaded / e.total) * 100),
        });
      });
    }

    // Wait for the translator to be ready if needed
    if (translator.ready) {
      await translator.ready;
    }

    // Perform the translation
    const translatedText = await translator.translate(text);
    return translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to translate text"
    );
  }
}

/**
 * Check if a specific language pair is available for translation
 */
export async function checkLanguagePairAvailability(
  sourceLanguage: string,
  targetLanguage: string
): Promise<boolean> {
  try {
    // For now, assume available if the Translator API exists
    return !!window.Translator;
  } catch (error) {
    console.error("Error checking language pair availability:", error);
    return false;
  }
}
