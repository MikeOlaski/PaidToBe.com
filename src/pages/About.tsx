import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, BookOpen, Database, RefreshCw, Target, DollarSign, TrendingUp, Scale, Globe, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const dimensions = [
  { name: "Policy Progressiveness", weight: "25%", icon: Shield, desc: "Active UBI/UHI pilots, legislative proposals, safety net comprehensiveness, healthcare universality, and the legal framework for universal income programs." },
  { name: "Economic Capacity", weight: "25%", icon: DollarSign, desc: "GDP per capita, sovereign wealth funds, fiscal headroom, tax base resilience, and the economic surplus available to fund universal programs at scale." },
  { name: "Political Will", weight: "20%", icon: Scale, desc: "Government statements and party platforms on UBI/UHI, referendum history, civil society advocacy, think-tank activity, and cross-party support levels." },
  { name: "Expat Accessibility", weight: "15%", icon: Globe, desc: "Visa pathways for skilled workers and investors, dual citizenship rules, tax treaties, cost of living relative to income, and quality of life indicators." },
  { name: "Policy Momentum", weight: "15%", icon: TrendingUp, desc: "Rate of recent policy changes, pilot expansions or launches, public discourse trends, media coverage intensity, and prediction market sentiment shifts." },
];

const ctiSteps = [
  { step: "1", title: "Cost of Living Index", desc: "We use Numbeo's Cost of Living Index (NYC = 100) to establish each country's baseline cost of goods and services." },
  { step: "2", title: "Thriving Target", desc: "The 'utopia' target is set at 10× the local cost of living baseline: (COL Index ÷ 100) × $30,000 × 10. This represents the annual income at which a person would be thriving, not merely surviving." },
  { step: "3", title: "Current Cash Transfer", desc: "We measure the maximum annual cash transfer available through the country's primary transfer program (UBI pilot, unemployment insurance, social assistance, etc.) converted to USD." },
  { step: "4", title: "Cost of Thriving Index", desc: "CTI = (Annual Cash Transfer ÷ Thriving Target) × 100. This shows what percentage of 'thriving income' the state currently provides. Most countries are below 15% — a long way from universal prosperity." },
];

