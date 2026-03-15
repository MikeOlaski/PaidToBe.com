import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, LayoutGrid, List, TableIcon, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { jobs, categoryLabels, getExposureColor, type JobCategory } from "@/data/jobs";
import JobCard from "@/components/JobCard";

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

function tierLabel(tier: string): string {
  return exposureTiers.find((t) => t.value === tier)?.label ?? tier;
}

type SortKey = "title" | "aiExposure" | "medianPayAnnual" | "outlookPct";
type ViewMode = "cards" | "list" | "table";

const formatPay = (pay: number | null) => (pay ? `$${pay.toLocaleString()}` : "—");

/* ───── List Row ───── */
function JobListItem({ job }: { job: (typeof jobs)[0] }) {
  const outlook = job.outlookPct;
  return (
    <Link to={`/a/${job.slug}`} className="block">
      <div className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md hover:-translate-y-0.5">
        <Briefcase className="h-5 w-5 text-muted-foreground shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-serif font-semibold truncate">{job.title}</h3>
            <Badge className={`${getExposureColor(job.aiExposure)} text-xs shrink-0`}>
              {job.aiExposure}/10
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground truncate">
            {categoryLabels[job.category] || job.category} · {job.entryEducation}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground shrink-0">
          <div className="text-center">
            <div className="font-medium text-foreground">Pay</div>
            <div>{formatPay(job.medianPayAnnual)}</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-foreground">Outlook</div>
            <div className={outlook != null ? (outlook > 0 ? "text-success" : outlook < 0 ? "text-destructive" : "") : ""}>
              {outlook != null ? `${outlook > 0 ? "+" : ""}${outlook}%` : "—"}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function JobsDirectory() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("all");
  const [sortBy, setSortBy] = useState<SortKey>("title");
  const [showFilters, setShowFilters] = useState(false);
  const [view, setView] = useState<ViewMode>("cards");

  const categories = useMemo(() => {
    return [...new Set(jobs.map((j) => j.category))].sort();
  }, []);

  const filtered = useMemo(() => {
    let result = jobs.filter((j) => {
      const matchesSearch = j.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === "all" || j.category === categoryFilter;
      const matchesTier = tierFilter === "all" || tierMatchesScore(tierFilter, j.aiExposure);
      return matchesSearch && matchesCategory && matchesTier;
    });

    result.sort((a, b) => {
      switch (sortBy) {
        case "title": return a.title.localeCompare(b.title);
        case "aiExposure": return b.aiExposure - a.aiExposure;
        case "medianPayAnnual": return (b.medianPayAnnual ?? 0) - (a.medianPayAnnual ?? 0);
        case "outlookPct": return (b.outlookPct ?? 0) - (a.outlookPct ?? 0);
        default: return 0;
      }
    });

    return result;
  }, [search, categoryFilter, tierFilter, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("all");
    setTierFilter("all");
    setSortBy("title");
  };

  const hasFilters = search || categoryFilter !== "all" || tierFilter !== "all";

  return (
    <div className="min-h-screen py-10">
      <div className="container">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold md:text-4xl">Jobs Directory</h1>
            <p className="mt-2 text-muted-foreground">
              Browse and compare {jobs.length} occupations scored for AI exposure
            </p>
          </div>
          <ToggleGroup type="single" value={view} onValueChange={(v) => v && setView(v as ViewMode)} className="shrink-0">
            <ToggleGroupItem value="cards" aria-label="Card view" className="gap-1.5 text-xs">
              <LayoutGrid className="h-4 w-4" /> Cards
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view" className="gap-1.5 text-xs">
              <List className="h-4 w-4" /> List
            </ToggleGroupItem>
            <ToggleGroupItem value="table" aria-label="Table view" className="gap-1.5 text-xs">
              <TableIcon className="h-4 w-4" /> Table
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Search & Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search occupations…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <div className="flex flex-wrap gap-3 rounded-lg border bg-card p-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[200px]"><SelectValue placeholder="Category" /></SelectTrigger>
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
                <SelectTrigger className="w-[200px]"><SelectValue placeholder="AI Exposure" /></SelectTrigger>
                <SelectContent>
                  {exposureTiers.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortKey)}>
                <SelectTrigger className="w-[180px]"><SelectValue placeholder="Sort by" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Name (A-Z)</SelectItem>
                  <SelectItem value="aiExposure">AI Exposure</SelectItem>
                  <SelectItem value="medianPayAnnual">Median Pay</SelectItem>
                  <SelectItem value="outlookPct">Outlook</SelectItem>
                </SelectContent>
              </Select>

              {hasFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>Clear all</Button>
              )}
            </div>
          )}

          {hasFilters && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{filtered.length} results</span>
              {categoryFilter !== "all" && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setCategoryFilter("all")}>
                  {categoryLabels[categoryFilter as JobCategory] || categoryFilter} ×
                </Badge>
              )}
              {tierFilter !== "all" && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setTierFilter("all")}>
                  {tierLabel(tierFilter)} ×
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* ─── Cards View ─── */}
        {view === "cards" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((job) => <JobCard key={job.slug} job={job} />)}
          </div>
        )}

        {/* ─── List View ─── */}
        {view === "list" && (
          <div className="space-y-3">
            {filtered.map((job) => <JobListItem key={job.slug} job={job} />)}
          </div>
        )}

        {/* ─── Table View ─── */}
        {view === "table" && (
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Occupation</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Median Pay</TableHead>
                  <TableHead className="text-right">AI Exposure</TableHead>
                  <TableHead className="text-right hidden md:table-cell">Outlook</TableHead>
                  <TableHead className="hidden lg:table-cell">Education</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((job) => (
                  <TableRow key={job.slug} className="cursor-pointer">
                    <TableCell>
                      <Link to={`/a/${job.slug}`} className="flex items-center gap-2 font-medium hover:text-accent transition-colors">
                        <Briefcase className="h-4 w-4 text-muted-foreground shrink-0" />
                        {job.title}
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">
                      {categoryLabels[job.category] || job.category}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatPay(job.medianPayAnnual)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge className={`${getExposureColor(job.aiExposure)} text-xs`}>
                        {job.aiExposure}/10
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right hidden md:table-cell">
                      <span className={`text-xs font-medium ${(job.outlookPct ?? 0) > 0 ? "text-success" : (job.outlookPct ?? 0) < 0 ? "text-destructive" : "text-muted-foreground"}`}>
                        {job.outlookPct != null ? `${job.outlookPct > 0 ? "+" : ""}${job.outlookPct}%` : "—"}
                      </span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                      {job.entryEducation}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            <p className="text-lg">No occupations match your filters</p>
            <Button variant="link" onClick={clearFilters}>Clear filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}
