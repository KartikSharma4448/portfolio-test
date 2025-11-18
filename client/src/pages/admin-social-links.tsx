import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Pencil, Trash2, ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { insertSocialLinkSchema, type InsertSocialLink, type SocialLink } from "@shared/schema";

export default function AdminSocialLinks() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);

  const { data: socialLinks, isLoading } = useQuery<SocialLink[]>({
    queryKey: ["/api/social-links"],
  });

  const form = useForm<InsertSocialLink>({
    resolver: zodResolver(insertSocialLinkSchema),
    defaultValues: {
      platform: "",
      url: "",
      icon: "Share2",
      handle: "",
      order: "0",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertSocialLink) => {
      return await apiRequest("POST", "/api/social-links", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/social-links"] });
      toast({ title: "Social link created successfully" });
      setDialogOpen(false);
      form.reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: InsertSocialLink }) => {
      return await apiRequest("PATCH", `/api/social-links/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/social-links"] });
      toast({ title: "Social link updated successfully" });
      setDialogOpen(false);
      setEditingLink(null);
      form.reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/social-links/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/social-links"] });
      toast({ title: "Social link deleted successfully" });
    },
  });

  const handleEdit = (link: SocialLink) => {
    setEditingLink(link);
    form.reset({
      platform: link.platform,
      url: link.url,
      icon: link.icon,
      handle: link.handle || "",
      order: link.order,
    });
    setDialogOpen(true);
  };

  const onSubmit = (data: InsertSocialLink) => {
    if (editingLink) {
      updateMutation.mutate({ id: editingLink.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const sortedLinks = socialLinks?.sort(
    (a, b) => parseInt(a.order) - parseInt(b.order)
  );

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="mb-2" data-testid="link-back">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-4xl font-bold">Manage Social Links</h1>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingLink(null); form.reset(); }} data-testid="button-add-social-link">
                <Plus className="h-4 w-4 mr-2" />
                Add Social Link
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingLink ? "Edit Social Link" : "Add New Social Link"}
                </DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="platform"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Platform Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., LinkedIn, GitHub" data-testid="input-platform" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://..." data-testid="input-url" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="handle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Handle/Username (Optional)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="@username" data-testid="input-handle" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon Name</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-icon" />
                        </FormControl>
                        <FormDescription>
                          Use Lucide icon names (e.g., Linkedin, Github, Mail, Twitter)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="order"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Order</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" data-testid="input-order" />
                        </FormControl>
                        <FormDescription>
                          Lower numbers appear first
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={createMutation.isPending || updateMutation.isPending} data-testid="button-submit">
                    {(createMutation.isPending || updateMutation.isPending) ? "Saving..." : "Save Social Link"}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : sortedLinks && sortedLinks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedLinks.map((link) => (
              <Card key={link.id} data-testid={`social-link-card-${link.id}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{link.platform}</h3>
                      {link.handle && (
                        <p className="text-sm text-muted-foreground">{link.handle}</p>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Order: {link.order}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 truncate">
                    {link.url}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(link)}
                      data-testid={`button-edit-${link.id}`}
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteMutation.mutate(link.id)}
                      disabled={deleteMutation.isPending}
                      data-testid={`button-delete-${link.id}`}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No social links yet. Add your first one!</p>
          </div>
        )}
      </div>
    </div>
  );
}
