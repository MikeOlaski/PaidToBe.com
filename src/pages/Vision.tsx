import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, TrendingUp, TrendingDown, Target, Info, Sparkles, Plus, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { visions, projectionTheory, type VisionPost } from "@/data/visions";

export default function Vision() {
  const [selectedVision, setSelectedVision] = useState<VisionPost | null>(null);

  return (
    <div className="min-h-screen py-10 bg-slate-950 text-slate-50">
      <div className="container px-4">
        {/* Hero Section */}
        <div className="mb-20 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="flex justify-center gap-2 text-sky-400 mb-4 items-center">
            <Sparkles className="h-5 w-5 animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-widest">Future Projections</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-8 italic tracking-tight">
            The <span className="text-sky-400">Vision</span> Horizon
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
            Paint the picture of a positive potential. We innovate on setting the predictive market through 
            <span className="text-slate-100 font-semibold px-2">Visions Projection Theory</span> 
            — where intention meets action.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button size="lg" className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-full px-8">
              Contribute a Vision
            </Button>
            <Button variant="ghost" size="lg" className="rounded-full px-8 border border-slate-700 hover:bg-slate-800 text-slate-300">
              Explore Markets
            </Button>
          </div>
        </div>

        {/* Projection Theory Card */}
        <div className="mb-24 rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-900 border border-slate-800 p-8 md:p-12 relative">
          <div className="absolute top-4 right-8 opacity-5">
            <Target className="h-64 w-64" />
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 italic underline decoration-sky-500/30">
                {projectionTheory.title}
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                {projectionTheory.description}
              </p>
              <div className="space-y-4">
                {projectionTheory.principles.map((principle, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <div className="w-8 h-8 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-400 font-bold text-xs ring-1 ring-sky-500/20">
                      0{idx + 1}
                    </div>
                    <div className="text-slate-200 font-medium">{principle}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-950/50 rounded-2xl p-6 border border-slate-800/50 backdrop-blur-sm shadow-2xl">
              <div className="text-xs font-bold text-sky-500 uppercase tracking-widest mb-4 flex items-center gap-1">
                <Plus className="h-3 w-3" /> Predictive Integration
              </div>
              <h3 className="text-xl font-bold mb-4">Polymarket Sync</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                Connect your decentralised wallet to participate in the 'desirability markets'. Each vote is a bet on the probability of a vision becoming reality.
              </p>
              <div className="p-4 rounded-xl bg-slate-900 ring-1 ring-slate-800 flex justify-between items-center mb-6">
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Market Sentiment</div>
                  <div className="text-xl font-bold text-slate-100 flex items-center gap-1">
                    92% <span className="text-[10px] text-green-500">+4.2%</span>
                  </div>
                </div>
                <Button size="sm" className="bg-sky-500 hover:bg-sky-400 text-slate-950 h-8 font-bold text-xs">
                  Trade Market
                </Button>
              </div>
              <p className="text-[10px] text-center text-slate-600 font-mono italic">
                powered by Polymarket v3 Protocol
              </p>
            </div>
          </div>
        </div>

        {/* Vision Posts Grid */}
        <div>
          <h2 className="text-3xl font-serif font-bold mb-12 flex items-center gap-3">
            <span className="w-2 h-8 bg-sky-500 rounded-full" /> Positivity Narratives
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visions.map((vision) => (
              <Card key={vision.id} className="bg-slate-900 border-slate-800 hover:border-sky-500/30 transition-all group overflow-hidden">
                <div className="aspect-video relative overflow-hidden bg-slate-950">
                  {vision.videoUrl ? (
                    <iframe
                      src={vision.videoUrl}
                      className="w-full h-full opacity-60 group-hover:opacity-100 transition-opacity"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-800">
                      <Play className="h-12 w-12 opacity-20" />
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-slate-950/80 backdrop-blur-md border-slate-800 text-sky-400">
                      {vision.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="font-serif italic text-2xl group-hover:text-sky-400 transition-colors">
                    {vision.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-slate-400 text-sm leading-relaxed italic border-l-2 border-slate-800 pl-4 py-1">
                    {vision.story}
                  </p>
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider mb-2">
                       <span className="text-slate-500">Market Probability</span>
                       <span className={vision.probability > 50 ? "text-sky-400" : "text-amber-500"}>{vision.probability}%</span>
                    </div>
                    <Progress value={vision.probability} className="h-1 bg-slate-800 [&>div]:bg-sky-500" />
                  </div>
                  <div className="flex justify-between items-center py-4 border-y border-slate-800/50">
                     <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-slate-500" />
                        <span className="text-sm font-bold text-slate-300">{vision.marketVolume}</span>
                     </div>
                     <div className="flex items-center gap-1">
                        {vision.trend === "rising" ? (
                           <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                           <TrendingDown className="h-4 w-4 text-amber-500" />
                        )}
                        <span className="text-[10px] uppercase font-bold text-slate-500">{vision.trend}</span>
                     </div>
                  </div>
                </CardContent>
                <CardFooter className="pb-6">
                  <Button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-50 rounded-xl" onClick={() => setSelectedVision(vision)}>
                    View Full Story
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-32 max-w-4xl mx-auto rounded-3xl bg-slate-900 border border-slate-800 p-8 md:p-12 text-center group">
          <h3 className="text-3xl font-serif font-bold italic mb-6 group-hover:text-sky-400 transition-colors">Your Vision Matters.</h3>
          <p className="text-slate-500 mb-10 max-w-xl mx-auto">
            Our predictive markets are fueled by the visions of those who believe. What does your future look like?
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
             <Button className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-full px-12 h-14 text-lg">
                Submit Vision
             </Button>
             <Link to="/membership">
               <Button variant="ghost" className="border border-slate-700 hover:bg-slate-800 rounded-full px-12 h-14 text-lg text-slate-300">
                  Join Consensus
               </Button>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
