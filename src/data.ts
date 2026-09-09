export type Film = {
  id: string;
  title: string;
  category: "Dreamscapes" | "Abstract";
  image: string;
  duration: number;
  ratio: string;
  seed: string;
  prompt: string;
};
export const films: Film[] = [
  {
    id: "A01",
    title: "The other side",
    category: "Dreamscapes",
    image: "portal",
    duration: 6,
    ratio: "16:9",
    seed: "481291",
    prompt:
      "A lone traveler approaches a monumental portal in a silent salt desert. Slow dolly forward, dust suspended in pale afternoon light.",
  },
  {
    id: "A02",
    title: "Soft matter",
    category: "Abstract",
    image: "chrome",
    duration: 4,
    ratio: "9:16",
    seed: "092817",
    prompt:
      "Liquid silver blooms into a delicate flower. A macro lens follows each translucent petal as it catches the light.",
  },
  {
    id: "A03",
    title: "An unfamiliar sun",
    category: "Dreamscapes",
    image: "dunes",
    duration: 8,
    ratio: "16:9",
    seed: "712084",
    prompt:
      "A solitary figure crosses an impossible red desert beneath an unfamiliar sun. Wind carves ripples in vermilion dunes.",
  },
  {
    id: "A04",
    title: "Somewhere, becoming",
    category: "Abstract",
    image: "glass",
    duration: 6,
    ratio: "1:1",
    seed: "361904",
    prompt:
      "A translucent human form drifts among underwater ribbons. Soft caustic light moves across frosted glass, dreamlike and weightless.",
  },
];
export const defaultPrompt =
  "A world that breathes. Translucent silk unfolding over a volcanic landscape, golden light, slow cinematic motion.";
export const stages = [
  "Parsing language",
  "Building world",
  "Estimating motion",
  "Synthesizing frames",
  "Temporal coherence",
  "Final render",
];
