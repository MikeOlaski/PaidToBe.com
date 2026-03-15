import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Briefcase, TrendingUp, TrendingDown } from "lucide-react";
import { categoryLabels, getExposureColor, type Job } from "@/data/jobs";

function exposureLabel(score: number): string {
  if (score <= 1) return "Minimal";
  if (score <= 3) return "Low";
  if (score <= 5) return "Moderate";
  if (score <= 7) return "High";
  if (score <= 9) return "Very High";
  return "Maximum";
}

export default function JobCard({ job }: { job: Job }) {
  const pay = job.medianPayAnnual ? `$${job.medianPayAnnual.toLocaleString()}` : "—";
  const outlook = job.outlookPct;

  return (
    <Link to={`/a/${job.slug}`} className="block">
      <div className="group rounded-lg border bg-card p-5 transition-all hover:shadow-md hover:-translate-y-0.5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-muted-foreground shrink-0" />
            <h3 className="font-serif font-semibold text-sm leading-tight group-hover:text-accent transition-colors">
              {job.title}
            </h3>
          </div>
          <Badge className={`${getExposureColor(job.aiExposure)} text-xs shrink-0`}>
            {job.aiExposure}/10
          </Badge>
        </div>

        <p className="text-xs text-muted-foreground mb-3">
          {categoryLabels[job.category] || job.category}
        </p>

        <div className="flex items-center justify-between text-xs">
          <div>
            <span className="text-muted-foreground">Median Pay</span>
            <div className="font-semibold text-foreground">{pay}</div>
          </div>
          <div className="text-right">
            <span className="text-muted-foreground">Outlook</span>
            <div className="flex items-center gap-1 font-semibold">
              {outlook != null ? (
                <>
                  {outlook > 0 ? (
                    <TrendingUp className="h-3 w-3 text-success" />
                  ) : outlook < 0 ? (
                    <TrendingDown className="h-3 w-3 text-destructive" />
                  ) : null}
                  <span className={outlook > 0 ? "text-success" : outlook < 0 ? "text-destructive" : "text-muted-foreground"}>
                    {outlook > 0 ? "+" : ""}{outlook}%
                  </span>
                </>
              ) : "—"}
            </div>
          </div>
          <div className="text-right">
            <span className="text-muted-foreground">AI Risk</span>
            <div className="font-semibold text-foreground">{exposureLabel(job.aiExposure)}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
