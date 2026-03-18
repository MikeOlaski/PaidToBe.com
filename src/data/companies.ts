export interface CompanyTransition {
  id: string;
  name: string;
  logo?: string;
  reductionPercentage?: number;
  reductionCount: string;
  totalBefore: string;
  totalAfter: string;
  reason: string;
  impact: string;
  ceoQuote?: string;
  date: string;
  strategy: string;
  financials?: string;
  sourceLabel: string;
  category: "Tech" | "Finance" | "Chemical" | "Services" | "Retail" | "Education";
}

export const companies: CompanyTransition[] = [
  {
    id: "salesforce",
    name: "Salesforce",
    reductionPercentage: 45,
    reductionCount: "4,000",
    totalBefore: "9,000",
    totalAfter: "5,000",
    reason: "The 'Agentforce' Transition",
    impact: "Autonomous AI platform now handles nearly half of all customer interactions. CSAT scores remained steady.",
    ceoQuote: "AI agents now handle nearly half of all customer interactions.",
    date: "Late 2025",
    strategy: "Replacing human support with AI agents (Agentforce).",
    sourceLabel: "Q4 2025 Earnings Call",
    category: "Tech"
  },
  {
    id: "klarna",
    name: "Klarna",
    reductionPercentage: 57,
    reductionCount: "4,000",
    totalBefore: "7,000",
    totalAfter: "3,000",
    reason: "The Radical Downsizing",
    impact: "AI assistant handles workload of 700 full-time agents. Resolution time down from 11m to 2m.",
    ceoQuote: "Planning to further shrink the company to just 2,000 employees by 2030.",
    date: "February 2026",
    strategy: "Embracing an AI-first model to maximize revenue per employee.",
    financials: "152% increase in revenue per employee.",
    sourceLabel: "Market Update Feb 2026",
    category: "Finance"
  },
  {
    id: "dell",
    name: "Dell Technologies",
    reductionPercentage: 10,
    reductionCount: "11,000",
    totalBefore: "110,000",
    totalAfter: "99,000",
    reason: "Massive AI Pivot",
    impact: "Eliminated roles to reallocate funds toward AI-optimized server business.",
    date: "March 2026",
    strategy: "Modernizing workforce; $500M spent on severance for restructuring.",
    sourceLabel: "Restructuring Announcement",
    category: "Tech"
  },
  {
    id: "block",
    name: "Block (Square/Cash App)",
    reductionPercentage: 40,
    reductionCount: "4,000",
    totalBefore: "10,000",
    totalAfter: "6,000",
    reason: "Scaling Down via AI",
    impact: "Driven by 'growing capability of AI tools' rather than financial distress.",
    ceoQuote: "The decision was driven by the growing capability of AI tools to perform tasks across the board.",
    date: "February 2026",
    strategy: "Drastic AI-related cuts in the fintech sector.",
    sourceLabel: "Jack Dorsey's Shareholder Letter",
    category: "Finance"
  },
  {
    id: "amazon",
    name: "Amazon",
    reductionCount: "30,000",
    totalBefore: "Unknown",
    totalAfter: "Unknown",
    reason: "Flattening Management Layers",
    impact: "Automating internal decision-making and flattening management structures using AI.",
    date: "2025-2026",
    strategy: "Internal corporate restructuring for efficiency.",
    sourceLabel: "Industry Report",
    category: "Retail"
  },
  {
    id: "accenture",
    name: "Accenture",
    reductionCount: "11,000",
    totalBefore: "Unknown",
    totalAfter: "Unknown",
    reason: "The Reskilling Mandate",
    impact: "Those who 'cannot reskill' for AI are being exited.",
    ceoQuote: "Those who cannot reskill for AI will be exited.",
    date: "2025-2026",
    strategy: "Aggressive workforce reskilling pivot.",
    sourceLabel: "Julie Sweet CEO Statement",
    category: "Services"
  },
  {
    id: "dow-chemical",
    name: "Dow Chemical",
    reductionCount: "4,500",
    totalBefore: "Unknown",
    totalAfter: "Unknown",
    reason: "AI-Driven Manufacturing",
    impact: "Shifted focus to AI-driven chemical manufacturing and material science.",
    date: "2025",
    strategy: "Operational efficiency through industrial AI.",
    sourceLabel: "Annual Report",
    category: "Chemical"
  },
  {
    id: "livspace",
    name: "Livspace",
    reductionCount: "1,000",
    totalBefore: "Unknown",
    totalAfter: "Unknown",
    reason: "Agentic Organization Goal",
    impact: "Pivoting to become an 'AI-native, agentic organization'.",
    date: "2026",
    strategy: "Full organizational pivot to AI-native workflows.",
    sourceLabel: "Company Press Release",
    category: "Services"
  },
  {
    id: "duolingo",
    name: "Duolingo",
    reductionPercentage: 10,
    reductionCount: "Internal Contractors",
    totalBefore: "Unknown",
    totalAfter: "Unknown",
    reason: "AI Content Generation",
    impact: "Offboarded human translators in favor of AI-generated content solutions.",
    date: "2025",
    strategy: "Direct replacement of content creators with LLMs.",
    sourceLabel: "Public Operational Update",
    category: "Education"
  },
  {
    id: "meta",
    name: "Meta",
    reductionCount: "8,000",
    totalBefore: "Unknown",
    totalAfter: "Unknown",
    reason: "Year of Efficiency + AI Pivot",
    impact: "Continued flattening and reduction of non-AI roles to fund H100 GPU clusters.",
    date: "March 2026",
    strategy: "Reallocating headcount from legacy socials to core AI research.",
    sourceLabel: "March 2026 Internal Memo",
    category: "Tech"
  }
];

export interface HumanityArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  source: string;
  category: "Policy" | "Ethics" | "Human-Centric";
}

export const humanityArticles: HumanityArticle[] = [
  {
    id: "hr-architects",
    title: "HR Departments Become 'Architects of the Human-Machine Enterprise'",
    excerpt: "By 2026, HR roles have evolved to focus on the ethical implementation of AI tools, developing policies that ensure safe and accountable synergy between human and machine.",
    date: "March 15, 2026",
    source: "Global HR Management Journal",
    category: "Human-Centric"
  },
  {
    id: "un-advocate",
    title: "UN Appoints First Global Advocate for Human-centric Digital Governance",
    excerpt: "Joseph Gordon-Levitt takes the helm to bridge policy discussions with societal needs, ensuring the massive capital flowing into AI serves to honor rather than erase humanity.",
    date: "March 10, 2026",
    source: "United Nations News",
    category: "Policy"
  },
  {
    id: "gartner-hitl",
    title: "The Rise of 'Human-in-the-Loop': Gartner Predicts New AI Accountability Standards",
    excerpt: "New predictions suggest that 70% of government agencies will require explainable AI (XAI) and human-certified decision loops for all automated citizen services by 2029.",
    date: "March 01, 2026",
    source: "Gartner Research",
    category: "Ethics"
  }
];
