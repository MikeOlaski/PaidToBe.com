import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type Country } from "@/data/countries";
import { useCountries } from "@/hooks/useCountries";

type SortField = "readinessScore" | "safetyNetStrength" | "economicCapacity" | "politicalWill" | "expatAccessibility" | "policyMomentum";

const sortFields: { key: SortField; label: string }[] = [
  { key: "readinessScore", label: "Overall" },
  { key: "safetyNetStrength", label: "Safety Net" },
  { key: "economicCapacity", label: "Economy" },
  { key: "politicalWill", label: "Political Will" },
  { key: "policyMomentum", label: "Momentum" },
  { key: "expatAccessibility", label: "Expat Access" },
];

function ComparePanel({ selected, countries: allCountries, onRemove }: { selected: string[]; countries: Country[]; onRemove: (id: string) => void }) {
  const items = selected.map((id) => allCountries.find((c) => c.id === id)!).filter(Boolean);
  if (items.length === 0) return null;

  return (
    <Card className="mb-6">
      <CardHeader><CardTitle className="font-serif text-lg">Comparing {items.length} Countries</CardTitle></CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="pb-2 pr-4 text-left text-muted-foreground font-medium">Metric</th>
                {items.map((c) => (
                  <th key={c.id} className="pb-2 px-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span>{c.flag}</span>
                      <span className="font-semibold">{c.name}</span>
                      <button onClick={() => onRemove(c.id)} className="ml-1 text-muted-foreground hover:text-foreground">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortFields.map((f) => (
                <tr key={f.key} className="border-b last:border-0">
                  <td className="py-2 pr-4 text-muted-foreground">{f.label}</td>
                  {items.map((c) => {
                    const val = c[f.key];
                    const best = Math.max(...items.map((i) => i[f.key]));
                    return (
                      <td key={c.id} className={`py-2 px-3 text-center font-semibold ${val === best ? "text-accent" : ""}`}>
                        {val.toFixed(1)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Rankings() {
  const [sortBy, setSortBy] = useState<SortField>("readinessScore");
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const { data: countries = [], isLoading } = useCountries();

  const sorted = useMemo(() => {
    return [...countries].sort((a, b) => b[sortBy] - a[sortBy]);
  }, [sortBy]);

  const toggleCompare = (id: string) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

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
          <h1 className="font-serif text-3xl font-bold md:text-4xl">Global Rankings</h1>
          <p className="mt-2 text-muted-foreground">
            All jurisdictions ranked by post-labor readiness. Click rows to compare (up to 3).
          </p>
        </div>

        {/* Sort pills */}
        <div className="mb-6 flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center mr-1">Sort by:</span>
          {sortFields.map((f) => (
            <Button
              key={f.key}
              variant={sortBy === f.key ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy(f.key)}
            >
              {f.label}
            </Button>
          ))}
        </div>

        {/* Compare panel */}
        <ComparePanel selected={compareIds} countries={countries} onRemove={(id) => toggleCompare(id)} />

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead className="text-center">Overall</TableHead>
                  <TableHead className="text-center hidden sm:table-cell">Safety Net</TableHead>
                  <TableHead className="text-center hidden md:table-cell">Economy</TableHead>
                  <TableHead className="text-center hidden md:table-cell">Political Will</TableHead>
                  <TableHead className="text-center hidden lg:table-cell">Expat Access</TableHead>
                  <TableHead className="text-center">UBI Status</TableHead>
                  <TableHead className="w-20"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((c, i) => (
                  <TableRow
                    key={c.id}
                    className={`cursor-pointer ${compareIds.includes(c.id) ? "bg-accent/10" : ""}`}
                    onClick={() => toggleCompare(c.id)}
                  >
                    <TableCell className="font-medium text-muted-foreground">{i + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{c.flag}</span>
                        <span className="font-medium">{c.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-bold">{c.readinessScore.toFixed(1)}</TableCell>
                    <TableCell className="text-center hidden sm:table-cell">{c.safetyNetStrength.toFixed(1)}</TableCell>
                    <TableCell className="text-center hidden md:table-cell">{c.economicCapacity.toFixed(1)}</TableCell>
                    <TableCell className="text-center hidden md:table-cell">{c.politicalWill.toFixed(1)}</TableCell>
                    <TableCell className="text-center hidden lg:table-cell">{c.expatAccessibility.toFixed(1)}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={c.ubiStatus === "Active Pilot" ? "default" : c.ubiStatus === "Proposed" ? "secondary" : "outline"} className="text-xs">
                        {c.ubiStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Link to={`/country/${c.id}`} onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="sm">View</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
