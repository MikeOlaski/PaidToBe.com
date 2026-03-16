import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Directory from "./pages/Directory";
import CountryDetail from "./pages/CountryDetail";
import JobsDirectory from "./pages/JobsDirectory";
import JobDetail from "./pages/JobDetail";
import Rankings from "./pages/Rankings";
import Membership from "./pages/Membership";
import About from "./pages/About";
import AboutUs from "./pages/AboutUs";
import Auth from "./pages/Auth";
import Policies from "./pages/Policies";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Visualizations from "./pages/Visualizations";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/data" element={<Index />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/country/:id" element={<CountryDetail />} />
          <Route path="/jobs" element={<JobsDirectory />} />
          <Route path="/a/:slug" element={<JobDetail />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/about" element={<About />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/visualizations" element={<Visualizations />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
