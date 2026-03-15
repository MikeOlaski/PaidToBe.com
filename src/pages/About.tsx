import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, BookOpen, Database, RefreshCw } from "lucide-react";

const dimensions = [
  { name: "Policy Progressiveness", weight: "25%", desc: "Active UBI pilots, legislative proposals, safety net comprehensiveness, healthcare universality" },
  { name: "Economic Capacity", weight: "25%", desc: "GDP per capita, sovereign wealth, fiscal headroom to fund universal programs" },
  { name: "Political Will", weight: "20%", desc: "Government statements, party platforms, referendum history, civil society advocacy" },
  { name: "Expat Accessibility", weight: "15%", desc: "Visa options, dual citizenship rules, tax treaties, cost of living, quality of life" },
  { name: "Policy Momentum", weight: "15%", desc: "Recent policy changes, pilot expansions, public discourse trends, prediction market sentiment" },
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
          Our Post-Labor Readiness Score combines multiple dimensions to assess how prepared each jurisdiction is for an AI-driven economic transformation.
        </p>

        {/* Scoring dimensions */}
        <div className="mt-12 space-y-4">
          {dimensions.map((d) => (
            <Card key={d.name}>
              <CardContent className="flex items-start gap-4 pt-6">
                <Badge variant="outline" className="mt-0.5 flex-shrink-0 font-mono">{d.weight}</Badge>
                <div>
                  <h3 className="font-serif font-semibold">{d.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Data sources */}
        <h2 className="mb-6 mt-16 font-serif text-2xl font-bold">Data Sources</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { icon: Database, title: "Public Policy Databases", desc: "OECD, World Bank, IMF policy databases and reports on social protection systems" },
            { icon: BookOpen, title: "Academic Research", desc: "Peer-reviewed studies on UBI pilots, labor market disruption, and AI economic impact" },
            { icon: BarChart3, title: "Prediction Markets", desc: "Polymarket, Metaculus, and other platforms tracking policy implementation probabilities" },
            { icon: RefreshCw, title: "AI-Aggregated News", desc: "Real-time policy news aggregated via Perplexity AI across government and media sources" },
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
        <div className="mt-16 rounded-2xl bg-primary p-10 text-primary-foreground">
          <h2 className="font-serif text-2xl font-bold">Our Mission</h2>
          <p className="mt-4 opacity-80 leading-relaxed">
            AI is transforming the global labor market faster than policy can keep up. SafetyNet Global exists to help individuals — whether globally mobile expats or concerned citizens — understand which jurisdictions are leading the transition to a post-labor economy.
          </p>
          <p className="mt-4 opacity-80 leading-relaxed">
            We believe everyone deserves access to information about policies that will shape their economic future. Whether you're choosing where to plant roots or advocating for change where you are, we provide the data and intelligence to make informed decisions.
          </p>
        </div>

        {/* Update frequency */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Scores are reviewed monthly. Country data is updated as new policies emerge.</p>
          <p className="mt-1">Last comprehensive update: March 2026</p>
        </div>
      </div>
    </div>
  );
}
