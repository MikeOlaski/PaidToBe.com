import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Building2, DollarSign, Globe, Heart, Scale, Shield, TrendingUp, Users, Vote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCountry } from "@/hooks/useCountries";
import { motion } from "framer-motion";

function ScoreBar({ label, score, color = "bg-primary" }: { label: string; score: number; color?: string }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{score.toFixed(1)}</span>
      </div>
      <div className="h-2 rounded-full bg-muted">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${score * 10}%` }} />
      </div>
    </div>
  );
}

export default function CountryDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: country, isLoading } = useCountry(id);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-accent border-t-transparent"></div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="min-h-screen bg-background py-20 text-center">
        <h1 className="font-serif text-2xl font-bold">Country not found</h1>
        <Link to="/directory" className="mt-4 inline-block text-accent hover:underline">
          ← Back to Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Using a dark emerald/slate tint to differentiate from Jobs */}
      <section className="border-b bg-slate-900 py-12 text-primary-foreground dark:bg-slate-950">
        <div className="container">
          <Link to="/directory" className="mb-4 inline-flex items-center gap-1 text-sm text-slate-300 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" /> Country Directory
          </Link>
          <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex items-center gap-5">
              <span className="text-6xl md:text-7xl drop-shadow-md">{country.flag}</span>
              <div>
                <Badge className="mb-3 border-accent/30 bg-accent/20 text-accent-foreground text-xs hover:bg-accent/30">
                  {country.region}
                </Badge>
                <h1 className="font-serif text-3xl font-bold md:text-5xl lg:text-6xl text-white">
                  {country.name}
                </h1>
                <p className="mt-3 text-sm text-slate-300 flex items-center gap-2 flex-wrap">
                  <span className="font-medium">{country.politicalSystem}</span>
                  <span className="opacity-50">•</span>
                  <span className="inline-flex items-center gap-1">
                    UBI Status: <span className="text-white font-medium">{country.ubiStatus}</span>
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <div className="flex h-24 w-24 flex-col items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-lg border border-accent-foreground/10">
                <span className="text-3xl font-bold">{country.readinessScore.toFixed(1)}</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider mt-1 opacity-90">Readiness</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          
          {/* Main content - 2 Columns */}
          <div className="space-y-8 lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <Card>
                <CardContent className="pt-6 font-medium text-muted-foreground leading-relaxed text-lg">
                  {country.summary}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="flex-wrap bg-muted/50 p-1">
                  <TabsTrigger value="overview" className="rounded-md">Overview</TabsTrigger>
                  <TabsTrigger value="scores" className="rounded-md">Scores</TabsTrigger>
                  <TabsTrigger value="timeline" className="rounded-md">Policy Timeline</TabsTrigger>
                  <TabsTrigger value="expat" className="rounded-md">Expat Info</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="grid gap-6">
                    <Card>
                      <CardHeader><CardTitle className="flex items-center gap-2 font-serif text-xl"><Shield className="h-5 w-5 text-accent" /> Key Policies</CardTitle></CardHeader>
                      <CardContent>
                        <ul className="grid gap-3 sm:grid-cols-2">
                          {country.keyPolicies.map((p) => (
                            <li key={p} className="flex items-start gap-3 bg-muted/30 p-3 rounded-lg border border-border/50">
                              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                              <span className="text-sm font-medium">{p}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader><CardTitle className="flex items-center gap-2 font-serif text-xl"><TrendingUp className="h-5 w-5 text-accent" /> Economic Resilience</CardTitle></CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-3">Top Industries</h4>
                          <div className="flex flex-wrap gap-2">
                            {country.topIndustries.map((ind) => (
                              <Badge key={ind} variant="secondary" className="px-3 py-1 font-medium bg-muted hover:bg-muted/80">{ind}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="pt-4 border-t border-border/50">
                          <ScoreBar label="Workforce Vulnerability to AI" score={country.workforceVulnerability} color="bg-warning" />
                          <p className="text-xs text-muted-foreground mt-2">
                            Higher scores indicate more imminent disruption to the local labor market.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="scores">
                  <Card>
                    <CardHeader><CardTitle className="font-serif text-xl">Detailed Readiness Breakdown</CardTitle></CardHeader>
                    <CardContent className="space-y-6 pt-2">
                      <ScoreBar label="Overall Readiness" score={country.readinessScore} color="bg-primary" />
                      <div className="grid gap-6 sm:grid-cols-2 pt-4 border-t border-border/50">
                        <ScoreBar label="Safety Net Strength" score={country.safetyNetStrength} color="bg-accent" />
                        <ScoreBar label="Healthcare Integration" score={country.healthcareScore} color="bg-success" />
                        <ScoreBar label="Policy Momentum" score={country.policyMomentum} color="bg-warning" />
                        <ScoreBar label="Economic Capacity" score={country.economicCapacity} color="bg-info" />
                        <ScoreBar label="Political Will" score={country.politicalWill} color="bg-primary" />
                        <ScoreBar label="Visa Accessibility" score={country.visaAccessibility} color="bg-accent" />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="timeline">
                  <Card>
                    <CardHeader><CardTitle className="font-serif text-xl">Recent Policy Shifts</CardTitle></CardHeader>
                    <CardContent>
                      <div className="relative space-y-8 pl-8 before:absolute before:left-3 before:top-2 before:h-[calc(100%-24px)] before:w-px before:bg-border">
                        {country.policyTimeline.map((event, i) => (
                          <div key={i} className="relative group">
                            <div className="absolute -left-[35px] top-1.5 h-4 w-4 rounded-full border-4 border-accent bg-background group-hover:scale-110 transition-transform" />
                            <div className="flex items-center gap-3 mb-1">
                              <Badge variant="outline" className="text-xs font-bold bg-accent/10 text-accent border-accent/20">
                                {event.year}
                              </Badge>
                              <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">{event.type}</span>
                            </div>
                            <h4 className="text-base font-semibold text-foreground">{event.title}</h4>
                            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="expat">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Card>
                      <CardHeader><CardTitle className="flex items-center gap-2 font-serif text-lg"><Globe className="h-5 w-5 text-accent" /> Visa Pathways</CardTitle></CardHeader>
                      <CardContent>
                        <div className="flex flex-col gap-3">
                          {country.visaTypes.map((v) => (
                            <Badge key={v} variant="secondary" className="justify-start py-2 px-3 bg-muted/50 border border-border">
                              {v}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader><CardTitle className="flex items-center gap-2 font-serif text-lg"><DollarSign className="h-5 w-5 text-accent" /> Tax Implications</CardTitle></CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-4 rounded-lg border border-border/50">
                          {country.taxImplications}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Sidebar - 1 Column */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
              <Card>
                <CardHeader className="bg-muted/30 border-b border-border/50">
                  <CardTitle className="font-serif text-lg flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-accent" /> At a Glance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 pt-6">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">Population</p>
                    <p className="font-serif text-lg font-bold">{country.population}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">GDP per Capita</p>
                    <p className="font-serif text-lg font-bold">${country.gdpPerCapita.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">Cost of Living</p>
                    <p className="font-serif text-lg font-bold">{country.costOfLiving}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">Dual Citizenship</p>
                    <div className="flex items-center gap-2">
                      {country.dualCitizenship ? (
                        <Badge className="bg-success text-success-foreground hover:bg-success">Allowed</Badge>
                      ) : (
                        <Badge variant="destructive">Restricted</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
              <Card className="border-accent/30 bg-accent/5 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Globe className="h-24 w-24" />
                </div>
                <CardContent className="p-6 text-center relative z-10">
                  <h3 className="font-serif text-xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Get Personalized Guidance
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    Our premium members receive custom relocation planning, tax strategy outlines, and regular policy tracking tailored to their specific situation.
                  </p>
                  <Link to="/membership" className="inline-block w-full mt-6">
                    <Button className="w-full bg-accent text-accent-foreground shadow-lg hover:bg-accent/90 hover:shadow-xl transition-all">
                      Become a Member
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
