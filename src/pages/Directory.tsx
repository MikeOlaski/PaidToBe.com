import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import CountryCard from "@/components/CountryCard";
import { countries, regions, ubiStatuses, type Region, type UBIStatus } from "@/data/countries";

type SortKey = "readinessScore" | "gdpPerCapita" | "policyMomentum" | "name";

export default function Directory() {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<Region | "all">("all");
  const [selectedUBI, setSelectedUBI] = useState<UBIStatus | "all">("all");
  const [sortBy, setSortBy] = useState<SortKey>("readinessScore");
  const [showFilters, setShowFilters] = useState(false);

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
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold md:text-4xl">Country Directory</h1>
          <p className="mt-2 text-muted-foreground">
            Browse and compare {countries.length} jurisdictions on their post-labor economy readiness
          </p>
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
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <div className="flex flex-wrap gap-3 rounded-lg border bg-card p-4">
              <Select value={selectedRegion} onValueChange={(v) => setSelectedRegion(v as Region | "all")}>
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

              <Select value={selectedUBI} onValueChange={(v) => setSelectedUBI(v as UBIStatus | "all")}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="UBI Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {ubiStatuses.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortKey)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="readinessScore">Readiness Score</SelectItem>
                  <SelectItem value="gdpPerCapita">GDP per Capita</SelectItem>
                  <SelectItem value="policyMomentum">Policy Momentum</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                </SelectContent>
              </Select>

              {hasFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear all
                </Button>
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

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <CountryCard key={c.id} country={c} />
          ))}
        </div>

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
