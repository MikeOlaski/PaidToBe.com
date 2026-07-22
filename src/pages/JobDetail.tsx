import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, TrendingUp, TrendingDown, Minus, DollarSign, GraduationCap, Clock, Brain, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { jobs, categoryLabels, getExposureTier, getExposureColor } from "@/data/jobs";
import { motion } from "framer-motion";

function formatCurrency(val: number | null) {
  if (!val) return "—";
  return `$${val.toLocaleString()}`;
}

function formatNumber(val: number | null) {
  if (!val) return "—";
  return val.toLocaleString();
}

/** Simple projection: linear interpolation from 2024→2034 */
function getProjections(job: typeof jobs[0]) {
  const base = job.medianPayAnnual ?? 0;
  if (!base) return [];
  const growthRate = (job.outlookPct ?? 0) / 100;
  const years = [2024, 2026, 2028, 2030, 2032, 2034];
  return years.map((year) => {
    const t = (year - 2024) / 10;
    const projected = Math.round(base * (1 + growthRate * t));
    return { year, salary: projected };
  });
}

function getAlternatePaths(job: typeof jobs[0]) {
  const paths = [];
  const base = job.medianPayAnnual ?? 50000;

  if (job.aiExposure >= 7) {
    paths.push({
      title: "Pivot to AI-Adjacent Role",
      description: `Leverage your ${job.category.replace(/-/g, " ")} expertise to transition into AI oversight, prompt engineering, or automation consulting.`,
      potentialPay: Math.round(base * 1.3),
      timeline: "6–18 months",
      difficulty: "Moderate",
    });
  }

  paths.push({
    title: "Specialist / Niche Expert",
    description: `Deepen expertise in the highest-value sub-specialty of ${job.title.toLowerCase()}. Specialists command premium rates as generalist tasks get automated.`,
    potentialPay: Math.round(base * 1.5),
    timeline: "1–3 years",
    difficulty: "Moderate",
  });

  paths.push({
    title: "Independent Consulting",
    description: `Build a consulting practice around your domain knowledge. Enterprise clients pay premium for experienced practitioners.`,
    potentialPay: Math.round(base * 1.8),
    timeline: "1–2 years",
    difficulty: "High",
  });

  if (job.entryEducation.includes("Bachelor") || job.entryEducation.includes("Master") || job.entryEducation.includes("Doctoral")) {
    paths.push({
      title: "Management / Leadership Track",
      description: `Move into management within your field. Human leadership and strategy remain difficult to automate.`,
      potentialPay: Math.round(base * 1.6),
      timeline: "2–5 years",
      difficulty: "Moderate",
    });
  }

  return paths;
}

