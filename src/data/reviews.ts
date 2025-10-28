export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
}

export const reviews: Review[] = [
  {
    id: "1",
    author: "Sarah Chen",
    rating: 5,
    date: "2025-10-15",
    text: "This AI-Powered Universal Translator is absolutely incredible! I used it to translate reviews about itself, and the irony wasn't lost on me. Works flawlessly across all languages. The on-device processing means my data stays private. Best tech purchase of 2025!",
  },
  {
    id: "2",
    author: "María García",
    rating: 5,
    date: "2025-10-20",
    text: "¡Increíble! Este traductor universal con IA es exactamente lo que necesitaba. Lo irónico es que estoy escribiendo esta reseña en español sobre un traductor que probablemente la traducirá. La tecnología on-device es impresionante y la privacidad está garantizada. ¡Muy recomendado!",
  },
  {
    id: "3",
    author: "Jean Dupont",
    rating: 4,
    date: "2025-10-18",
    text: "Excellent appareil! J'adore le fait que je puisse écrire cet avis en français et que d'autres personnes puissent le traduire instantanément. C'est méta, non? La qualité de traduction est remarquable. Seul bémol: nécessite Chrome 138+. Mais bon, c'est le futur!",
  },
  {
    id: "4",
    author: "Hans Mueller",
    rating: 5,
    date: "2025-10-22",
    text: "Fantastisches Gerät! Die Ironie, dass ich eine Bewertung über einen KI-Übersetzer schreibe, die selbst übersetzt werden muss, ist nicht zu übersehen. Die On-Device-Verarbeitung bedeutet maximale Privatsphäre. Die Übersetzungsqualität ist beeindruckend genau. Absolut empfehlenswert!",
  },
  {
    id: "5",
    author: "Yuki Tanaka",
    rating: 5,
    date: "2025-10-19",
    text: "素晴らしい製品です！このAI搭載ユニバーサル翻訳機について日本語でレビューを書いているという皮肉が面白いです。デバイス上で処理されるため、プライバシーが保護されます。翻訳の精度も非常に高く、自然な文章になります。2025年最高の買い物でした！",
  },
  {
    id: "6",
    author: "Pieter van den Berg",
    rating: 4,
    date: "2025-10-21",
    text: "Geweldig apparaat! Het is best grappig dat ik een recensie schrijf in het Nederlands over een vertaler die deze recensie waarschijnlijk gaat vertalen. De AI-technologie werkt volledig on-device, wat perfect is voor privacy. Kleine leercurve, maar daarna fantastisch!",
  },
  {
    id: "7",
    author: "Alessandro Rossi",
    rating: 5,
    date: "2025-10-17",
    text: "Straordinario! Sto scrivendo una recensione in italiano su un traduttore AI che probabilmente tradurrà questa stessa recensione. È meta-ironico e brillante allo stesso tempo. La tecnologia on-device garantisce privacy totale. Funziona perfettamente con tutte le lingue!",
  },
  {
    id: "8",
    author: "Sofia Andersson",
    rating: 5,
    date: "2025-10-16",
    text: "Fantastisk produkt! Jag skriver denna recension på svenska om en AI-översättare som förmodligen kommer att översätta den här texten. Ironin är underbar! On-device-bearbetning innebär att min data förblir privat. Bästa köpet i år!",
  },
];

export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "nl", name: "Dutch", flag: "🇳🇱" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "sv", name: "Swedish", flag: "🇸🇪" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
];
