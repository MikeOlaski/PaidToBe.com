import { Globe } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t bg-surface py-12">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 font-serif text-lg font-bold">
              <Globe className="h-5 w-5 text-accent" />
              Paid<span className="text-accent">ToBe</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
            Tracking the world's readiness for a post-labor economy. Know where to thrive.
            </p>
          </div>
          <div>
            <h4 className="mb-3 font-serif font-semibold">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/directory" className="hover:text-foreground">Country Directory</Link></li>
              <li><Link to="/policies" className="hover:text-foreground">Policies</Link></li>
              <li><Link to="/rankings" className="hover:text-foreground">Rankings</Link></li>
              <li><Link to="/visualizations" className="hover:text-foreground">Visualizations</Link></li>
              <li><Link to="/about" className="hover:text-foreground">Methodology</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-serif font-semibold">Intelligence</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/blog" className="hover:text-foreground">Blog & Coverage</Link></li>
              <li><Link to="/membership" className="hover:text-foreground">Membership</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-serif font-semibold">Community</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="opacity-50">Petition Hub (coming soon)</span></li>
              <li><span className="opacity-50">Forum (coming soon)</span></li>
              <li><span className="opacity-50">Newsletter</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} PaidToBe.com. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
