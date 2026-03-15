import { Link } from "react-router-dom";
import { ArrowRight, Globe, Shield, TrendingUp, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { countries } from "@/data/countries";
import CountryCard from "@/components/CountryCard";
import { motion } from "framer-motion";

const stats = [
  { label: "Jurisdictions Tracked", value: "28+", icon: Globe },
  { label: "Active UBI Pilots", value: "8", icon: Zap },
  { label: "Policy Events Logged", value: "60+", icon: TrendingUp },
  { label: "Regions Covered", value: "6", icon: Shield },
];

const topCountries = [...countries].sort((a, b) => b.readinessScore - a.readinessScore).slice(0, 6);

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(158_50%_42%/0.15),transparent_70%)]" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge className="mb-6 bg-accent/20 text-accent-foreground border-accent/30 hover:bg-accent/30">
              Post-Labor Economy Intelligence
            </Badge>
            <h1 className="font-serif text-4xl font-bold leading-tight md:text-6xl">
              Where will you thrive when AI replaces jobs?
            </h1>
            <p className="mt-6 text-lg opacity-80 md:text-xl">
              Track which countries are building the strongest safety nets, UBI programs, and universal high income policies.
              Find your best option before everyone else does.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/directory">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Explore Directory <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/membership">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Join Membership
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b bg-surface py-12">
        <div className="container">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon className="mx-auto mb-2 h-6 w-6 text-accent" />
                <p className="font-serif text-3xl font-bold">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Intelligence for the globally mobile
            </h2>
            <p className="mt-4 text-muted-foreground">
              Whether you're an expat planning your next move, a dual citizen weighing options, or a concerned citizen advocating for change — we track the policies that will define your future.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: TrendingUp,
                title: "Readiness Scores",
                desc: "Every jurisdiction scored on policy progressiveness, economic capacity, political will, and expat accessibility.",
              },
              {
                icon: Users,
                title: "Policy Influence",
                desc: "Find active petitions, civic engagement opportunities, and connect with others pushing for change in your jurisdiction.",
              },
              {
                icon: Zap,
                title: "Early Alerts",
                desc: "Premium members get AI-aggregated news, policy changes, and prediction shifts before they hit mainstream media.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border bg-card p-6">
                <item.icon className="mb-3 h-8 w-8 text-accent" />
                <h3 className="font-serif text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Countries */}
      <section className="bg-surface py-20">
        <div className="container">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-serif text-3xl font-bold">Top Ranked Jurisdictions</h2>
              <p className="mt-2 text-muted-foreground">The countries best positioned for a post-labor economy</p>
            </div>
            <Link to="/directory" className="hidden md:block">
              <Button variant="outline">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topCountries.map((c) => (
              <CountryCard key={c.id} country={c} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/directory">
              <Button variant="outline">
                View All Countries <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl rounded-2xl bg-primary p-10 text-center text-primary-foreground md:p-14">
            <h2 className="font-serif text-3xl font-bold">Stay ahead of the curve</h2>
            <p className="mt-4 opacity-80">
              Get early access to policy changes, prediction market shifts, and AI-aggregated intelligence from 28+ jurisdictions.
            </p>
            <Link to="/membership">
              <Button size="lg" className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
                Become a Member <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
