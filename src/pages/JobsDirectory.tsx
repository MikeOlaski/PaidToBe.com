import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ChevronDown, ChevronUp, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { jobs, categoryLabels, getExposureTier, getExposureColor, type JobCategory } from "@/data/jobs";
import { motion } from "framer-motion";

const exposureTiers = [
  { label: "All Exposure Levels", value: "all" },
  { label: "Minimal (0–1)", value: "minimal" },
  { label: "Low (2–3)", value: "low" },
  { label: "Moderate (4–5)", value: "moderate" },
  { label: "High (6–7)", value: "high" },
  { label: "Very High (8–9)", value: "very-high" },
  { label: "Maximum (10)", value: "maximum" },
];

function tierMatchesScore(tier: string, score: number): boolean {
  switch (tier) {
    case "minimal": return score <= 1;
    case "low": return score >= 2 && score <= 3;
    case "moderate": return score >= 4 && score <= 5;
    case "high": return score >= 6 && score <= 7;
    case "very-high": return score >= 8 && score <= 9;
    case "maximum": return score === 10;
    default: return true;
  }
}

type SortKey = "title" | "aiExposure" | "medianPayAnnual" | "outlookPct";

export default function JobsDirectory() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("all");
  const [sortBy, setSortBy] = useState<SortKey>("title");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => {
    const cats = [...new Set(jobs.map((j) => j.category))].sort();
    return cats;
  }, []);

  const filtered = useMemo(() => {
    let result = jobs.filter((j) => {
      const matchesSearch = j.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === "all" || j.category === categoryFilter;
      const matchesTier = tierFilter === "all" || tierMatchesScore(tierFilter, j.aiExposure);
      return matchesSearch && matchesCategory && matchesTier;
    });

    result.sort((a, b) => {
      let cmp = 0;
      switch (sortBy) {
        case "title":
          cmp = a.title.localeCompare(b.title);
          break;
        case "aiExposure":
          cmp = a.aiExposure - b.aiExposure;
          break;
        case "medianPayAnnual":
          cmp = (a.medianPayAnnual ?? 0) - (b.medianPayAnnual ?? 0);
          break;
        case "outlookPct":
          cmp = (a.outlookPct ?? 0) - (b.outlookPct ?? 0);
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [search, categoryFilter, tierFilter, sortBy, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDir(key === "title" ? "asc" : "desc");
    }
  };

  const SortIcon = ({ field }: { field: SortKey }) => {
    if (sortBy !== field) return null;
    return sortDir === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />;
  };

  const formatPay = (pay: number | null) =>
    pay ? `$${pay.toLocaleString()}` : "—";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b bg-primary py-16 text-primary-foreground">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 border-accent/30 bg-accent/20 text-accent-foreground">
              342 Occupations
            </Badge>
            <h1 className="font-serif text-3xl font-bold md:text-5xl">
              Jobs Directory
            </h1>
            <p className="mt-4 text-lg opacity-85">
              Every US occupation scored for AI exposure. Find yours, understand the risk, and plan your next move.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="border-b bg-surface py-6">
        <div className="container">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search occupations…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
              {showFilters ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </Button>
            <p className="text-sm text-muted-foreground">
              {filtered.length} occupation{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
          {showFilters && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {categoryLabels[cat] || cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={tierFilter} onValueChange={setTierFilter}>
                <SelectTrigger><SelectValue placeholder="AI Exposure" /></SelectTrigger>
                <SelectContent>
                  {exposureTiers.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </section>

      {/* Table */}
      <section className="py-8">
        <div className="container">
          <div className="overflow-x-auto rounded-lg border bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left">
                    <button onClick={() => toggleSort("title")} className="flex items-center gap-1 font-semibold">
                      Occupation <SortIcon field="title" />
                    </button>
                  </th>
                  <th className="hidden px-4 py-3 text-left sm:table-cell">Category</th>
                  <th className="px-4 py-3 text-right">
                    <button onClick={() => toggleSort("medianPayAnnual")} className="ml-auto flex items-center gap-1 font-semibold">
                      Median Pay <SortIcon field="medianPayAnnual" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-right">
                    <button onClick={() => toggleSort("aiExposure")} className="ml-auto flex items-center gap-1 font-semibold">
                      AI Exposure <SortIcon field="aiExposure" />
                    </button>
                  </th>
                  <th className="hidden px-4 py-3 text-right md:table-cell">
                    <button onClick={() => toggleSort("outlookPct")} className="ml-auto flex items-center gap-1 font-semibold">
                      Outlook <SortIcon field="outlookPct" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((job, i) => (
                  <motion.tr
                    key={job.slug}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15, delay: Math.min(i * 0.01, 0.5) }}
                    className="border-b transition-colors hover:bg-muted/30"
                  >
                    <td className="px-4 py-3">
                      <Link
                        to={`/a/${job.slug}`}
                        className="flex items-center gap-2 font-medium text-foreground hover:text-accent"
                      >
                        <Briefcase className="hidden h-4 w-4 shrink-0 text-muted-foreground sm:block" />
                        {job.title}
                      </Link>
                    </td>
                    <td className="hidden px-4 py-3 sm:table-cell">
                      <span className="text-xs text-muted-foreground">
                        {categoryLabels[job.category] || job.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      {formatPay(job.medianPayAnnual)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Badge className={`${getExposureColor(job.aiExposure)} text-xs`}>
                        {job.aiExposure}/10
                      </Badge>
                    </td>
                    <td className="hidden px-4 py-3 text-right md:table-cell">
                      <span className={`text-xs font-medium ${(job.outlookPct ?? 0) > 0 ? "text-success" : (job.outlookPct ?? 0) < 0 ? "text-destructive" : "text-muted-foreground"}`}>
                        {job.outlookPct != null ? `${job.outlookPct > 0 ? "+" : ""}${job.outlookPct}%` : "—"}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-16 text-center text-muted-foreground">
                No occupations match your search.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
