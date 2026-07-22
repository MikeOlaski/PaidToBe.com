import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { Country } from "@/data/countries";

type TargetMode = "col" | "thrive";

/* ── Projection helpers ── */
// Earliest policy event year as "start" of safety-net journey
function getFirstPolicyYear(c: Country): number {
  if (c.policyTimeline.length === 0) return 2025;
  return Math.min(...c.policyTimeline.map((e) => e.year));
}

// Project when a country meets Cost-of-Living baseline (annualCashTransfer >= cost-of-living-adjusted $30k)
function projectCOLMet(c: Country): number {
  const colBaseline = (c.costOfLivingIndex / 100) * 30000;
  if (c.annualCashTransfer >= colBaseline) return Math.min(...c.policyTimeline.map((e) => e.year), 2020);
  // Project based on momentum (higher momentum = sooner)
  const gap = colBaseline - c.annualCashTransfer;
  const annualProgress = Math.max(500, c.policyMomentum * 800);
  const yearsNeeded = Math.ceil(gap / annualProgress);
  return 2025 + Math.min(yearsNeeded, 30);
}

// Project when a country meets Thrive Standard (10x cost of living)
function projectThriveMet(c: Country): number {
  if (c.costOfThrivingIndex >= 100) return 2025;
  const gap = c.thrivingTarget - c.annualCashTransfer;
  const annualProgress = Math.max(500, c.policyMomentum * 2000);
  const yearsNeeded = Math.ceil(gap / annualProgress);
  return 2025 + Math.min(yearsNeeded, 50);
}

function statusColor(status: string): string {
  if (status === "Active Pilot") return "bg-success";
  if (status === "Proposed") return "bg-warning";
  if (status === "Exploring") return "bg-info";
  return "bg-muted-foreground";
}

const YEAR_MIN = 2015;
const YEAR_MAX = 2060;
const YEAR_RANGE = YEAR_MAX - YEAR_MIN;

