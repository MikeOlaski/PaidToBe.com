import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/data/blog";
import { useCountries } from "@/hooks/useCountries";
import { policies } from "@/data/policies";

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const { data: countries = [], isLoading } = useCountries();
  const post = blogPosts.find((p) => p.id === id);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent"></div>
      </div>
    );
  }

  const relatedCountries = post.countryIds.map((id) => countries.find((c) => c.id === id)).filter(Boolean);
  const relatedPolicies = post.policyIds.map((id) => policies.find((p) => p.id === id)).filter(Boolean);

  if (!post) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-serif text-2xl font-bold">Article not found</h1>
        <Link to="/blog"><Button variant="link">Back to Blog</Button></Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-3xl">
        <Link to="/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Coverage
        </Link>

        <article>
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Badge className={post.category === "Breaking" ? "bg-destructive text-destructive-foreground" : ""}>{post.category}</Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {post.readTime}
            </span>
          </div>

          <h1 className="font-serif text-3xl font-bold leading-tight md:text-4xl">{post.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
          <p className="mt-2 text-sm text-muted-foreground">By {post.author}</p>

          <div className="mt-8 border-t pt-8">
            <div className="prose prose-sm max-w-none text-foreground">
              {post.content.split("\n\n").map((paragraph, i) => {
                if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                  return <h3 key={i} className="font-serif text-lg font-semibold mt-6 mb-2">{paragraph.replace(/\*\*/g, "")}</h3>;
                }
                if (paragraph.startsWith("**")) {
                  const parts = paragraph.split("**");
                  return (
                    <p key={i} className="mb-4 leading-relaxed text-muted-foreground">
                      {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-foreground">{part}</strong> : part)}
                    </p>
                  );
                }
                if (paragraph.startsWith("- ")) {
                  const items = paragraph.split("\n").filter((l) => l.startsWith("- "));
                  return (
                    <ul key={i} className="mb-4 space-y-1 ml-4">
                      {items.map((item, j) => (
                        <li key={j} className="text-muted-foreground list-disc">{item.slice(2)}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={i} className="mb-4 leading-relaxed text-muted-foreground">{paragraph}</p>;
              })}
            </div>
          </div>

          {/* Tags & related */}
          <div className="mt-8 border-t pt-6 space-y-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>

            {relatedCountries.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Related countries:</p>
                <div className="flex flex-wrap gap-2">
                  {relatedCountries.map((c) => (
                    <Link key={c!.id} to={`/country/${c!.id}`}>
                      <Badge variant="outline" className="hover:bg-accent/10 cursor-pointer">{c!.flag} {c!.name}</Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {relatedPolicies.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Related policies:</p>
                <div className="flex flex-wrap gap-2">
                  {relatedPolicies.map((p) => (
                    <Link key={p!.id} to="/policies">
                      <Badge variant="outline" className="hover:bg-accent/10 cursor-pointer">{p!.shortName}: {p!.name}</Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