export default function About() {
  return (
    <div className="min-h-screen py-16">
      <div className="container max-w-4xl">
        <Badge className="mb-4">Methodology</Badge>
        <h1 className="font-serif text-3xl font-bold md:text-5xl">
          How we score readiness
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Our Post-Labor Readiness Score combines multiple dimensions to assess how prepared each jurisdiction is for an AI-driven economic transformation. Below is a complete breakdown of our methodology.
        </p>

        {/* Readiness Score */}
        <h2 className="mb-6 mt-14 font-serif text-2xl font-bold flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-accent" />
          Readiness Score (0-10)
        </h2>
        <div className="space-y-4">
          {dimensions.map((d) => (
            <Card key={d.name}>
              <CardContent className="flex items-start gap-4 pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 flex-shrink-0">
                  <d.icon className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-semibold">{d.name}</h3>
                    <Badge variant="outline" className="font-mono text-xs">{d.weight}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{d.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cost of Thriving Index */}
        <h2 className="mb-6 mt-14 font-serif text-2xl font-bold flex items-center gap-2">
          <Target className="h-6 w-6 text-accent" />
          Cost of Thriving Index (CTI)
        </h2>
        <Card className="mb-6 border-accent/30 bg-accent/5">
          <CardContent className="py-6">
            <p className="text-sm text-muted-foreground">
              The CTI is our signature metric. It answers: <strong className="text-foreground">"What percentage of a 'thriving' income does each country currently provide through state transfers?"</strong>
              The 10× multiplier is aspirational — representing a post-scarcity future where AI-generated abundance enables everyone to live far above subsistence.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {ctiSteps.map((s) => (
            <Card key={s.step}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold flex-shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold">{s.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-4">
          <CardContent className="py-5">
            <h4 className="font-serif font-semibold mb-2">Example: Finland 🇫🇮</h4>
            <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
              <div>
                <p className="text-muted-foreground">COL Index</p>
                <p className="font-bold">77.3</p>
              </div>
              <div>
                <p className="text-muted-foreground">Thriving Target</p>
                <p className="font-bold">$231,900/yr</p>
              </div>
              <div>
                <p className="text-muted-foreground">Annual Transfer</p>
                <p className="font-bold">$8,064/yr</p>
              </div>
              <div>
                <p className="text-muted-foreground">CTI Score</p>
                <p className="font-bold text-accent">3.5%</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Even Finland — one of the world's most generous welfare states — provides only 3.5% of a "thriving" income through state transfers. This illustrates the massive gap between current welfare and universal prosperity, and why AI-driven economic surplus is needed to close it.
            </p>
          </CardContent>
        </Card>

        {/* Additional Metrics */}
        <h2 className="mb-6 mt-14 font-serif text-2xl font-bold">Additional Metrics</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-serif text-base">
                <DollarSign className="h-5 w-5 text-accent" /> Annual Cash Transfer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The maximum annual cash transfer available through each country's primary transfer program, converted to USD.
                Includes UBI pilots, unemployment insurance, social assistance, and guaranteed income programs.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-serif text-base">
                <BarChart3 className="h-5 w-5 text-accent" /> Cost of Living Index
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Based on Numbeo's Cost of Living Index with New York City as baseline (100). Covers consumer goods, rent, restaurants, groceries, and purchasing power.
                Used to normalize cash transfers across countries.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Data sources */}
        <h2 className="mb-6 mt-14 font-serif text-2xl font-bold">Data Sources</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { icon: Database, title: "Public Policy Databases", desc: "OECD Social Expenditure, World Bank Social Protection, IMF Fiscal Monitor, national government publications" },
            { icon: BookOpen, title: "Academic Research", desc: "Stanford Basic Income Lab, BIEN (Basic Income Earth Network), peer-reviewed studies on UBI pilots and AI labor impact" },
            { icon: BarChart3, title: "Economic Indices", desc: "Numbeo Cost of Living, IMF World Economic Outlook GDP data, national statistical agencies for income data" },
            { icon: RefreshCw, title: "Real-Time Intelligence", desc: "Government press releases, policy announcements, prediction markets, and AI-aggregated news (premium members)" },
          ].map((s) => (
            <Card key={s.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-base">
                  <s.icon className="h-5 w-5 text-accent" />
                  {s.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission */}
        <div className="mt-14 rounded-2xl bg-primary p-10 text-primary-foreground">
          <h2 className="font-serif text-2xl font-bold">Our Mission</h2>
          <p className="mt-4 opacity-80 leading-relaxed">
            AI is transforming the global labor market faster than policy can keep up. PaidToBe exists to help individuals — whether globally mobile expats or concerned citizens — understand which jurisdictions are leading the transition to a post-labor economy.
          </p>
          <p className="mt-4 opacity-80 leading-relaxed">
            We believe everyone deserves access to information about policies that will shape their economic future. Whether you're choosing where to plant roots or advocating for change where you are, we provide the data and intelligence to make informed decisions.
          </p>
          <p className="mt-4 opacity-80 leading-relaxed">
            The gap between "basic" and "high" income is where the post-labor economy story unfolds. Our Cost of Thriving Index measures progress toward a world where AI abundance enables universal prosperity — not just survival.
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link to="/visualizations"><Button variant="outline">View Visualizations</Button></Link>
          <Link to="/policies"><Button variant="outline">Explore Policies</Button></Link>
          <Link to="/directory"><Button>Browse Countries</Button></Link>
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Scores are reviewed monthly. Country data updated as new policies emerge.</p>
          <p className="mt-1">Last comprehensive update: March 2026</p>
        </div>
      </div>
    </div>
  );
}
