import { Check, ArrowRight, Star, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Explorer",
    price: "Free",
    period: "",
    description: "Browse the directory and basic country profiles",
    icon: Shield,
    features: [
      "Full country directory access",
      "Readiness scores & rankings",
      "Basic country profiles",
      "Policy timelines",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Insider",
    price: "$39",
    period: "/month",
    description: "AI-aggregated intelligence and early alerts",
    icon: Zap,
    features: [
      "Everything in Explorer",
      "AI-curated news per country",
      "Early policy change alerts",
      "Prediction market odds tracking",
      "Country comparison tools",
      "Priority email support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Strategist",
    price: "$399",
    period: "/year",
    description: "Full intelligence suite for serious planners",
    icon: Star,
    features: [
      "Everything in Insider",
      "Custom country watchlists",
      "Detailed policy analysis reports",
      "Community forum access",
      "Quarterly strategy briefings",
      "1-on-1 consultation (annual)",
      "2 months free vs monthly",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
];

export default function Membership() {
  return (
    <div className="min-h-screen py-16">
      <div className="container">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="mb-4">Membership</Badge>
          <h1 className="font-serif text-3xl font-bold md:text-5xl">
            Stay ahead of the post-labor transition
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            From browsing country data to receiving AI-powered intelligence briefings — 
            choose the level that fits your planning horizon.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${plan.popular ? "border-accent shadow-lg ring-2 ring-accent/20" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-accent text-accent-foreground">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <plan.icon className="mx-auto mb-2 h-8 w-8 text-accent" />
                <CardTitle className="font-serif text-xl">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="font-serif text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <ul className="flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`mt-6 w-full ${plan.popular ? "bg-accent text-accent-foreground hover:bg-accent/90" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  {plan.cta} <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ-ish section */}
        <div className="mx-auto mt-20 max-w-2xl">
          <h2 className="mb-8 text-center font-serif text-2xl font-bold">Why become a member?</h2>
          <div className="space-y-6">
            {[
              {
                q: "Who is this for?",
                a: "Globally mobile professionals, expats, dual citizens, and anyone planning for a world where AI transforms the labor market. Whether you're choosing where to live or advocating for better policies where you are.",
              },
              {
                q: "How are readiness scores calculated?",
                a: "We combine policy progressiveness, economic capacity, political will, and expat accessibility into a composite score. Each dimension is weighted based on relevance to post-labor economy readiness.",
              },
              {
                q: "What kind of alerts will I receive?",
                a: "AI-aggregated news about UBI pilots, policy proposals, election outcomes affecting social policy, and shifts in prediction market odds for your watched countries.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes. Monthly plans can be cancelled anytime. Annual plans include a 14-day money-back guarantee.",
              },
            ].map((item) => (
              <div key={item.q} className="rounded-lg border bg-card p-5">
                <h3 className="font-serif font-semibold">{item.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
