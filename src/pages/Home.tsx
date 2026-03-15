import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Compass, Sparkles, TrendingUp, Shield, Users, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12 },
  }),
};

const guides = [
  {
    icon: TrendingUp,
    badge: "Guide",
    title: "Maximize Your Earning Power — Before AI Takes the Wheel",
    description:
      "A tactical playbook for every worker: how to stack skills, negotiate leverage, and extract maximum value from your current career while the window is still open.",
    cta: "Read the Guide",
    href: "/blog",
    accent: true,
  },
  {
    icon: Compass,
    badge: "Deep Dive",
    title: "What Does 'No Jobs' Actually Mean?",
    description:
      "Beyond the headlines and fear. A clear-eyed exploration of post-labor economics — what history tells us, what the data shows, and how to think about a world where traditional employment is optional.",
    cta: "Explore the Framework",
    href: "/blog",
    accent: false,
  },
  {
    icon: Sparkles,
    badge: "Pillar Post",
    title: "The God-Given Right to Thrive",
    description:
      "You deserve to thrive — not because of what you produce, but because you exist. The moral, economic, and practical case for universal prosperity in the age of abundance.",
    cta: "Read the Manifesto",
    href: "/blog",
    accent: false,
  },
];

const proofPoints = [
  { value: "28+", label: "Jurisdictions tracked" },
  { value: "342", label: "Occupations analyzed" },
  { value: "60+", label: "Policy events logged" },
  { value: "$0→∞", label: "Earning paths mapped" },
];

const testimonials = [
  {
    quote: "I never thought about my career as something with an expiration date. This changed everything.",
    author: "Digital nomad, Berlin",
  },
  {
    quote: "Finally, someone connecting UBI policy to real career decisions. This is the resource I needed.",
    author: "Policy researcher, Toronto",
  },
  {
    quote: "The AI exposure scores alone are worth it. I restructured my entire skill development plan.",
    author: "Software engineer, Austin",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero — aspirational, big promise */}
      <section className="relative overflow-hidden bg-primary py-28 text-primary-foreground md:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(158_50%_42%/0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(210_70%_50%/0.12),transparent_60%)]" />
        <div className="container relative">
          <motion.div
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div custom={0} variants={fadeUp}>
              <Badge className="mb-6 border-accent/30 bg-accent/20 text-accent-foreground hover:bg-accent/30 text-sm px-4 py-1">
                The Future of Work is Already Here
              </Badge>
            </motion.div>
            <motion.h1
              custom={1}
              variants={fadeUp}
              className="font-serif text-4xl font-bold leading-[1.1] md:text-6xl lg:text-7xl"
            >
              You deserve to thrive —{" "}
              <span className="text-accent">no matter what happens to jobs.</span>
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="mt-6 text-lg leading-relaxed opacity-85 md:text-xl"
            >
              AI is rewriting the rules of work. We give you the intelligence,
              strategies, and global policy insights to stay ahead — and build a
              life of abundance on your own terms.
            </motion.p>
            <motion.div
              custom={3}
              variants={fadeUp}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <Link to="/membership">
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8 h-12"
                >
                  Get Early Access <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/directory">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-base px-8 h-12"
                >
                  Explore the Data
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="border-b bg-surface py-10">
        <div className="container">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {proofPoints.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-center"
              >
                <p className="font-serif text-3xl font-bold text-foreground">{p.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{p.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem → Solution narrative */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">The Problem</Badge>
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Most people aren't preparing for what's coming.
            </h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              AI will automate millions of jobs within the decade. Governments are slowly
              waking up. The people who thrive will be those who understood the shift
              early — and positioned themselves accordingly.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3">
            {[
              {
                icon: Shield,
                title: "Your job has a timeline",
                desc: "Every occupation now has an AI exposure score. Knowing yours is step one.",
              },
              {
                icon: Users,
                title: "Borders are leverage",
                desc: "28+ countries are building safety nets. Where you live will determine your floor.",
              },
              {
                icon: Star,
                title: "Thriving is a right",
                desc: "The economy is producing more than ever. The question is distribution, not scarcity.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-lg border bg-card p-6 text-center"
              >
                <item.icon className="mx-auto mb-3 h-8 w-8 text-accent" />
                <h3 className="font-serif text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Guides — the info products */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">Essential Reading</Badge>
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Three guides to change how you think about your future
            </h2>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8">
            {guides.map((guide, i) => (
              <motion.div
                key={guide.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card
                  className={`overflow-hidden transition-all hover:shadow-lg ${
                    guide.accent ? "border-accent/40 bg-accent/5" : ""
                  }`}
                >
                  <CardContent className="flex flex-col gap-4 p-8 md:flex-row md:items-center md:gap-8">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <guide.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <Badge
                        variant={guide.accent ? "default" : "secondary"}
                        className={guide.accent ? "bg-accent text-accent-foreground" : ""}
                      >
                        {guide.badge}
                      </Badge>
                      <h3 className="mt-2 font-serif text-xl font-bold md:text-2xl">
                        {guide.title}
                      </h3>
                      <p className="mt-2 text-muted-foreground leading-relaxed">
                        {guide.description}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <Link to={guide.href}>
                        <Button
                          variant={guide.accent ? "default" : "outline"}
                          className={
                            guide.accent
                              ? "bg-accent text-accent-foreground hover:bg-accent/90"
                              : ""
                          }
                        >
                          {guide.cta} <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <h2 className="font-serif text-2xl font-bold md:text-3xl">
              People are already rethinking their futures
            </h2>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="flex h-full flex-col justify-between p-6">
                    <p className="text-sm leading-relaxed text-muted-foreground italic">
                      "{t.quote}"
                    </p>
                    <p className="mt-4 text-xs font-medium text-foreground">
                      — {t.author}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools preview */}
      <section className="border-t bg-surface py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <Badge variant="secondary" className="mb-4">Free Tools</Badge>
                <h2 className="font-serif text-2xl font-bold md:text-3xl">
                  Data-driven decisions for your future
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Explore our open-access directory of 28+ countries scored on
                  post-labor readiness, browse 342 occupations with AI exposure
                  analysis, and track policy changes in real time.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Link to="/directory" className="group flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent">
                    <BookOpen className="h-4 w-4 text-accent" />
                    Country Directory — Readiness scores & policies
                    <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                  <Link to="/rankings" className="group flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent">
                    <TrendingUp className="h-4 w-4 text-accent" />
                    Global Rankings — Compare jurisdictions
                    <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                  <Link to="/policies" className="group flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent">
                    <Shield className="h-4 w-4 text-accent" />
                    Policy Tracker — UBI pilots & safety nets
                    <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="grid w-full grid-cols-2 gap-3">
                  {[
                    { label: "AI Exposure Scores", value: "342 jobs" },
                    { label: "Active UBI Pilots", value: "8 programs" },
                    { label: "Policy Events", value: "60+ tracked" },
                    { label: "Earning Paths", value: "Coming soon" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-lg border bg-card p-4 text-center"
                    >
                      <p className="font-serif text-lg font-bold text-accent">
                        {item.value}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-2xl rounded-2xl bg-primary p-10 text-center text-primary-foreground md:p-16">
            <Sparkles className="mx-auto mb-4 h-10 w-10 text-accent" />
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              The future belongs to those who prepare for it
            </h2>
            <p className="mt-4 text-lg opacity-85 leading-relaxed">
              Join thousands of forward-thinkers getting weekly intelligence on
              AI disruption, global policy shifts, and strategies to thrive in
              the post-labor economy.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/membership">
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8 h-12"
                >
                  Join the Movement <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm opacity-60">
              Free tier available · No credit card required
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
