import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { regions, type Region } from "@/data/countries";
import { useCountries } from "@/hooks/useCountries";
import { policies } from "@/data/policies";
import { TrendingUp, DollarSign, BarChart3, Target } from "lucide-react";

type ChartView = "thriving" | "cash" | "readiness" | "policies";

export default function Visualizations() {
  const [view, setView] = useState<ChartView>("thriving");
  const [regionFilter, setRegionFilter] = useState<Region | "all">("all");
  const { data: countries = [], isLoading } = useCountries();

  const filtered = useMemo(() => {
    let list = [...countries];
    if (regionFilter !== "all") list = list.filter((c) => c.region === regionFilter);
    return list;
  }, [regionFilter]);

  const sortedByThriving = useMemo(() => [...filtered].sort((a, b) => b.costOfThrivingIndex - a.costOfThrivingIndex), [filtered]);
  const sortedByCash = useMemo(() => [...filtered].sort((a, b) => b.annualCashTransfer - a.annualCashTransfer), [filtered]);
  const sortedByReadiness = useMemo(() => [...filtered].sort((a, b) => b.readinessScore - a.readinessScore), [filtered]);
  const maxCash = Math.max(...countries.map((c) => c.annualCashTransfer));

  const policyAdoption = useMemo(() => {
    return policies.map((p) => ({
      ...p,
      activeCount: p.countriesActive.length,
      proposedCount: p.countriesProposed.length,
      totalCount: p.countriesActive.length + p.countriesProposed.length,
    })).sort((a, b) => b.totalCount - a.totalCount);
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10">
      <div className="container">
        <div className="mb-8">
          <Badge className="mb-3">Data Visualizations</Badge>
          <h1 className="font-serif text-3xl font-bold md:text-4xl">Post-Labor Economy at a Glance</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Interactive visualizations comparing countries on key metrics: Cost of Thriving Index, annual cash transfers, readiness scores, and policy adoption.
          </p>
        </div>

        {/* View selector */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2">
            {([
              { key: "thriving", label: "Cost of Thriving", icon: Target },
              { key: "cash", label: "Cash Received", icon: DollarSign },
              { key: "readiness", label: "Readiness Scores", icon: TrendingUp },
              { key: "policies", label: "Policy Adoption", icon: BarChart3 },
            ] as const).map((v) => (
              <Button key={v.key} variant={view === v.key ? "default" : "outline"} size="sm" onClick={() => setView(v.key)} className="gap-1.5">
                <v.icon className="h-4 w-4" /> {v.label}
              </Button>
            ))}
          </div>
          {view !== "policies" && (
            <Select value={regionFilter} onValueChange={(v) => setRegionFilter(v as Region | "all")}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {regions.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* CTI Explanation Card */}
        {view === "thriving" && (
          <Card className="mb-6 border-accent/30 bg-accent/5">
            <CardContent className="py-4">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-serif font-semibold">Cost of Thriving Index (CTI)</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Measures what percentage of a "thriving" income each country currently provides through cash transfers.
                    The target is <strong className="text-foreground">10× the local cost of living</strong> — an aspirational "utopia" baseline where AI-generated
                    abundance enables universal prosperity. A CTI of 100 means the state provides enough for a thriving life. Most countries are far below this today.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Formula: CTI = (Annual Cash Transfer ÷ Thriving Target) × 100, where Thriving Target = (COL Index ÷ 100) × $30,000 × 10
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cost of Thriving Chart */}
        {view === "thriving" && (
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-lg">Cost of Thriving Index by Country</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sortedByThriving.map((c) => (
                  <Link key={c.id} to={`/country/${c.id}`} className="block group">
                    <div className="flex items-center gap-3">
                      <span className="text-lg w-8 text-center">{c.flag}</span>
                      <span className="w-28 text-sm font-medium truncate group-hover:text-primary transition-colors">{c.name}</span>
                      <div className="flex-1">
                        <div className="relative h-6 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-accent to-primary transition-all"
                            style={{ width: `${Math.max(c.costOfThrivingIndex * 2, 1)}%` }} // Scale up for visibility (most are <10)
                          />
                        </div>
                      </div>
                      <div className="w-20 text-right">
                        <span className="text-sm font-bold">{c.costOfThrivingIndex.toFixed(1)}%</span>
                      </div>
                      <div className="w-24 text-right text-xs text-muted-foreground hidden sm:block">
                        ${c.annualCashTransfer.toLocaleString()}/yr
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cash Received Chart */}
        {view === "cash" && (
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-lg">Annual Cash Transfer (USD equivalent)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sortedByCash.map((c) => (
                  <Link key={c.id} to={`/country/${c.id}`} className="block group">
                    <div className="flex items-center gap-3">
                      <span className="text-lg w-8 text-center">{c.flag}</span>
                      <span className="w-28 text-sm font-medium truncate group-hover:text-primary transition-colors">{c.name}</span>
                      <div className="flex-1">
                        <div className="relative h-6 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-success transition-all"
                            style={{ width: `${maxCash > 0 ? (c.annualCashTransfer / maxCash) * 100 : 0}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-24 text-right">
                        <span className="text-sm font-bold">${c.annualCashTransfer.toLocaleString()}</span>
                      </div>
                      <div className="w-32 text-right text-xs text-muted-foreground hidden md:block">
                        {c.annualCashTransferLocal.split("(")[0].trim()}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6 rounded-lg bg-muted/50 p-4">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">Note:</strong> Cash amounts shown are the maximum/typical rate for the primary transfer program in each country.
                  Some are universal (e.g., Alaska PFD), some are means-tested (e.g., Bürgergeld), and some are pilot programs (e.g., GiveDirectly).
                  Amounts are converted to USD at approximate current rates.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Readiness Scores Chart */}
        {view === "readiness" && (
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-lg">Post-Labor Readiness Score (0-10)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sortedByReadiness.map((c, i) => (
                  <Link key={c.id} to={`/country/${c.id}`} className="block group">
                    <div className="flex items-center gap-3">
                      <span className="w-6 text-xs text-muted-foreground text-right">{i + 1}</span>
                      <span className="text-lg w-8 text-center">{c.flag}</span>
                      <span className="w-28 text-sm font-medium truncate group-hover:text-primary transition-colors">{c.name}</span>
                      <div className="flex-1">
                        <div className="relative h-6 rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              c.readinessScore >= 8 ? "bg-success" :
                              c.readinessScore >= 6 ? "bg-info" :
                              c.readinessScore >= 4 ? "bg-warning" : "bg-destructive"
                            }`}
                            style={{ width: `${c.readinessScore * 10}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-16 text-right">
                        <span className="text-sm font-bold">{c.readinessScore.toFixed(1)}</span>
                      </div>
                      <Badge variant="outline" className="text-xs hidden sm:inline-flex">{c.ubiStatus}</Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Policy Adoption Chart */}
        {view === "policies" && (
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-lg">Policy Adoption Across Countries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {policyAdoption.map((p) => (
                  <div key={p.id}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-serif font-semibold">{p.name}</span>
                        <Badge variant="outline" className="ml-2 text-xs">{p.shortName}</Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {p.activeCount} active · {p.proposedCount} proposed
                      </span>
                    </div>
                    <div className="flex h-8 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-success flex items-center justify-center text-xs font-medium text-success-foreground"
                        style={{ width: `${(p.activeCount / countries.length) * 100}%`, minWidth: p.activeCount > 0 ? "2rem" : 0 }}
                      >
                        {p.activeCount > 0 && p.activeCount}
                      </div>
                      <div
                        className="h-full bg-warning flex items-center justify-center text-xs font-medium text-warning-foreground"
                        style={{ width: `${(p.proposedCount / countries.length) * 100}%`, minWidth: p.proposedCount > 0 ? "2rem" : 0 }}
                      >
                        {p.proposedCount > 0 && p.proposedCount}
                      </div>
                    </div>
                    <div className="mt-1 flex gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-success" /> Active</span>
                      <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-warning" /> Proposed</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Key insight cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Card className="bg-accent/5 border-accent/20">
            <CardContent className="pt-6 text-center">
              <DollarSign className="mx-auto h-8 w-8 text-accent mb-2" />
              <p className="font-serif text-3xl font-bold">${Math.round(countries.reduce((sum, c) => sum + c.annualCashTransfer, 0) / countries.length).toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-1">Avg. annual cash transfer</p>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6 text-center">
              <Target className="mx-auto h-8 w-8 text-primary mb-2" />
              <p className="font-serif text-3xl font-bold">{(countries.reduce((sum, c) => sum + c.costOfThrivingIndex, 0) / countries.length).toFixed(1)}%</p>
              <p className="text-sm text-muted-foreground mt-1">Avg. Cost of Thriving Index</p>
            </CardContent>
          </Card>
          <Card className="bg-info/5 border-info/20">
            <CardContent className="pt-6 text-center">
              <TrendingUp className="mx-auto h-8 w-8 text-info mb-2" />
              <p className="font-serif text-3xl font-bold">{countries.filter((c) => c.ubiStatus === "Active Pilot").length}</p>
              <p className="text-sm text-muted-foreground mt-1">Countries with active UBI pilots</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
