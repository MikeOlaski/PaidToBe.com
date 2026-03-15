import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { blogPosts, blogCategories, type BlogCategory } from "@/data/blog";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | "all">("all");

  const filtered = useMemo(() => {
    let list = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    if (selectedCategory !== "all") list = list.filter((p) => p.category === selectedCategory);
    return list;
  }, [selectedCategory]);

  const featured = blogPosts.filter((p) => p.featured).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const showFeatured = selectedCategory === "all";

  return (
    <div className="min-h-screen py-10">
      <div className="container">
        <div className="mb-8">
          <Badge className="mb-3">Intelligence</Badge>
          <h1 className="font-serif text-3xl font-bold md:text-4xl">Policy Coverage & Analysis</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Deep analysis, breaking news, and research on the policies shaping the post-labor economy. Premium members get AI-aggregated news and early alerts.
          </p>
        </div>

        {/* Category filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Button variant={selectedCategory === "all" ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory("all")}>All</Button>
          {blogCategories.map((cat) => (
            <Button key={cat} variant={selectedCategory === cat ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory(cat)}>
              {cat}
            </Button>
          ))}
        </div>

        {/* Featured */}
        {showFeatured && featured.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-4 font-serif text-xl font-semibold">Featured</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {featured.slice(0, 3).map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`}>
                  <Card className="group h-full transition-all hover:shadow-lg hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={post.category === "Breaking" ? "bg-destructive text-destructive-foreground" : ""}>{post.category}</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {post.readTime}
                        </span>
                      </div>
                      <CardTitle className="font-serif text-lg group-hover:text-primary transition-colors leading-tight">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All posts */}
        <div className="space-y-4">
          {!showFeatured && <h2 className="mb-4 font-serif text-xl font-semibold">{selectedCategory}</h2>}
          {showFeatured && <h2 className="mb-4 font-serif text-xl font-semibold">All Coverage</h2>}

          {filtered.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`}>
              <Card className="group transition-all hover:shadow-md">
                <CardContent className="flex items-start gap-4 py-5">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Badge variant="outline" className="text-xs">{post.category}</Badge>
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs font-normal">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  <ArrowRight className="mt-2 h-5 w-5 flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            <p>No articles in this category yet.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 rounded-xl bg-primary p-8 text-center text-primary-foreground">
          <h3 className="font-serif text-2xl font-bold">Get AI-powered intelligence</h3>
          <p className="mt-2 opacity-80">Premium members receive AI-aggregated news, early policy alerts, and prediction market shifts.</p>
          <Link to="/membership">
            <Button className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
              Become a Member <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
