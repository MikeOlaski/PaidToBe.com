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
import { useAuth } from "@/hooks/useAuth";
import { LogOut, Settings, User as UserIcon } from "lucide-react";

const navItems = [
  { label: "Vision", path: "/vision" },
  { label: "Jobs", path: "/jobs" },
  { label: "Companies", path: "/companies" },
  { label: "Policies", path: "/policies" },
  { label: "Blog", path: "/blog" },
  { label: "About Us", path: "/about-us" },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, profile, isAdmin, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-serif text-xl font-bold text-foreground">
          <Globe className="h-6 w-6 text-accent" />
          <span>Paid<span className="text-accent">ToBe</span></span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          <Link to="/vision">
            <Button variant={location.pathname === "/vision" ? "secondary" : "ghost"} size="sm" className="text-sm font-medium">
              Vision
            </Button>
          </Link>
          <Link to="/jobs">
            <Button variant={location.pathname === "/jobs" ? "secondary" : "ghost"} size="sm" className="text-sm font-medium">
              Jobs
            </Button>
          </Link>
          <Link to="/companies">
            <Button variant={location.pathname === "/companies" ? "secondary" : "ghost"} size="sm" className="text-sm font-medium">
              Companies
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={location.pathname.startsWith("/directory") || location.pathname === "/rankings" || location.pathname === "/visualizations" ? "secondary" : "ghost"} size="sm" className="text-sm font-medium gap-1 tracking-tight">
                Countries <ChevronDown className="h-4 w-4" />
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
          {navItems.filter(item => !["Vision", "Jobs", "Companies"].includes(item.label)).map((item) => (
            <Link key={item.path} to={item.path}>
              <Button variant={location.pathname === item.path ? "secondary" : "ghost"} size="sm" className="text-sm font-medium">
                {item.label}
              </Button>
            </Link>
          ))}
          {isAdmin && (
            <Link to="/admin">
              <Button variant={location.pathname === "/admin" ? "secondary" : "ghost"} size="sm" className="text-sm font-medium gap-1 text-accent">
                <Settings className="h-4 w-4" /> Admin
              </Button>
            </Link>
          )}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="ml-2 gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-[10px] font-bold text-accent">
                    {profile?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="text-xs font-medium text-muted-foreground px-2 py-1.5 uppercase tracking-wider">
                  {profile?.full_name || user.email}
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/membership" className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4" /> Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()} className="text-destructive flex items-center gap-2">
                  <LogOut className="h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth">
              <Button size="sm" className="ml-2 bg-accent text-accent-foreground hover:bg-accent/90">Sign In</Button>
            </Link>
          )}
        </nav>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      {mobileOpen && (
        <div className="border-t bg-background p-4 lg:hidden">
          <nav className="flex flex-col gap-2">
            {navItems.filter(item => ["Vision", "Jobs", "Companies"].includes(item.label)).map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}>
                <Button variant={location.pathname === item.path ? "secondary" : "ghost"} className="w-full justify-start font-semibold">{item.label}</Button>
              </Link>
            ))}
            <div className="flex flex-col gap-1 px-4 py-2 border-l-2 ml-2">
              <div className="text-[10px] font-bold mb-1 text-muted-foreground uppercase tracking-widest text-accent">Countries</div>
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
            {navItems.filter(item => !["Vision", "Jobs", "Companies"].includes(item.label)).map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}>
                <Button variant={location.pathname === item.path ? "secondary" : "ghost"} className="w-full justify-start">{item.label}</Button>
              </Link>
            ))}
            {isAdmin && (
              <Link to="/admin" onClick={() => setMobileOpen(false)}>
                <Button variant={location.pathname === "/admin" ? "secondary" : "ghost"} className="w-full justify-start text-accent">Admin Dashboard</Button>
              </Link>
            )}
            {user ? (
              <Button variant="ghost" className="w-full justify-start text-destructive" onClick={() => { signOut(); setMobileOpen(false); }}>
                Logout
              </Button>
            ) : (
              <Link to="/auth" onClick={() => setMobileOpen(false)}>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Sign In</Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
