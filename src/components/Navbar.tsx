import { Link, useLocation } from "react-router-dom";
import { Globe, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const navItems = [
  { label: "Jobs Directory", path: "/jobs" },
  { label: "Policies", path: "/policies" },
  { label: "Blog", path: "/blog" },
  { label: "About Us", path: "/about-us" },
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-sm font-medium gap-1">
                Country Directory <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild>
                <Link to="/directory" className="w-full cursor-pointer">Directory Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/rankings" className="w-full cursor-pointer">Rankings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/visualizations" className="w-full cursor-pointer">Visualizations</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
            <div className="flex flex-col gap-1 px-4 py-2 border-l-2 ml-2">
              <div className="text-sm font-semibold mb-1 text-muted-foreground">Country Directory</div>
              <Link to="/directory" onClick={() => setMobileOpen(false)}>
                <Button variant={location.pathname === "/directory" ? "secondary" : "ghost"} className="w-full justify-start text-sm">Directory Home</Button>
              </Link>
              <Link to="/rankings" onClick={() => setMobileOpen(false)}>
                <Button variant={location.pathname === "/rankings" ? "secondary" : "ghost"} className="w-full justify-start text-sm">Rankings</Button>
              </Link>
              <Link to="/visualizations" onClick={() => setMobileOpen(false)}>
                <Button variant={location.pathname === "/visualizations" ? "secondary" : "ghost"} className="w-full justify-start text-sm">Visualizations</Button>
              </Link>
            </div>
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
