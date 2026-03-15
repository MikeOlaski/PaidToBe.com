import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Search, SlidersHorizontal, LayoutGrid, List, TableIcon, Clock } from "lucide-react";
import CountryCard from "@/components/CountryCard";
import GanttTimeline from "@/components/GanttTimeline";
import { countries, regions, ubiStatuses, type Region, type UBIStatus, type Country } from "@/data/countries";

type SortKey = "readinessScore" | "gdpPerCapita" | "policyMomentum" | "name";
type ViewMode = "cards" | "list" | "table" | "timeline";

function scoreColor(score: number): string {
  if (score >= 8) return "bg-success text-success-foreground";
  if (score >= 6) return "bg-info text-info-foreground";
  if (score >= 4) return "bg-warning text-warning-foreground";
  return "bg-destructive text-destructive-foreground";
}

function ubiStatusVariant(status: string): "default" | "secondary" | "outline" {
  if (status === "Active Pilot") return "default";
  if (status === "Proposed") return "secondary";
  return "outline";
}

function eventTypeColor(type: string): string {
  switch (type) {
    case "pilot": return "bg-success/20 border-success text-success-foreground";
    case "legislation": return "bg-primary/20 border-primary text-primary-foreground";
    case "proposal": return "bg-warning/20 border-warning text-warning-foreground";
    case "outcome": return "bg-info/20 border-info text-info-foreground";
    default: return "bg-muted border-border text-muted-foreground";
  }
}

/* ───── List Row ───── */
function CountryListItem({ country }: { country: Country }) {
  return (
    <Link to={`/country/${country.id}`} className="block">
      <div className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md hover:-translate-y-0.5">
        <span className="text-2xl">{country.flag}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-serif font-semibold truncate">{country.name}</h3>
            <Badge variant={ubiStatusVariant(country.ubiStatus)} className="text-xs shrink-0">{country.ubiStatus}</Badge>
          </div>
          <p className="text-xs text-muted-foreground truncate">{country.region} · GDP/capita: ${country.gdpPerCapita.toLocaleString()} · {country.population}</p>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground shrink-0">
          <div className="text-center">
            <div className="font-medium text-foreground">CTI</div>
            <div>{country.costOfThrivingIndex.toFixed(1)}%</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-foreground">Cash/yr</div>
            <div>${country.annualCashTransfer.toLocaleString()}</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-foreground">Momentum</div>
            <div>{country.policyMomentum.toFixed(1)}</div>
          </div>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold shrink-0 ${scoreColor(country.readinessScore)}`}>
          {country.readinessScore.toFixed(1)}
        </div>
      </div>
    </Link>
  );
}

/* TimelineView replaced by GanttTimeline component */

export default function Directory() {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<Region | "all">("all");
  const [selectedUBI, setSelectedUBI] = useState<UBIStatus | "all">("all");
  const [sortBy, setSortBy] = useState<SortKey>("readinessScore");
  const [showFilters, setShowFilters] = useState(false);
  const [view, setView] = useState<ViewMode>("cards");

  const filtered = useMemo(() => {
    let list = [...countries];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q) || c.region.toLowerCase().includes(q));
    }
    if (selectedRegion !== "all") list = list.filter((c) => c.region === selectedRegion);
    if (selectedUBI !== "all") list = list.filter((c) => c.ubiStatus === selectedUBI);

    list.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return (b[sortBy] as number) - (a[sortBy] as number);
    });
    return list;
  }, [search, selectedRegion, selectedUBI, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setSelectedRegion("all");
    setSelectedUBI("all");
    setSortBy("readinessScore");
  };

  const hasFilters = search || selectedRegion !== "all" || selectedUBI !== "all";

  return (
    <div className="min-h-screen py-10">
      <div className="container">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold md:text-4xl">Country Directory</h1>
            <p className="mt-2 text-muted-foreground">
              Browse and compare {countries.length} jurisdictions on their post-labor economy readiness
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
            <ToggleGroupItem value="timeline" aria-label="Timeline view" className="gap-1.5 text-xs">
              <Clock className="h-4 w-4" /> Timeline
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Search & Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search countries..."
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
              <Select value={selectedRegion} onValueChange={(v) => setSelectedRegion(v as Region | "all")}>
                <SelectTrigger className="w-[160px]"><SelectValue placeholder="Region" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select value={selectedUBI} onValueChange={(v) => setSelectedUBI(v as UBIStatus | "all")}>
                <SelectTrigger className="w-[160px]"><SelectValue placeholder="UBI Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {ubiStatuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortKey)}>
                <SelectTrigger className="w-[180px]"><SelectValue placeholder="Sort by" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="readinessScore">Readiness Score</SelectItem>
                  <SelectItem value="gdpPerCapita">GDP per Capita</SelectItem>
                  <SelectItem value="policyMomentum">Policy Momentum</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
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
              {selectedRegion !== "all" && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedRegion("all")}>
                  {selectedRegion} ×
                </Badge>
              )}
              {selectedUBI !== "all" && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedUBI("all")}>
                  {selectedUBI} ×
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* ─── Cards View ─── */}
        {view === "cards" && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => <CountryCard key={c.id} country={c} />)}
          </div>
        )}

        {/* ─── List View ─── */}
        {view === "list" && (
          <div className="space-y-3">
            {filtered.map((c) => <CountryListItem key={c.id} country={c} />)}
          </div>
        )}

        {/* ─── Table View ─── */}
        {view === "table" && (
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Country</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                  <TableHead className="text-right hidden sm:table-cell">GDP/capita</TableHead>
                  <TableHead className="text-right hidden md:table-cell">CTI</TableHead>
                  <TableHead className="text-right hidden md:table-cell">Cash/yr</TableHead>
                  <TableHead className="text-right hidden lg:table-cell">Momentum</TableHead>
                  <TableHead className="hidden lg:table-cell">UBI Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c) => (
                  <TableRow key={c.id} className="cursor-pointer">
                    <TableCell>
                      <Link to={`/country/${c.id}`} className="flex items-center gap-2 font-medium hover:text-primary transition-colors">
                        <span className="text-lg">{c.flag}</span>
                        {c.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">{c.region}</TableCell>
                    <TableCell className="text-right">
                      <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${scoreColor(c.readinessScore)}`}>
                        {c.readinessScore.toFixed(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right hidden sm:table-cell">${c.gdpPerCapita.toLocaleString()}</TableCell>
                    <TableCell className="text-right hidden md:table-cell">{c.costOfThrivingIndex.toFixed(1)}%</TableCell>
                    <TableCell className="text-right hidden md:table-cell">${c.annualCashTransfer.toLocaleString()}</TableCell>
                    <TableCell className="text-right hidden lg:table-cell">{c.policyMomentum.toFixed(1)}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge variant={ubiStatusVariant(c.ubiStatus)} className="text-xs">{c.ubiStatus}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* ─── Timeline View ─── */}
        {view === "timeline" && <TimelineView countries={filtered} />}

        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            <p className="text-lg">No countries match your filters</p>
            <Button variant="link" onClick={clearFilters}>Clear filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}
