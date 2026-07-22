export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: BlogCategory;
  tags: string[];
  readTime: string;
  featured: boolean;
  countryIds: string[];
  policyIds: string[];
}

export type BlogCategory = "Policy Update" | "Analysis" | "Country Spotlight" | "Opinion" | "Research" | "Breaking";

export const blogPosts: BlogPost[] = [
  {
    id: "marshall-islands-crypto-ubi",
    title: "Marshall Islands Launches World's First National Crypto UBI",
    excerpt: "In a groundbreaking move, the Marshall Islands became the first nation to implement a universal basic income paid entirely in cryptocurrency, signaling a new era for digital welfare distribution.",
    content: `The Marshall Islands has made history by launching the world's first national universal basic income scheme paid in cryptocurrency. Every citizen of the Pacific island nation now receives regular payments in a digital currency, marking a significant milestone in both UBI implementation and blockchain technology adoption.

The program builds on the nation's earlier experiments with the SOV (Sovereign) digital currency, which was declared legal tender in 2018. While the monthly amounts are modest by Western standards, the program demonstrates that blockchain technology can provide transparent, efficient, and corruption-resistant distribution of universal payments.

**Why it matters for the post-labor economy:** This pilot proves that digital currencies can serve as a distribution mechanism for universal income. As AI-generated economic surplus grows, blockchain-based payment systems could enable instant, transparent, borderless distribution of wealth — bypassing traditional banking infrastructure entirely.

**Key takeaways:**
- First national-level UBI paid in cryptocurrency
- Demonstrates feasibility of blockchain-based welfare distribution
- Could serve as a model for other small nations
- Raises questions about currency stability and purchasing power`,
    date: "2025-12-17",
    author: "PaidToBe Research",
    category: "Breaking",
    tags: ["UBI", "Cryptocurrency", "Marshall Islands", "Blockchain", "Pacific Islands"],
    readTime: "4 min",
    featured: true,
    countryIds: ["marshall-islands"],
    policyIds: ["ubi"],
  },
  {
    id: "south-korea-rural-ubi-expansion",
    title: "South Korea Expands Rural Basic Income to 7 Counties",
    excerpt: "South Korea's rural basic income pilot has expanded dramatically, with 7 counties now providing ₩150,000/month to all residents in a bid to combat rural depopulation and test universal payment models.",
    content: `South Korea has significantly expanded its rural basic income program, with seven counties now providing 150,000 won (approximately $115) per month to all residents. The expansion represents one of Asia's most ambitious experiments with unconditional cash transfers.

The program emerged from South Korea's demographic crisis — rural areas are depopulating as young people move to Seoul and other cities. By paying residents simply to live in rural areas, the government hopes to stabilize communities while testing universal payment mechanisms.

**The programs include:**
- Cheongyang County (South Chungcheong)
- Yeoncheon County (Gyeonggi)
- Jangsu County (North Jeolla)
- And 4 additional counties across rural South Korea

Payments are distributed as local gift certificates to keep spending within communities, boosting local economies. Over half of eligible residents in some counties have already signed up.

**Post-labor economy implications:** South Korea's approach of combining UBI with local economic development offers a model for how universal payments could be structured to strengthen communities rather than simply transferring wealth.`,
    date: "2025-12-23",
    author: "PaidToBe Research",
    category: "Policy Update",
    tags: ["UBI", "South Korea", "Rural Development", "Asia-Pacific"],
    readTime: "5 min",
    featured: true,
    countryIds: ["south-korea"],
    policyIds: ["ubi"],
  },
  {
    id: "universal-high-income-explainer",
    title: "Universal High Income: From Survival to Thriving",
    excerpt: "Elon Musk's concept of Universal High Income goes beyond basic survival. We analyze what UHI means, how it differs from UBI, and which countries are best positioned to implement it.",
    content: `The concept of Universal High Income (UHI) has moved from fringe speculation to mainstream discourse in 2025-2026, driven largely by Elon Musk's advocacy and the accelerating capabilities of AI systems.

**What is UHI?**
While Universal Basic Income (UBI) provides a floor — enough to survive — Universal High Income envisions a world where AI and robotics generate such abundance that every person can live at what we'd currently consider an upper-middle-class standard. It's not about preventing poverty; it's about enabling universal prosperity.

**The MOSAIC Model**
The Basic Income Earth Network (BIEN) published the MOSAIC Model in January 2026, proposing two non-invasive mechanisms to capture roughly one quarter of the "AI dividend" — the economic surplus generated by artificial intelligence. Even this modest capture rate would be sufficient to fund a lower-middle-class guaranteed income floor.

**Key differences from UBI:**
- UBI = survival floor (~$1,000/mo in US)
- UHI = thriving income (~$5,000-10,000/mo in US)
- UBI is policy-ready now; UHI requires AI economic transformation
- UBI is funded by redistribution; UHI is funded by AI surplus

**Our Cost of Thriving Index** measures how close each country is to enabling UHI — factoring in current cash transfers, cost of living, economic capacity, and policy momentum.`,
    date: "2026-01-29",
    author: "PaidToBe Research",
    category: "Analysis",
    tags: ["UHI", "Universal High Income", "AI", "Elon Musk", "MOSAIC Model"],
    readTime: "7 min",
    featured: true,
    countryIds: [],
    policyIds: ["uhi", "ubi", "ai-dividend"],
  },
  {
    id: "mosaic-model-analysis",
    title: "The MOSAIC Model: Funding UHI Without Invasive Taxation",
    excerpt: "BIEN's MOSAIC Model proposes capturing just 25% of the AI dividend to fund universal income. We break down the numbers and feasibility.",
    content: `The Basic Income Earth Network published a groundbreaking economic model in January 2026 proposing a pathway to universal high income through what they call the MOSAIC Model.

The core insight: AI is generating an enormous economic surplus — the "AI dividend." The MOSAIC Model proposes capturing just one quarter of this surplus through two non-invasive mechanisms (rather than traditional taxation), which would be sufficient to fund a guaranteed income floor at lower-middle-class levels.

**Key findings:**
- Even under very high unemployment scenarios (30-50%), the model remains solvent
- The mechanisms avoid the political toxicity of "robot taxes"
- Implementation could begin with existing financial infrastructure
- The model scales automatically as AI productivity increases

**What "non-invasive" means:** Rather than taxing AI companies directly (which risks capital flight), MOSAIC proposes mechanisms that capture value at the point of economic exchange — similar to how Alaska's Permanent Fund captures oil revenue without taxing oil companies per se.

**Implications for our rankings:** Countries with strong sovereign wealth funds (Norway, UAE, Singapore) and those with existing dividend distribution infrastructure (Alaska/US) have natural advantages in implementing MOSAIC-type models.`,
    date: "2026-01-15",
    author: "PaidToBe Research",
    category: "Research",
    tags: ["MOSAIC", "AI Dividend", "Economic Model", "BIEN"],
    readTime: "8 min",
    featured: false,
    countryIds: ["norway", "uae", "singapore", "united-states"],
    policyIds: ["ai-dividend", "uhi", "sovereign-wealth"],
  },
  {
    id: "iceland-four-day-week-results",
    title: "Iceland's 4-Day Week: 86% of Workers Now Have Access",
    excerpt: "Iceland's four-day work week trials have been so successful that 86% of the nation's workforce now has access to shorter working hours with no pay reduction.",
    content: `What started as a series of trials has become a nationwide transformation. Iceland's four-day work week experiment has expanded to cover 86% of the working population, making it the world's most successful implementation of reduced working time.

**Key results:**
- Productivity maintained or improved across all trial sectors
- Significant improvements in worker wellbeing and stress levels
- No negative impact on service delivery
- Strong union support enabled rapid scaling

**Why this matters for post-labor economy:** The 4-day week represents a transitional policy — a stepping stone between full employment and a post-labor world. By demonstrating that the same economic output can be achieved in less time, it validates the core premise of post-labor thinking: that productivity gains from technology should benefit workers, not just shareholders.

Iceland's success has inspired trials in the UK (the world's largest), Spain, Portugal, Germany, and Japan. The question is no longer "does it work?" but "how fast can we scale it?"`,
    date: "2025-11-15",
    author: "PaidToBe Research",
    category: "Country Spotlight",
    tags: ["4-Day Week", "Iceland", "Labor Policy", "Work-Life Balance"],
    readTime: "5 min",
    featured: false,
    countryIds: ["iceland"],
    policyIds: ["four-day-week"],
  },
  {
    id: "catalonia-ubi-pilot-design",
    title: "Catalonia Designs Spain's First True UBI Pilot",
    excerpt: "Catalonia's government has published the design for a genuine Universal Basic Income pilot — unconditional, individual, and universal within the target population.",
    content: `The Government of Catalonia has published a detailed design report for what would be Spain's first true Universal Basic Income pilot project. Unlike means-tested programs like the national Ingreso Mínimo Vital, Catalonia's pilot is designed to be genuinely universal and unconditional within the target population.

**Pilot design highlights:**
- 5,000 participants in selected municipalities
- Payment amount set at the poverty threshold
- Truly unconditional — no work requirements
- Individual payments (not household-based)
- Rigorous randomized control trial methodology

This represents a significant evolution from Spain's existing Ingreso Mínimo Vital, which is means-tested and has been criticized for complex application processes that exclude many eligible recipients.

**Broader significance:** If successful, Catalonia's pilot could provide the evidence base for expanding UBI across Spain — the eurozone's fourth-largest economy.`,
    date: "2025-10-01",
    author: "PaidToBe Research",
    category: "Policy Update",
    tags: ["UBI", "Spain", "Catalonia", "Pilot Program", "Europe"],
    readTime: "6 min",
    featured: false,
    countryIds: ["spain"],
    policyIds: ["ubi"],
  },
  {
    id: "norway-sovereign-wealth-ubi-debate",
    title: "Norway Debates Using $1.7T Sovereign Fund for Universal Income",
    excerpt: "A cross-party commission in Norway is examining whether the world's largest sovereign wealth fund could be used to fund universal income programs as AI reshapes the labor market.",
    content: `Norway's Government Pension Fund Global — the world's largest sovereign wealth fund at $1.7 trillion — is at the center of a growing debate about its potential role in funding universal income.

A cross-party commission established in 2025 is examining how AI-driven changes to Norway's labor market could be addressed through the fund, which currently generates returns used to supplement the national budget.

**The math is compelling:**
- $1.7 trillion fund / 5.4 million population = ~$315,000 per citizen
- At 4% annual return = ~$12,600 per citizen per year
- This alone would fund a substantial UBI without touching the principal

**Current spending rule:** Norway limits annual spending from the fund to 3% of its value (the "fiscal rule"). Even within this constraint, the per-capita disbursement would be significant.

**Political landscape:** While the ruling Labour Party has been cautious, the Socialist Left Party has advocated for citizen dividends. The commission's report is expected in 2026.`,
    date: "2025-09-20",
    author: "PaidToBe Research",
    category: "Analysis",
    tags: ["Norway", "Sovereign Wealth", "UBI", "Nordic Model"],
    readTime: "6 min",
    featured: false,
    countryIds: ["norway"],
    policyIds: ["sovereign-wealth", "ubi"],
  },
  {
    id: "sam-altman-uhi-vision",
    title: "Sam Altman's Vision: AI Should Fund Universal High Income",
    excerpt: "OpenAI's CEO continues to advocate for an AI-funded universal income, arguing that AI companies have a moral obligation to ensure broad distribution of AI-generated wealth.",
    content: `Sam Altman, CEO of OpenAI, has been one of the most vocal tech leaders advocating for AI-funded universal income. His position has evolved from supporting basic income to endorsing what Elon Musk calls Universal High Income (UHI).

**Altman's key arguments:**
1. AI will create unprecedented economic surplus
2. This surplus should be distributed broadly, not concentrated
3. Tech companies building AI have a moral obligation to fund distribution
4. UHI is not just possible but inevitable if AI fulfills its promise

**WorldCoin/Tools for Humanity:** Altman's WorldCoin project (now Tools for Humanity) aims to create the identity infrastructure needed for global UBI distribution — using iris scanning to verify unique identities and prevent double-claiming.

**The debate:** Critics argue that tech billionaires promoting UHI are deflecting from present-day harms (job displacement, market concentration). Supporters counter that getting the conversation started now is essential for policy readiness.

**For PaidToBe readers:** The UHI debate underscores why tracking policy readiness is urgent. The countries that build distribution infrastructure now will be first to implement UHI when AI productivity makes it feasible.`,
    date: "2026-02-10",
    author: "PaidToBe Research",
    category: "Opinion",
    tags: ["Sam Altman", "OpenAI", "UHI", "AI", "Tech Policy"],
    readTime: "5 min",
    featured: false,
    countryIds: ["united-states"],
    policyIds: ["uhi", "ai-dividend"],
  },
];

export const blogCategories: BlogCategory[] = ["Breaking", "Policy Update", "Analysis", "Research", "Country Spotlight", "Opinion"];
