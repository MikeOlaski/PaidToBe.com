import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useCountries } from "@/hooks/useCountries";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { LayoutDashboard, Plus, Search, Settings, Users, Globe, ExternalLink, Edit, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Admin() {
  const { isAdmin, loading: authLoading } = useAuth();
  const { data: countries = [], isLoading: countriesLoading } = useCountries();
  const [search, setSearch] = useState("");

  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  if (authLoading) return <div className="flex h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent"></div></div>;
  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-surface py-8">
      <div className="container">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Badge className="mb-2 bg-accent/20 text-accent-foreground border-accent/30 hover:bg-accent/30">
              Admin Control Panel
            </Badge>
            <h1 className="font-serif text-3xl font-bold md:text-4xl">System Administration</h1>
            <p className="mt-2 text-muted-foreground">Manage the global jurisdiction data and system policies.</p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
              <Plus className="h-4 w-4" /> Add Country
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Globe className="h-3.5 w-3.5" /> Total Jurisdictions
              </CardDescription>
              <CardTitle className="text-3xl font-bold">{countries.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Users className="h-3.5 w-3.5" /> Active UBI Pilots
              </CardDescription>
              <CardTitle className="text-3xl font-bold">
                {countries.filter(c => c.ubiStatus === "Active Pilot").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <LayoutDashboard className="h-3.5 w-3.5" /> Regions
              </CardDescription>
              <CardTitle className="text-3xl font-bold">
                {new Set(countries.map(c => c.region)).size}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Settings className="h-3.5 w-3.5" /> Policy Count
              </CardDescription>
              <CardTitle className="text-3xl font-bold">6</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Tabs defaultValue="countries" className="space-y-4">
          <TabsList className="bg-background border">
            <TabsTrigger value="countries">Countries</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="settings">Global Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="countries" className="space-y-4">
            <Card>
              <CardHeader className="pb-3 border-b">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle>Manage Jurisdictions</CardTitle>
                    <CardDescription>Edit readiness scores, policies, and visa details.</CardDescription>
                  </div>
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search countries..."
                      className="pl-8 bg-surface"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Namespace</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-center">Score</TableHead>
                      <TableHead className="text-center">CTI</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {countriesLoading ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                          <TableCell colSpan={5} className="h-12 animate-pulse bg-muted/20" />
                        </TableRow>
                      ))
                    ) : (
                      filteredCountries.map((c) => (
                        <TableRow key={c.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <span>{c.flag}</span>
                              <div className="flex flex-col">
                                <span className="font-semibold">{c.name}</span>
                                <span className="text-[10px] text-muted-foreground font-mono uppercase">{c.id}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={c.ubiStatus === "Active Pilot" ? "default" : c.ubiStatus === "Proposed" ? "secondary" : "outline"} className="text-[10px]">
                              {c.ubiStatus}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center font-mono">{c.readinessScore.toFixed(1)}</TableCell>
                          <TableCell className="text-center font-mono">{c.costOfThrivingIndex.toFixed(1)}%</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-3.5 w-3.5" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                                <a href={`/country/${c.id}`} target="_blank" rel="noreferrer">
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage registered users and their roles.</CardDescription>
              </CardHeader>
              <CardContent className="h-40 flex items-center justify-center text-muted-foreground border-t border-dashed m-6 rounded-lg">
                User management module coming soon in Step 2 of Admin rollout.
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
