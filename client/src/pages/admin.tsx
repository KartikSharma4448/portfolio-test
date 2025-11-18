import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  FolderOpen, 
  Award, 
  Code, 
  Briefcase,
  Share2,
  MessageSquare,
  BookOpen,
  LogOut
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import type { Project, Certificate, Skill, Service, SocialLink, BlogPost } from "@shared/schema";

export default function Admin() {
  const [location] = useLocation();
  const { logoutMutation } = useAuth();

  const { data: projects } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: certificates } = useQuery<Certificate[]>({
    queryKey: ["/api/certificates"],
  });

  const { data: skills } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });

  const { data: services } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const { data: socialLinks } = useQuery<SocialLink[]>({
    queryKey: ["/api/social-links"],
  });

  const { data: blogPosts } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  const stats = [
    {
      title: "Projects",
      count: projects?.length || 0,
      icon: FolderOpen,
      color: "text-primary",
      link: "/admin/projects",
    },
    {
      title: "Certificates",
      count: certificates?.length || 0,
      icon: Award,
      color: "text-chart-2",
      link: "/admin/certificates",
    },
    {
      title: "Skills",
      count: skills?.length || 0,
      icon: Code,
      color: "text-chart-3",
      link: "/admin/skills",
    },
    {
      title: "Services",
      count: services?.length || 0,
      icon: Briefcase,
      color: "text-chart-4",
      link: "/admin/services",
    },
    {
      title: "Social Links",
      count: socialLinks?.length || 0,
      icon: Share2,
      color: "text-chart-1",
      link: "/admin/social-links",
    },
    {
      title: "Blog Posts",
      count: blogPosts?.length || 0,
      icon: BookOpen,
      color: "text-chart-5",
      link: "/admin/blog",
    },
  ];

  const quickActions = [
    { label: "Add Project", href: "/admin/projects", icon: FolderOpen },
    { label: "Add Certificate", href: "/admin/certificates", icon: Award },
    { label: "Add Skill", href: "/admin/skills", icon: Code },
    { label: "Add Service", href: "/admin/services", icon: Briefcase },
    { label: "Add Social Link", href: "/admin/social-links", icon: Share2 },
    { label: "Add Blog Post", href: "/admin/blog", icon: BookOpen },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            </div>
            <Button
              variant="outline"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
              data-testid="button-logout"
            >
              <LogOut className="h-4 w-4 mr-2" />
              {logoutMutation.isPending ? "Logging out..." : "Logout"}
            </Button>
          </div>
          <p className="text-muted-foreground text-lg">
            Manage your portfolio content
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link key={stat.title} href={stat.link}>
                <Card className="hover-elevate transition-transform hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Icon className={`h-8 w-8 ${stat.color}`} />
                      <Badge variant="secondary" className="text-xl font-bold">
                        {stat.count}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg">{stat.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link key={action.label} href={action.href}>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 h-auto py-4 hover-elevate"
                      data-testid={`button-${action.label.toLowerCase().replace(" ", "-")}`}
                    >
                      <Icon className="h-5 w-5" />
                      {action.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Navigation to Management Pages */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover-elevate transition-transform hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5 text-primary" />
                Content Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin/projects">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  data-testid="link-manage-projects"
                >
                  Manage Projects
                </Button>
              </Link>
              <Link href="/admin/certificates">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  data-testid="link-manage-certificates"
                >
                  Manage Certificates
                </Button>
              </Link>
              <Link href="/admin/skills">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  data-testid="link-manage-skills"
                >
                  Manage Skills
                </Button>
              </Link>
              <Link href="/admin/blog">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  data-testid="link-manage-blog"
                >
                  Manage Blog
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover-elevate transition-transform hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-chart-2" />
                Other Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin/services">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  data-testid="link-manage-services"
                >
                  Manage Services
                </Button>
              </Link>
              <Link href="/admin/social-links">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  data-testid="link-manage-social"
                >
                  Manage Social Links
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  data-testid="link-view-site"
                >
                  View Public Site
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
