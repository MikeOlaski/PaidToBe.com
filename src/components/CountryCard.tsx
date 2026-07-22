import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Country } from "@/data/countries";

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

export default function CountryCard({ country }: { country: Country }) {
  return (
    <Link to={`/country/${country.id}`}>
      <Card className="group h-full transition-all hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{country.flag}</span>
              <div>
                <h3 className="font-serif text-lg font-semibold group-hover:text-primary transition-colors">
                  {country.name}
                </h3>
                <p className="text-xs text-muted-foreground">{country.region}</p>
              </div>
            </div>
            <div className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold ${scoreColor(country.readinessScore)}`}>
              {country.readinessScore.toFixed(1)}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            <Badge variant={ubiStatusVariant(country.ubiStatus)} className="text-xs">
              {country.ubiStatus}
            </Badge>
            {country.keyPolicies.slice(0, 2).map((p) => (
              <Badge key={p} variant="outline" className="text-xs font-normal">
                {p.length > 30 ? p.slice(0, 28) + "…" : p}
              </Badge>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div>
              <span className="font-medium text-foreground">Safety Net</span>
              <div className="mt-0.5 h-1.5 rounded-full bg-muted">
                <div className="h-1.5 rounded-full bg-primary" style={{ width: `${country.safetyNetStrength * 10}%` }} />
              </div>
            </div>
            <div>
              <span className="font-medium text-foreground">Healthcare</span>
              <div className="mt-0.5 h-1.5 rounded-full bg-muted">
                <div className="h-1.5 rounded-full bg-accent" style={{ width: `${country.healthcareScore * 10}%` }} />
              </div>
            </div>
            <div>
              <span className="font-medium text-foreground">Visa Access</span>
              <div className="mt-0.5 h-1.5 rounded-full bg-muted">
                <div className="h-1.5 rounded-full bg-info" style={{ width: `${country.visaAccessibility * 10}%` }} />
              </div>
            </div>
            <div>
              <span className="font-medium text-foreground">Momentum</span>
              <div className="mt-0.5 h-1.5 rounded-full bg-muted">
                <div className="h-1.5 rounded-full bg-warning" style={{ width: `${country.policyMomentum * 10}%` }} />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>GDP/capita: ${country.gdpPerCapita.toLocaleString()} · {country.population}</span>
            <span className="font-medium text-foreground" title="Cost of Thriving Index">CTI: {country.costOfThrivingIndex.toFixed(1)}%</span>
          </div>
          {country.annualCashTransfer > 0 && (
            <p className="text-xs text-accent font-medium">${country.annualCashTransfer.toLocaleString()}/yr cash transfer</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
