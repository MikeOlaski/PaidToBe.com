import { useState } from "react";
import { Check, ArrowRight, Star, Zap, Shield, BookOpen, Map, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Included products shown in Strategist tier
const includedProducts = [
  {
    icon: BookOpen,
    name: "Career Pivot Playbook",
    description: "How to adapt your skills for the AI economy — pivot paths, AI-augmentation tactics, transferable skill mapping.",
    value: "$147",
  },
  {
    icon: Map,
    name: "Migration Intelligence Report",
    description: "Personalized relocation analysis: visa pathways, cost-of-living comparison, timeline, and safety net ranking for your target countries.",
    value: "$199",
  },
  {
    icon: Brain,
    name: '"Who Am I Now?" Workshop',
    description: "Identity and purpose transformation for the AI transition. Reframe your professional identity beyond your job title.",
    value: "$147",
  },
];

const plans = [
  {
    name: "Explorer",
    tagline: "Understand your situation",
    monthlyPrice: null,
    annualPrice: null,
    annualMonthly: null,
    description: "Free forever. No credit card required.",
    icon: Shield,
    color: "default" as const,
    features: [
      "AI displacement risk score for any occupation",
      "Country readiness scores for 28+ jurisdictions",
      "Policy directory — 10 policy types explained",
      "Rankings, visualizations & Cost of Thriving Index",
      "3 blog articles per month",
      "Basic country comparisons (up to 3)",
    ],
    cta: "Get Started Free",
    popular: false,
    includedProducts: [],
  },
  {
    name: "Navigator",
    tagline: "Plan your next move",
    monthlyPrice: "$19",
    annualPrice: "$149",
    annualMonthly: "$12",
    description: "Full intelligence across jobs and countries. Plan before you act.",
    icon: Zap,
    color: "accent" as const,
    features: [
      "Everything in Explorer",
      "Full 341-occupation database with trend data",
      "Country deep-dives — visa, tax, healthcare, expat guides",
      "AI Advisor — 20 queries/month across job + country axes",
      "Weekly intelligence digest — policy & AI labor news",
      "Policy change alerts for watched countries",
      "Country watchlists (up to 5 countries)",
      "Community forum access & peer matching",
      "1 Personal Risk Report included per year ($49–$99 value)",
    ],
    cta: "Start Free Trial",
    popular: true,
    includedProducts: [],
  },
  {
    name: "Strategist",
    tagline: "Execute your transformation",
    monthlyPrice: "$49",
    annualPrice: "$399",
    annualMonthly: "$33",
    description: "Full platform access. Career, location, and identity — all three axes.",
    icon: Star,
    color: "primary" as const,
    features: [
      "Everything in Navigator",
      "Unlimited AI Advisor — no query limits",
      "Personalized Career + Location Plan, updated monthly",
      "Prediction market data — UBI odds per country",
      "Daily intelligence briefing",
      "Unlimited country watchlists",
      "Quarterly 1-on-1 strategy call (60 min)",
      "Priority support & early feature access",
    ],
    cta: "Start Free Trial",
    popular: false,
    includedProducts: includedProducts,
  },
];

export default function Membership() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-screen py-16">
      <div className="container">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="mb-4">Membership</Badge>
          <h1 className="font-serif text-3xl font-bold md:text-5xl">
            Choose your scope
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Every plan includes the free tools. Paid plans unlock the transformation —
            across your career, your location, and your identity.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="mx-auto mt-10 flex max-w-xs items-center justify-center gap-4">
          <span className={`text-sm font-medium ${!isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              isAnnual ? "bg-accent" : "bg-muted"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                isAnnual ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
            Annual
          </span>
          {isAnnual && (
            <Badge variant="outline" className="border-accent text-accent text-xs">
              Save up to 35%
            </Badge>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const displayPrice = plan.monthlyPrice === null
              ? "Free"
              : isAnnual
              ? `${plan.annualMonthly}/mo`
              : plan.monthlyPrice + "/mo";

            const billingNote = plan.monthlyPrice === null
              ? ""
              : isAnnual
              ? `Billed ${plan.annualPrice}/year`
              : "Billed monthly";

            return (
              <Card
                key={plan.name}
                className={`relative flex flex-col ${
                  plan.popular
                    ? "border-accent shadow-lg ring-2 ring-accent/20"
                    : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-accent text-accent-foreground">Most Popular</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <plan.icon className="mx-auto mb-2 h-8 w-8 text-accent" />
                  <CardTitle className="font-serif text-xl">{plan.name}</CardTitle>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {plan.tagline}
                  </p>
                  <div className="mt-3">
                    <span className="font-serif text-4xl font-bold">
                      {displayPrice}
                    </span>
                  </div>
                  {billingNote && (
                    <p className="text-xs text-muted-foreground">{billingNote}</p>
                  )}
                  <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col pt-0">
                  <ul className="flex-1 space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Included products for Strategist */}
                  {plan.includedProducts.length > 0 && (
                    <div className="mt-5 rounded-lg border border-dashed border-accent/40 bg-accent/5 p-4">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent">
                        Also included — sold separately elsewhere
                      </p>
                      <ul className="space-y-3">
                        {plan.includedProducts.map((product) => (
                          <li key={product.name} className="flex items-start gap-2">
                            <product.icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                            <div>
                              <p className="text-xs font-semibold">
                                {product.name}{" "}
                                <span className="font-normal text-muted-foreground line-through">
                                  {product.value}
                                </span>
                              </p>
                              <p className="text-xs text-muted-foreground">{product.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button
                    className={`mt-6 w-full ${
                      plan.popular ? "bg-accent text-accent-foreground hover:bg-accent/90" : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    {plan.cta} <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>

                  {plan.monthlyPrice && (
                    <p className="mt-2 text-center text-xs text-muted-foreground">
                      14-day money-back guarantee
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Value callout */}
        <div className="mx-auto mt-16 max-w-3xl rounded-xl border bg-card p-8 text-center">
          <h2 className="font-serif text-xl font-bold">
            Strategist members get $493+ in products — included.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The Career Pivot Playbook, Migration Intelligence Report, and "Who Am I Now?" Workshop
            are each sold separately. Strategist members get all three bundled into their membership.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {includedProducts.map((p) => (
              <div key={p.name} className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
                <p.icon className="h-4 w-4 text-accent" />
                <span className="font-medium">{p.name}</span>
                <span className="text-muted-foreground line-through">{p.value}</span>
                <Badge variant="outline" className="border-accent text-accent text-xs">Included</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-16 max-w-2xl">
          <h2 className="mb-8 text-center font-serif text-2xl font-bold">Common questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "Who is this for?",
                a: "Anyone navigating the AI labor transition — whether you're worried about your current job, planning a relocation, or working through who you are beyond your career. Professionals, freelancers, expats, new grads, and concerned parents all use PaidToBe.",
              },
              {
                q: "What's the difference between the scopes?",
                a: "Explorer helps you understand your situation using our free data tools. Navigator helps you plan — full job and country intelligence, AI Advisor, and alerts. Strategist helps you execute — unlimited AI guidance, personalized plans, prediction market data, and three transformation products included.",
              },
              {
                q: "What are the included products in Strategist?",
                a: "The Career Pivot Playbook (career adaptation course), Migration Intelligence Report (personalized relocation analysis), and 'Who Am I Now?' Workshop (identity transformation for career disruption). Each is sold separately outside the Strategist membership.",
              },
              {
                q: "Can I switch scopes later?",
                a: "Yes, upgrade or downgrade anytime. If you switch from annual to monthly you'll be billed at the monthly rate at your next renewal.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Monthly plans cancel anytime with no fees. Annual plans include a 14-day money-back guarantee.",
              },
            ].map((item) => (
              <div key={item.q} className="rounded-lg border bg-card p-5">
                <h3 className="font-serif font-semibold">{item.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mx-auto mt-16 max-w-xl text-center">
          <p className="text-muted-foreground text-sm">
            Not ready to commit?
          </p>
          <p className="mt-1 font-serif text-lg font-semibold">
            Explorer is free forever — no credit card, no trial clock.
          </p>
          <Button variant="outline" className="mt-4" size="lg">
            Start with Explorer <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

      </div>
    </div>
  );
}
