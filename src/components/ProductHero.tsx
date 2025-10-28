import Image from "next/image";

export default function ProductHero() {
  return (
    <div className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="flex flex-col sm:flex-row gap-4 md:gap-8">
          {/* Product Image */}
          <div className="relative h-32 w-32 sm:h-40 sm:w-40 md:h-64 md:w-64 shrink-0 rounded-lg overflow-hidden bg-linear-to-br from-primary/20 to-primary/5 border border-border mx-auto sm:mx-0">
            <Image
              src="/translator-device.png"
              alt="AI-Powered Universal Translator Device"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 text-center sm:text-left space-y-4">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-2">
                AI-Powered Universal Translator Device
              </h1>
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 sm:gap-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4 text-yellow-500"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    4.9 (8 reviews)
                  </span>
                </div>
                <span className="text-xl md:text-2xl font-bold text-primary">
                  $299.99
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 justify-center sm:justify-start">
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 rounded-md font-medium text-sm transition-colors whitespace-nowrap">
                Add to Cart
              </button>
              <button className="border border-border hover:bg-accent h-11 w-11 rounded-md transition-colors flex items-center justify-center">
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
                  className="h-5 w-5"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
