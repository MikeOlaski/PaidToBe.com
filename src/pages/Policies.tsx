import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { policies, policyCategories, type PolicyCategory } from "@/data/policies";
import { countries } from "@/data/countries";
import { Search, Users, DollarSign, Briefcase, Layers, ArrowRight } from "lucide-react";

const categoryIcons: Record<PolicyCategory, typeof DollarSign> = {
  "Direct Cash": DollarSign,
  "Services": Layers,
  "Taxation": DollarSign,
  "Labor": Briefcase,
  "Hybrid": Layers,
};

const statusColor = (status: string) => {
  if (status === "Active") return "bg-success text-success-foreground";
  if (status === "Proposed") return "bg-warning text-warning-foreground";
  return "bg-muted text-muted-foreground";
};

export default function Policies() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<PolicyCategory | "all">("all");

  const filtered = useMemo(() => {
    let list = [...policies];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (selectedCategory !== "all") list = list.filter((p) => p.category === selectedCategory);
    return list;
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen py-10">
      <div className="container">
        <div className="mb-8">
          <Badge className="mb-3">Policy Directory</Badge>
          <h1 className="font-serif text-3xl font-bold md:text-4xl">Post-Labor Economy Policies</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Every major policy being discussed, piloted, or proposed to address AI-driven labor displacement — from Universal Basic Income to Universal High Income and beyond.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search policies..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant={selectedCategory === "all" ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory("all")}>All</Button>
            {policyCategories.map((cat) => (
              <Button key={cat} variant={selectedCategory === cat ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory(cat)}>
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Policy Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((policy) => {
            const Icon = categoryIcons[policy.category];
            const activeCountries = policy.countriesActive.map((id) => countries.find((c) => c.id === id)).filter(Boolean);
            const proposedCountries = policy.countriesProposed.map((id) => countries.find((c) => c.id === id)).filter(Boolean);

            return (
              <Card key={policy.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                        <Icon className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <CardTitle className="font-serif text-xl">{policy.name}</CardTitle>
                        <div className="mt-1 flex gap-2">
                          <Badge variant="outline" className="text-xs">{policy.shortName}</Badge>
                          <Badge className={`text-xs ${statusColor(policy.status)}`}>{policy.status}</Badge>
                          <Badge variant="secondary" className="text-xs">{policy.category}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <p className="text-sm text-muted-foreground">{policy.description}</p>

                  {activeCountries.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-foreground mb-1.5">Active in:</p>
                      <div className="flex flex-wrap gap-1">
                        {activeCountries.map((c) => (
                          <Link key={c!.id} to={`/country/${c!.id}`}>
                            <Badge variant="outline" className="text-xs hover:bg-accent/10 cursor-pointer">
                              {c!.flag} {c!.name}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {proposedCountries.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-foreground mb-1.5">Proposed in:</p>
                      <div className="flex flex-wrap gap-1">
                        {proposedCountries.map((c) => (
                          <Link key={c!.id} to={`/country/${c!.id}`}>
                            <Badge variant="secondary" className="text-xs hover:bg-secondary/80 cursor-pointer">
                              {c!.flag} {c!.name}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="font-medium text-foreground">Estimated Cost</p>
                      <p className="text-muted-foreground">{policy.annualCostEstimate}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Target</p>
                      <p className="text-muted-foreground">{policy.targetPopulation}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs font-medium text-success mb-1">Pros</p>
                      <ul className="space-y-0.5">
                        {policy.pros.slice(0, 3).map((p) => (
                          <li key={p} className="text-xs text-muted-foreground flex items-start gap-1">
                            <span className="text-success mt-1">+</span> {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-destructive mb-1">Cons</p>
                      <ul className="space-y-0.5">
                        {policy.cons.slice(0, 3).map((c) => (
                          <li key={c} className="text-xs text-muted-foreground flex items-start gap-1">
                            <span className="text-destructive mt-1">−</span> {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {policy.keyAdvocates.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">{policy.keyAdvocates.join(", ")}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            <p className="text-lg">No policies match your search</p>
            <Button variant="link" onClick={() => { setSearch(""); setSelectedCategory("all"); }}>Clear filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}
