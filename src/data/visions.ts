export interface VisionPost {
  id: string;
  title: string;
  story: string;
  videoUrl?: string; // YouTube or Vimeo ID
  category: "Environment" | "Economy" | "Society" | "Tech";
  probability: number; // 0 to 100
  marketVolume: string; // e.g. "$1.2M"
  trend: "rising" | "falling" | "stable";
}

export const visions: VisionPost[] = [
  {
    id: "clean-energy-abundance",
    title: "The Zero-Marginal Cost Era",
    story: "By 2035, solar and fusion breakthroughs have made electricity essentially free. This leads to the desalination of oceans, turning deserts green and ending water scarcity forever.",
    videoUrl: "https://www.youtube.com/embed/RpkBQ0L2XpE", // Placeholder nature/tech video
    category: "Environment",
    probability: 65,
    marketVolume: "$4.5M",
    trend: "rising"
  },
  {
    id: "agentic-economy",
    title: "The Agentic Renaissance",
    story: "Humans no longer perform 'work' in the traditional sense. Instead, every individual owns a fleet of AI agents that generate value, allowing humans to focus entirely on art, philosophy, and community building.",
    videoUrl: "https://www.youtube.com/embed/5S0S5ID8H0M", // Placeholder AI video
    category: "Economy",
    probability: 42,
    marketVolume: "$12.8M",
    trend: "rising"
  },
  {
    id: "biotech-longevity",
    title: "The 150-Year Lifespan",
    story: "Cellular rejuvenation therapy is now a public utility. The average human lifespan has reached 150 years, and 'aging' as a disease is eradicated, shifting society from short-term greed to millennial-scale thinking.",
    category: "Society",
    probability: 28,
    marketVolume: "$8.1M",
    trend: "stable"
  }
];

export const projectionTheory = {
  title: "Visions Projection Theory",
  description: "Innovation on predictive markets doesn't just guess the future; it creates it. By setting the market through 'Vision Projections', we aggregate collective human desire into actionable financial signals. When a vision reaches 80% market probability, it triggers automated investment protocols to accelerate its realization.",
  principles: [
    "Collective Intention as Market Driver",
    "Probability vs. Desirability Correlation",
    "Incentivized Truth-Seeking in Future States"
  ]
};
