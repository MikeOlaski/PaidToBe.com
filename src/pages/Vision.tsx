import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  DollarSign,
  ImagePlus,
  Mic,
  Play,
  Send,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Video,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { visions } from "@/data/visions";

export default function Vision() {
  const { user } = useAuth();
  const [visionPrompt, setVisionPrompt] = useState("");

  return (
    <div className="min-h-screen bg-slate-950 py-10 text-slate-50">
      <div className="container px-4">
        <section className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
            <Sparkles className="h-4 w-4" />
            Vision Studio
          </div>
          <h1 className="font-serif text-5xl font-bold italic tracking-tight md:text-7xl">
            Build Your <span className="text-sky-400">Vision</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-400">
            A futuristic YouTube for positive futures. Watch narrative prototypes, then define your own vision with multimodal input and structured intent capture.
          </p>
        </section>

        <section className="relative mb-20 overflow-hidden rounded-[2rem] border border-slate-800/70 bg-gradient-to-br from-[#04081a] via-[#060d26] to-[#020617] p-6 shadow-[0_40px_120px_rgba(2,6,23,0.85)] md:p-12">
          <div className="pointer-events-none absolute -right-32 -top-40 h-[420px] w-[420px] rounded-full border border-sky-500/20 bg-sky-400/5 blur-[1px]" />
          <div className="pointer-events-none absolute right-8 top-10 h-[300px] w-[300px] rounded-full border border-sky-500/10" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(56,189,248,0.16),transparent_45%)]" />

          <div className="relative">
            <div className="mb-6 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.22em] text-sky-400">
              <span className="text-2xl leading-none">+</span>
              Predictive Integration
            </div>
            <h2 className="mb-6 max-w-3xl font-serif text-4xl font-bold md:text-6xl">Vision Intake Terminal</h2>
            <p className="mb-10 max-w-5xl text-2xl leading-relaxed text-slate-400 md:text-[2.1rem]">
              Capture your Vision of the Future with text, voice notes, image references, and video cues. Every submission becomes a structured world-model for future project formation.
            </p>

            <div className="rounded-3xl border border-slate-700/70 bg-slate-900/45 p-5 backdrop-blur-sm md:p-7">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Access Gate</div>
                  <div className="mt-1 flex items-end gap-2">
                    <span className="text-4xl font-bold text-slate-100">{user ? "Open" : "Locked"}</span>
                    <span className={`pb-1 text-base font-semibold ${user ? "text-green-400" : "text-amber-400"}`}>
                      {user ? "identity verified" : "registration required"}
                    </span>
                  </div>
                </div>
                {user ? (
                  <Badge className="border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-300">Authenticated</Badge>
                ) : (
                  <Link to="/auth">
                    <Button className="h-12 rounded-2xl bg-sky-500 px-6 text-base font-bold text-slate-950 hover:bg-sky-400">Register to Start</Button>
                  </Link>
                )}
              </div>

              <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
                <Textarea
                  value={visionPrompt}
                  onChange={(event) => setVisionPrompt(event.target.value)}
                  placeholder="Describe your Vision of the Future. Include social impact, economic model, and timeline milestones..."
                  className="min-h-[190px] resize-none rounded-2xl border-slate-700/80 bg-slate-950/75 p-5 text-base leading-relaxed text-slate-100 placeholder:text-slate-500"
                  disabled={!user}
                />
                <div className="grid grid-cols-3 gap-2 lg:grid-cols-1 lg:gap-3">
                  <Button variant="outline" className="h-12 border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800" disabled={!user}>
                    <Mic className="mr-2 h-4 w-4" /> Voice
                  </Button>
                  <Button variant="outline" className="h-12 border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800" disabled={!user}>
                    <ImagePlus className="mr-2 h-4 w-4" /> Image
                  </Button>
                  <Button variant="outline" className="h-12 border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800" disabled={!user}>
                    <Video className="mr-2 h-4 w-4" /> Video
                  </Button>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/90 pt-5">
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-slate-500">powered by multimodal horizon protocol</p>
                {user ? (
                  <Button className="h-12 rounded-2xl bg-sky-500 px-6 text-base font-bold text-slate-950 hover:bg-sky-400" disabled={!visionPrompt.trim()}>
                    <Send className="mr-2 h-4 w-4" /> Submit Vision
                  </Button>
                ) : (
                  <Link to="/auth">
                    <Button className="h-12 rounded-2xl bg-sky-500 px-6 text-base font-bold text-slate-950 hover:bg-sky-400">
                      Register to Submit <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-12 flex items-center gap-3 font-serif text-3xl font-bold">
            <span className="h-8 w-2 rounded-full bg-sky-500" /> Positivity Narratives
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {visions.map((vision) => (
              <Card key={vision.id} className="group overflow-hidden border-slate-800 bg-slate-900 transition-all hover:border-sky-500/30">
                <div className="relative aspect-video overflow-hidden bg-slate-950">
                  {vision.videoUrl ? (
                    <iframe
                      src={vision.videoUrl}
                      className="h-full w-full opacity-60 transition-opacity group-hover:opacity-100"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={vision.title}
                    ></iframe>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-800">
                      <Play className="h-12 w-12 opacity-20" />
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4">
                    <Badge className="border-slate-800 bg-slate-950/80 text-sky-400 backdrop-blur-md">{vision.category}</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="font-serif text-2xl italic transition-colors group-hover:text-sky-400">{vision.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="border-l-2 border-slate-800 py-1 pl-4 text-sm italic leading-relaxed text-slate-400">{vision.story}</p>
                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                      <span className="text-slate-500">Market Probability</span>
                      <span className={vision.probability > 50 ? "text-sky-400" : "text-amber-500"}>{vision.probability}%</span>
                    </div>
                    <Progress value={vision.probability} className="h-1 bg-slate-800 [&>div]:bg-sky-500" />
                  </div>
                  <div className="flex items-center justify-between border-y border-slate-800/50 py-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-slate-500" />
                      <span className="text-sm font-bold text-slate-300">{vision.marketVolume}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {vision.trend === "rising" && <TrendingUp className="h-4 w-4 text-green-500" />}
                      {vision.trend === "falling" && <TrendingDown className="h-4 w-4 text-amber-500" />}
                      {vision.trend === "stable" && <TrendingDown className="h-4 w-4 text-amber-500" />}
                      <span className="text-[10px] font-bold uppercase text-slate-500">{vision.trend}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pb-6">
                  <Link to="/projects" className="w-full">
                    <Button className="w-full rounded-xl bg-slate-800 text-slate-50 hover:bg-slate-700">View Full Story</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