export default function GanttTimeline({ countries }: { countries: Country[] }) {
  const [target, setTarget] = useState<TargetMode>("col");

  const sorted = useMemo(() => {
    return [...countries].sort((a, b) => {
      const aTarget = target === "col" ? projectCOLMet(a) : projectThriveMet(a);
      const bTarget = target === "col" ? projectCOLMet(b) : projectThriveMet(b);
      return aTarget - bTarget;
    });
  }, [countries, target]);

  // Year markers
  const yearMarkers = useMemo(() => {
    const markers: number[] = [];
    for (let y = 2015; y <= YEAR_MAX; y += 5) markers.push(y);
    return markers;
  }, []);

  const pct = (year: number) => ((year - YEAR_MIN) / YEAR_RANGE) * 100;

  if (countries.length === 0) {
    return <p className="py-10 text-center text-muted-foreground">No countries match the current filter.</p>;
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="space-y-4">
        {/* Controls */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Projected timeline for {sorted.length} countries
          </p>
          <ToggleGroup
            type="single"
            value={target}
            onValueChange={(v) => v && setTarget(v as TargetMode)}
            className="shrink-0"
          >
            <ToggleGroupItem value="col" className="gap-1.5 text-xs">
              Cost of Living
            </ToggleGroupItem>
            <ToggleGroupItem value="thrive" className="gap-1.5 text-xs">
              Thrive Standard
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <p className="text-xs text-muted-foreground">
          {target === "col"
            ? "When each country's annual cash transfers are projected to meet cost-of-living baseline (COL-adjusted $30k)."
            : "When each country's annual cash transfers are projected to meet the Thrive Standard (10× cost of living — the 'Utopia' baseline)."}
        </p>

        {/* Gantt Chart */}
        <div className="rounded-lg border bg-card overflow-x-auto">
          {/* Year header */}
          <div className="relative h-8 border-b bg-muted/50 min-w-[800px]">
            <div className="absolute inset-0 ml-[180px]">
              {yearMarkers.map((y) => (
                <div
                  key={y}
                  className="absolute top-0 h-full flex items-center"
                  style={{ left: `${pct(y)}%` }}
                >
                  <span className="text-[10px] font-medium text-muted-foreground -translate-x-1/2">
                    {y}
                  </span>
                </div>
              ))}
              {/* Today marker */}
              <div
                className="absolute top-0 h-full border-l-2 border-dashed border-primary/50"
                style={{ left: `${pct(2025)}%` }}
              />
            </div>
          </div>

          {/* Rows */}
          <div className="min-w-[800px]">
            {sorted.map((c) => {
              const start = getFirstPolicyYear(c);
              const targetYear = target === "col" ? projectCOLMet(c) : projectThriveMet(c);
              const alreadyMet = targetYear <= 2025;
              const barLeft = pct(Math.max(start, YEAR_MIN));
              const barRight = pct(Math.min(targetYear, YEAR_MAX));
              const barWidth = Math.max(barRight - barLeft, 0.5);

              return (
                <div key={c.id} className="flex items-center border-b last:border-b-0 hover:bg-muted/30 transition-colors group">
                  {/* Country label */}
                  <div className="w-[180px] shrink-0 px-3 py-2.5">
                    <Link
                      to={`/country/${c.id}`}
                      className="flex items-center gap-2 hover:text-accent transition-colors"
                    >
                      <span className="text-base">{c.flag}</span>
                      <div className="min-w-0">
                        <span className="text-xs font-medium truncate block">{c.name}</span>
                        <span className="text-[10px] text-muted-foreground">
                          CTI: {c.costOfThrivingIndex.toFixed(1)}%
                        </span>
                      </div>
                    </Link>
                  </div>

                  {/* Bar area */}
                  <div className="relative flex-1 h-10">
                    {/* Grid lines */}
                    {yearMarkers.map((y) => (
                      <div
                        key={y}
                        className="absolute top-0 h-full border-l border-border/30"
                        style={{ left: `${pct(y)}%` }}
                      />
                    ))}

                    {/* Today line */}
                    <div
                      className="absolute top-0 h-full border-l-2 border-dashed border-primary/30"
                      style={{ left: `${pct(2025)}%` }}
                    />

                    {/* Bar */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={`absolute top-1.5 h-7 rounded-md transition-all ${
                            alreadyMet
                              ? "bg-success/80"
                              : targetYear <= 2035
                                ? "bg-info/70"
                                : targetYear <= 2045
                                  ? "bg-warning/70"
                                  : "bg-destructive/50"
                          }`}
                          style={{
                            left: `${barLeft}%`,
                            width: `${barWidth}%`,
                          }}
                        >
                          {/* Start dot */}
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-foreground/60 border-2 border-card" />

                          {/* End marker (target) */}
                          <div className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-3 w-3 rounded-full border-2 border-card ${
                            alreadyMet ? "bg-success" : "bg-foreground/60"
                          }`} />

                          {/* Policy events as dots on the bar */}
                          {c.policyTimeline.map((evt, i) => {
                            const evtPctInBar = ((evt.year - Math.max(start, YEAR_MIN)) / (Math.min(targetYear, YEAR_MAX) - Math.max(start, YEAR_MIN))) * 100;
                            if (evtPctInBar < 0 || evtPctInBar > 100) return null;
                            return (
                              <Tooltip key={i}>
                                <TooltipTrigger asChild>
                                  <div
                                    className="absolute top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-card border border-foreground/40 cursor-pointer hover:scale-150 transition-transform"
                                    style={{ left: `${evtPctInBar}%` }}
                                  />
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-[220px]">
                                  <p className="font-semibold text-xs">{evt.title} ({evt.year})</p>
                                  <p className="text-xs text-muted-foreground">{evt.description}</p>
                                </TooltipContent>
                              </Tooltip>
                            );
                          })}

                          {/* Year label on bar */}
                          {barWidth > 4 && (
                            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-foreground/80">
                              {alreadyMet ? "✓ Met" : targetYear > YEAR_MAX ? `${YEAR_MAX}+` : targetYear}
                            </span>
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-[280px]">
                        <div className="space-y-1">
                          <p className="font-semibold">{c.flag} {c.name}</p>
                          <p className="text-xs">
                            <span className="text-muted-foreground">First policy action:</span> {start}
                          </p>
                          <p className="text-xs">
                            <span className="text-muted-foreground">
                              {target === "col" ? "COL target:" : "Thrive target:"}
                            </span>{" "}
                            {alreadyMet ? "Already met ✓" : targetYear > YEAR_MAX ? `After ${YEAR_MAX}` : targetYear}
                          </p>
                          <p className="text-xs">
                            <span className="text-muted-foreground">Cash transfer:</span> ${c.annualCashTransfer.toLocaleString()}/yr
                          </p>
                          <p className="text-xs">
                            <span className="text-muted-foreground">
                              {target === "col" ? "COL baseline:" : "Thrive target:"}
                            </span>{" "}
                            ${target === "col"
                              ? Math.round((c.costOfLivingIndex / 100) * 30000).toLocaleString()
                              : c.thrivingTarget.toLocaleString()}/yr
                          </p>
                          <p className="text-xs">
                            <span className="text-muted-foreground">CTI:</span> {c.costOfThrivingIndex.toFixed(1)}%
                          </p>
                        </div>
                      </TooltipContent>
                    </Tooltip>

                    {/* UBI status badge */}
                    <div className="absolute top-1 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Badge variant="outline" className="text-[9px]">{c.ubiStatus}</Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-6 rounded bg-success/80" /> Already met
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-6 rounded bg-info/70" /> By 2035
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-6 rounded bg-warning/70" /> By 2045
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-6 rounded bg-destructive/50" /> After 2045
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-0 border-l-2 border-dashed border-primary/50" /> Today
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-card border border-foreground/40" /> Policy event
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
