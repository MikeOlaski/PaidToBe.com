import { Link, useLocation } from "react-router-dom";
import { Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { label: "Jobs Directory", path: "/jobs" },
  { label: "Country Directory", path: "/directory" },
  { label: "Policies", path: "/policies" },
  { label: "Rankings", path: "/rankings" },
  { label: "Visualizations", path: "/visualizations" },
  { label: "Blog", path: "/blog" },
  { label: "Methodology", path: "/about" },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-serif text-xl font-bold text-foreground">
          <Globe className="h-6 w-6 text-accent" />
          <span>Paid<span className="text-accent">ToBe</span></span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button variant={location.pathname === item.path ? "secondary" : "ghost"} size="sm" className="text-sm font-medium">
                {item.label}
              </Button>
            </Link>
          ))}
          <Link to="/membership">
            <Button size="sm" className="ml-2 bg-accent text-accent-foreground hover:bg-accent/90">Join Now</Button>
          </Link>
        </nav>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      {mobileOpen && (
        <div className="border-t bg-background p-4 lg:hidden">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}>
                <Button variant={location.pathname === item.path ? "secondary" : "ghost"} className="w-full justify-start">{item.label}</Button>
              </Link>
            ))}
            <Link to="/membership" onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Join Now</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
