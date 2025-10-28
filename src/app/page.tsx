"use client";

import { useEffect, useState } from "react";
import ProductHeader from "@/components/ProductHeader";
import ProductHero from "@/components/ProductHero";
import ReviewCard from "@/components/ReviewCard";
import TranslationBanner from "@/components/TranslationBanner";
import Footer from "@/components/Footer";
import GitHubCorner from "@/components/GitHubCorner";
import { reviews } from "@/data/reviews";
import { checkTranslationSupport } from "@/utils/translation";

export default function Home() {
  const [isTranslationSupported, setIsTranslationSupported] = useState(true);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkSupport = async () => {
      const supported = await checkTranslationSupport();
      setIsTranslationSupported(supported);
      setIsChecking(false);
    };
    checkSupport();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <GitHubCorner />
      <ProductHeader />

      <main className="flex-1">
        <ProductHero />

        {/* Reviews Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">
                Customer Reviews
              </h2>
              <p className="text-muted-foreground">
                See what our customers from around the world are saying. Use the
                translation feature below each review to read them in your
                preferred language!
              </p>
            </div>

            {/* Translation Support Banner */}
            {!isChecking && !isTranslationSupported && <TranslationBanner />}

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
