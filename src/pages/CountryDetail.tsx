import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Building2, DollarSign, Globe, Heart, Scale, Shield, TrendingUp, Users, Vote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { countries } from "@/data/countries";

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
  const country = countries.find((c) => c.id === id);

  if (!country) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-serif text-2xl font-bold">Country not found</h1>
        <Link to="/directory"><Button variant="link">Back to Directory</Button></Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-5xl">
        <Link to="/directory" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Directory
        </Link>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{country.flag}</span>
            <div>
              <h1 className="font-serif text-3xl font-bold md:text-4xl">{country.name}</h1>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <Badge variant="outline">{country.region}</Badge>
                <Badge>{country.ubiStatus}</Badge>
                <span className="text-sm text-muted-foreground">{country.politicalSystem}</span>
              </div>
            </div>
          </div>
          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
            {country.readinessScore.toFixed(1)}
          </div>
        </div>

        {/* Summary */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <p className="text-muted-foreground leading-relaxed">{country.summary}</p>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="flex-wrap">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="scores">Scores</TabsTrigger>
            <TabsTrigger value="timeline">Policy Timeline</TabsTrigger>
            <TabsTrigger value="expat">Expat Info</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2 font-serif text-lg"><Building2 className="h-5 w-5 text-accent" /> Key Facts</CardTitle></CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Population</span><span className="font-medium">{country.population}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">GDP per Capita</span><span className="font-medium">${country.gdpPerCapita.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Cost of Living</span><span className="font-medium">{country.costOfLiving}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Dual Citizenship</span><span className="font-medium">{country.dualCitizenship ? "✅ Allowed" : "❌ Not allowed"}</span></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2 font-serif text-lg"><TrendingUp className="h-5 w-5 text-accent" /> Top Industries</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {country.topIndustries.map((ind) => (
                      <Badge key={ind} variant="secondary">{ind}</Badge>
                    ))}
                  </div>
                  <div className="mt-4">
                    <ScoreBar label="Workforce Vulnerability to AI" score={country.workforceVulnerability} color="bg-warning" />
                  </div>
                </CardContent>
              </Card>
              <Card className="md:col-span-2">
                <CardHeader><CardTitle className="flex items-center gap-2 font-serif text-lg"><Shield className="h-5 w-5 text-accent" /> Key Policies</CardTitle></CardHeader>
                <CardContent>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {country.keyPolicies.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="scores">
            <Card>
              <CardHeader><CardTitle className="font-serif text-lg">Detailed Scores</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <ScoreBar label="Overall Readiness" score={country.readinessScore} color="bg-primary" />
                <ScoreBar label="Safety Net Strength" score={country.safetyNetStrength} color="bg-accent" />
                <ScoreBar label="Healthcare" score={country.healthcareScore} color="bg-success" />
                <ScoreBar label="Policy Momentum" score={country.policyMomentum} color="bg-warning" />
                <ScoreBar label="Economic Capacity" score={country.economicCapacity} color="bg-info" />
                <ScoreBar label="Political Will" score={country.politicalWill} color="bg-primary" />
                <ScoreBar label="Visa Accessibility" score={country.visaAccessibility} color="bg-accent" />
                <ScoreBar label="Expat Accessibility" score={country.expatAccessibility} color="bg-info" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline">
            <Card>
              <CardHeader><CardTitle className="font-serif text-lg">Policy Timeline</CardTitle></CardHeader>
              <CardContent>
                <div className="relative space-y-6 pl-6 before:absolute before:left-2 before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-border">
                  {country.policyTimeline.map((event, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[18px] top-1 h-3 w-3 rounded-full border-2 border-accent bg-background" />
                      <div className="flex items-baseline gap-3">
                        <span className="text-sm font-bold text-accent">{event.year}</span>
                        <Badge variant="outline" className="text-xs capitalize">{event.type}</Badge>
                      </div>
                      <h4 className="mt-1 font-semibold">{event.title}</h4>
                      <p className="mt-0.5 text-sm text-muted-foreground">{event.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expat">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2 font-serif text-lg"><Globe className="h-5 w-5 text-accent" /> Visa Types</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {country.visaTypes.map((v) => (
                      <Badge key={v} variant="secondary">{v}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2 font-serif text-lg"><DollarSign className="h-5 w-5 text-accent" /> Tax Implications</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{country.taxImplications}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
