import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertAboutContentSchema, type AboutContent, type InsertAboutContent } from "@shared/schema";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";

export default function AdminAbout() {
  const { toast } = useToast();
  const [statsInput, setStatsInput] = useState("");

  const { data: aboutContent, isLoading } = useQuery<AboutContent | null>({
    queryKey: ["/api/about-content"],
    queryFn: async () => {
      const response = await fetch("/api/about-content");
      if (!response.ok) throw new Error("Failed to fetch about content");
      return response.json();
    },
  });

  const form = useForm<InsertAboutContent>({
    resolver: zodResolver(insertAboutContentSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      profileImage: "",
      stats: [],
    },
  });

  useEffect(() => {
    if (aboutContent) {
      form.reset({
        title: aboutContent.title,
        subtitle: aboutContent.subtitle,
        description: aboutContent.description,
        profileImage: aboutContent.profileImage || "",
        stats: aboutContent.stats || [],
      });
      setStatsInput(aboutContent.stats?.join("\n") || "");
    }
  }, [aboutContent, form]);

  const saveMutation = useMutation({
    mutationFn: async (data: InsertAboutContent) => {
      return await apiRequest("POST", "/api/about-content", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/about-content"] });
      toast({ title: "About content updated successfully" });
    },
    onError: () => {
      toast({ 
        title: "Failed to update about content",
        description: "Please try again later.",
        variant: "destructive"
      });
    },
  });

  const onSubmit = (data: InsertAboutContent) => {
    const stats = statsInput
      .split("\n")
      .map(s => s.trim())
      .filter(Boolean);
    
    saveMutation.mutate({
      ...data,
      profileImage: data.profileImage || null,
      stats,
    });
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold" data-testid="text-admin-about-title">Manage About Page</h1>
          <p className="text-muted-foreground">Update your about page content</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>About Content</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    data-testid="input-about-title"
                    {...form.register("title")}
                    placeholder="Enter main title"
                  />
                  {form.formState.errors.title && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    data-testid="input-about-subtitle"
                    {...form.register("subtitle")}
                    placeholder="Enter subtitle"
                  />
                  {form.formState.errors.subtitle && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.subtitle.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    data-testid="input-about-description"
                    {...form.register("description")}
                    placeholder="Write your about description"
                    rows={8}
                  />
                  {form.formState.errors.description && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.description.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="profileImage">Profile Image URL</Label>
                  <Input
                    id="profileImage"
                    data-testid="input-about-profile-image"
                    {...form.register("profileImage")}
                    placeholder="https://example.com/profile.jpg (optional)"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="stats">Stats (one per line)</Label>
                    <p className="text-xs text-muted-foreground">e.g., "5+ Years Experience"</p>
                  </div>
                  <Textarea
                    id="stats"
                    data-testid="input-about-stats"
                    value={statsInput}
                    onChange={(e) => setStatsInput(e.target.value)}
                    placeholder="10+ Projects Completed&#10;5+ Years Experience&#10;20+ Happy Clients"
                    rows={5}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter each stat on a new line
                  </p>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button 
                    type="submit" 
                    data-testid="button-save-about"
                    disabled={saveMutation.isPending}
                  >
                    {saveMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    data-testid="button-reset-about"
                    onClick={() => {
                      if (aboutContent) {
                        form.reset({
                          title: aboutContent.title,
                          subtitle: aboutContent.subtitle,
                          description: aboutContent.description,
                          profileImage: aboutContent.profileImage || "",
                          stats: aboutContent.stats || [],
                        });
                        setStatsInput(aboutContent.stats?.join("\n") || "");
                      }
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
