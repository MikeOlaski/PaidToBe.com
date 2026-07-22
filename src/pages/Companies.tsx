import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Building2, BarChart3, Users, Heart, ExternalLink, ShieldAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { companies, humanityArticles, type CompanyTransition } from "@/data/companies";

export default function Companies() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return companies.filter((c) => 
      c.name.toLowerCase().includes(search.toLowerCase()) || 
      c.reason.toLowerCase().includes(search.toLowerCase()) ||
      c.strategy.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="min-h-screen py-10">
      <div className="container px-4">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-accent mb-4">
            <Building2 className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Corporate Transitions</span>
          </div>
          <h1 className="font-serif text-4xl font-bold md:text-5xl lg:text-6xl mb-6">
            The AI-First <span className="text-accent">Restructuring</span>
          </h1>
          <p className="max-w-3xl text-lg text-muted-foreground leading-relaxed">
            As of March 2026, the trend of companies "restructuring" to make room for AI agents has moved from experimental to a core corporate strategy. Explore the organizations leading this shift and the impact on their human headcount.
          </p>
        </div>

        {/* Humanity Trend Alert */}
        <div className="mb-12 rounded-2xl bg-accent/5 border border-accent/20 p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
          <div className="bg-accent/10 p-3 rounded-xl shrink-0">
            <ShieldAlert className="h-8 w-8 text-accent" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">The "Cover Story" Trend</h3>
            <p className="text-muted-foreground leading-relaxed">
              A recent report found that while 4.5% of 2025 layoffs were officially attributed to AI, 
              <span className="font-semibold text-foreground"> roughly 59% of managers admitted </span> 
              they used AI as a "cover story" for layoffs actually driven by broader cost-cutting measures.
            </p>
          </div>
        </div>

        {/* Company Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search companies by name or strategy…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-background/50 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-20">
          {filtered.map((company) => (
            <Card key={company.id} className="overflow-hidden border-border/50 hover:border-accent/40 transition-all hover:shadow-lg group">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2 text-xs font-medium text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" /> {company.category}
                  </span>
                  <span>{company.date}</span>
                </div>
                <CardTitle className="text-2xl group-hover:text-accent transition-colors font-serif italic">
                  {company.name}
                </CardTitle>
                <CardDescription className="text-sm font-medium text-accent/80">
                  {company.reason}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/40 p-3 rounded-lg">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Headcount Reduction</div>
                    <div className="text-xl font-bold text-destructive">-{company.reductionCount}</div>
                  </div>
                  <div className="bg-muted/40 p-3 rounded-lg flex flex-col justify-center">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Impact</div>
                    <div className="text-lg font-bold">{company.reductionPercentage ? `${company.reductionPercentage}%` : "Restructured"}</div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2 flex items-center gap-1">
                    <Users className="h-3 w-3" /> The Impact
                  </h4>
                  <p className="text-sm text-balance leading-relaxed italic border-l-2 border-accent/20 pl-3">
                    "{company.impact}"
                  </p>
                </div>
                {company.ceoQuote && (
                  <div className="pt-2 text-xs italic text-muted-foreground">
                    " {company.ceoQuote} "
                  </div>
                )}
              </CardContent>
              <CardFooter className="bg-muted/20 border-t border-border/10 py-3 flex justify-between items-center">
                <span className="text-[10px] text-muted-foreground font-mono">{company.sourceLabel}</span>
                <span className="text-xs font-semibold text-accent flex items-center gap-1">
                  Details <ExternalLink className="h-3 w-3" />
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Humanity Section */}
        <div className="mt-20 border-t border-border pt-20">
          <div className="flex items-center gap-2 text-accent mb-4">
            <Heart className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">The Human Element</span>
          </div>
          <h2 className="font-serif text-3xl font-bold md:text-4xl mb-6">
            Ethical Transitions: <span className="text-accent underline decoration-accent/30">Honoring Humanity</span>
          </h2>
          <p className="max-w-2xl text-muted-foreground mb-12">
            While corporate efficiency drives the headlines, a simultaneous movement is rising to ensure the transition honors human dignity and creates new roles for humanity in an AI-driven world.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {humanityArticles.map((article) => (
              <div key={article.id} className="flex flex-col gap-4 group">
                <div className="h-1 w-20 bg-accent/20 group-hover:bg-accent transition-all duration-500" />
                <div className="text-xs font-bold text-accent uppercase tracking-widest">{article.category}</div>
                <h3 className="text-xl font-bold leading-tight group-hover:translate-x-1 transition-transform cursor-pointer">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="mt-auto pt-4 flex items-center justify-between text-[11px] text-muted-foreground uppercase font-semibold">
                  <span>{article.source}</span>
                  <span>{article.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 rounded-3xl bg-foreground text-background p-10 md:p-16 text-center">
          <h3 className="font-serif text-3xl md:text-4xl font-bold mb-6">The roles are changing, not ending.</h3>
          <p className="max-w-xl mx-auto opacity-70 mb-10 text-lg">
            Join the conversation on how we transition towards a future where human presence is honored alongside machine efficiency.
          </p>
          <Link to="/about">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8">
              Learn More About Our Mission
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
