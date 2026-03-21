import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign, Users, TrendingUp, Eye, FileText, Activity,
  ArrowUpRight, ArrowDownRight, Minus
} from "lucide-react";

const metrics = {
  financial: [
    { label: "Monthly Revenue", value: "$2,450", change: +12.3, icon: DollarSign },
    { label: "Monthly Expenses", value: "$1,820", change: +3.1, icon: DollarSign },
    { label: "Burn Rate", value: "$1,820/mo", change: -2.4, icon: Activity },
    { label: "Runway", value: "14 months", change: 0, icon: TrendingUp },
  ],
  growth: [
    { label: "Total Signups", value: "1,247", change: +18.5, icon: Users },
    { label: "Waitlist", value: "3,891", change: +24.2, icon: Users },
    { label: "Active Users (MAU)", value: "412", change: +9.1, icon: Users },
    { label: "Conversion Rate", value: "4.2%", change: +0.8, icon: TrendingUp },
  ],
  content: [
    { label: "Monthly Page Views", value: "28,400", change: +31.6, icon: Eye },
    { label: "Blog Traffic", value: "8,200", change: +22.4, icon: FileText },
    { label: "SEO Rankings (Top 10)", value: "47", change: +5, icon: TrendingUp },
    { label: "Avg Session Duration", value: "3m 42s", change: +11.2, icon: Activity },
  ],
  ops: [
    { label: "Uptime", value: "99.97%", change: 0, icon: Activity },
    { label: "Feature Velocity", value: "12/mo", change: +20, icon: TrendingUp },
    { label: "Open Issues", value: "8", change: -15, icon: FileText },
    { label: "Support Tickets", value: "3", change: -40, icon: Users },
  ],
};

function ChangeIndicator({ change }: { change: number }) {
  if (change === 0) return <span className="flex items-center text-xs text-muted-foreground"><Minus className="h-3 w-3 mr-0.5" /> No change</span>;
  if (change > 0) return <span className="flex items-center text-xs text-success"><ArrowUpRight className="h-3 w-3 mr-0.5" /> +{change}%</span>;
  return <span className="flex items-center text-xs text-destructive"><ArrowDownRight className="h-3 w-3 mr-0.5" /> {change}%</span>;
}

function MetricSection({ title, items }: { title: string; items: typeof metrics.financial }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((m) => (
          <Card key={m.label}>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <m.icon className="h-3.5 w-3.5" /> {m.label}
              </CardDescription>
              <CardTitle className="text-2xl font-bold">{m.value}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ChangeIndicator change={m.change} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function BusinessHealth() {
  const { isAdmin, loading } = useAuth();

  if (loading) return <div className="flex h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" /></div>;
  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-surface py-8">
      <div className="container space-y-8">
        <div>
          <Badge className="mb-2 bg-accent/20 text-accent-foreground border-accent/30 hover:bg-accent/30">
            Executive Dashboard
          </Badge>
          <h1 className="font-serif text-3xl font-bold md:text-4xl">Business Health</h1>
          <p className="mt-2 text-muted-foreground">Real-time pulse on PaidToBe performance. <span className="text-xs text-muted-foreground/60">(Sample data)</span></p>
        </div>

        <MetricSection title="Financial" items={metrics.financial} />
        <MetricSection title="User Growth" items={metrics.growth} />
        <MetricSection title="Content & SEO" items={metrics.content} />
        <MetricSection title="Operations" items={metrics.ops} />
      </div>
    </div>
  );
}