export default function JobDetail() {
  const { slug } = useParams<{ slug: string }>();
  const job = jobs.find((j) => j.slug === slug);

  if (!job) {
    return (
      <div className="min-h-screen bg-background py-20 text-center">
        <h1 className="font-serif text-2xl font-bold">Occupation not found</h1>
        <Link to="/jobs" className="mt-4 inline-block text-accent hover:underline">
          ← Back to Jobs Directory
        </Link>
      </div>
    );
  }

  const tier = getExposureTier(job.aiExposure);
  const tierColor = getExposureColor(job.aiExposure);
  const projections = getProjections(job);
  const alternatePaths = getAlternatePaths(job);
  const outlookPositive = (job.outlookPct ?? 0) > 0;
  const outlookNegative = (job.outlookPct ?? 0) < 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b bg-primary py-12 text-primary-foreground">
        <div className="container">
          <Link to="/jobs" className="mb-4 inline-flex items-center gap-1 text-sm opacity-70 hover:opacity-100">
            <ArrowLeft className="h-4 w-4" /> Jobs Directory
          </Link>
          <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <Badge className="mb-3 border-accent/30 bg-accent/20 text-accent-foreground text-xs">
                {categoryLabels[job.category] || job.category}
              </Badge>
              <h1 className="font-serif text-3xl font-bold md:text-4xl lg:text-5xl">
                {job.title}
              </h1>
              {job.socCode && (
                <p className="mt-2 text-sm opacity-60">SOC {job.socCode}</p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className={`flex h-20 w-20 flex-col items-center justify-center rounded-xl ${tierColor}`}>
                <span className="text-2xl font-bold">{job.aiExposure}</span>
                <span className="text-[10px] font-medium uppercase">{tier}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Key Stats */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { icon: DollarSign, label: "Median Pay", value: formatCurrency(job.medianPayAnnual), sub: job.medianPayHourly ? `${formatCurrency(job.medianPayHourly)}/hr` : undefined },
                  { icon: GraduationCap, label: "Education", value: job.entryEducation },
                  { icon: Users, label: "Jobs (2024)", value: formatNumber(job.numJobs2024) },
                  { icon: Clock, label: "10yr Outlook", value: job.outlookPct != null ? `${job.outlookPct > 0 ? "+" : ""}${job.outlookPct}%` : "—", sub: job.outlookDesc },
                ].map((stat) => (
                  <Card key={stat.label}>
                    <CardContent className="flex flex-col gap-1 p-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <stat.icon className="h-4 w-4" />
                        <span className="text-xs font-medium">{stat.label}</span>
                      </div>
                      <p className="font-serif text-lg font-bold">{stat.value}</p>
                      {stat.sub && <p className="text-xs text-muted-foreground">{stat.sub}</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* AI Impact Analysis */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-serif">
                    <Brain className="h-5 w-5 text-accent" />
                    AI Impact Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">AI Exposure Score</span>
                      <Badge className={tierColor}>{job.aiExposure}/10 — {tier}</Badge>
                    </div>
                    <div className="h-3 w-full rounded-full bg-muted">
                      <div
                        className={`h-3 rounded-full ${tierColor} transition-all`}
                        style={{ width: `${job.aiExposure * 10}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {job.aiRationale}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Salary Projections */}
            {projections.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-serif">
                      {outlookPositive ? <TrendingUp className="h-5 w-5 text-success" /> : outlookNegative ? <TrendingDown className="h-5 w-5 text-destructive" /> : <Minus className="h-5 w-5 text-muted-foreground" />}
                      Salary Projections (2024–2034)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
                      {projections.map((p) => (
                        <div key={p.year} className="text-center">
                          <p className="text-xs text-muted-foreground">{p.year}</p>
                          <p className="font-serif text-sm font-bold">{formatCurrency(p.salary)}</p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-xs text-muted-foreground">
                      Based on BLS projected employment change of {job.outlookPct ?? 0}% through 2034. Linear interpolation for illustrative purposes.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Alternate Earning Paths */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Highest-Potential Earning Paths</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {alternatePaths.map((path, i) => (
                    <div key={i} className="rounded-lg border bg-muted/30 p-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h4 className="font-serif font-semibold">{path.title}</h4>
                          <p className="mt-1 text-sm text-muted-foreground">{path.description}</p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="font-serif text-lg font-bold text-accent">
                            {formatCurrency(path.potentialPay)}
                          </p>
                          <p className="text-xs text-muted-foreground">{path.timeline}</p>
                          <Badge variant="secondary" className="mt-1 text-xs">{path.difficulty}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-base">Employment Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground">Current Employment</p>
                  <p className="font-serif font-bold">{formatNumber(job.numJobs2024)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Projected 2034</p>
                  <p className="font-serif font-bold">{formatNumber(job.projectedEmployment2034)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Change</p>
                  <p className={`font-serif font-bold ${outlookPositive ? "text-success" : outlookNegative ? "text-destructive" : ""}`}>
                    {job.employmentChange != null ? `${job.employmentChange > 0 ? "+" : ""}${formatNumber(job.employmentChange)}` : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Work Experience Required</p>
                  <p className="text-sm font-medium">{job.workExperience}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">On-the-Job Training</p>
                  <p className="text-sm font-medium">{job.training}</p>
                </div>
              </CardContent>
            </Card>

            <a href={job.blsUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full gap-2">
                <ExternalLink className="h-4 w-4" />
                View on BLS.gov
              </Button>
            </a>

            <Card className="border-accent/30 bg-accent/5">
              <CardContent className="p-6 text-center">
                <h3 className="font-serif font-semibold">Get personalized guidance</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Our premium members get custom career transition plans based on their specific role and goals.
                </p>
                <Link to="/membership">
                  <Button className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
                    Join Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
