import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Pencil, Trash2, ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { insertCertificateSchema, type InsertCertificate, type Certificate } from "@shared/schema";

export default function AdminCertificates() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [skillInput, setSkillInput] = useState("");

  const { data: certificates, isLoading } = useQuery<Certificate[]>({
    queryKey: ["/api/certificates"],
  });

  const form = useForm<InsertCertificate>({
    resolver: zodResolver(insertCertificateSchema),
    defaultValues: {
      title: "",
      issuer: "",
      issueDate: "",
      credentialId: "",
      credentialUrl: "",
      skills: [],
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertCertificate) => {
      return await apiRequest("POST", "/api/certificates", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/certificates"] });
      toast({ title: "Certificate created successfully" });
      setDialogOpen(false);
      form.reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: InsertCertificate }) => {
      return await apiRequest("PATCH", `/api/certificates/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/certificates"] });
      toast({ title: "Certificate updated successfully" });
      setDialogOpen(false);
      setEditingCert(null);
      form.reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/certificates/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/certificates"] });
      toast({ title: "Certificate deleted successfully" });
    },
  });

  const handleEdit = (cert: Certificate) => {
    setEditingCert(cert);
    form.reset({
      title: cert.title,
      issuer: cert.issuer,
      issueDate: cert.issueDate,
      credentialId: cert.credentialId || "",
      credentialUrl: cert.credentialUrl || "",
      skills: cert.skills,
    });
    setDialogOpen(true);
  };

  const onSubmit = (data: InsertCertificate) => {
    if (editingCert) {
      updateMutation.mutate({ id: editingCert.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      const currentSkills = form.getValues("skills") || [];
      form.setValue("skills", [...currentSkills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (index: number) => {
    const currentSkills = form.getValues("skills") || [];
    form.setValue(
      "skills",
      currentSkills.filter((_, i) => i !== index)
    );
  };

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
            <h1 className="text-4xl font-bold">Manage Certificates</h1>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingCert(null); form.reset(); }} data-testid="button-add-certificate">
                <Plus className="h-4 w-4 mr-2" />
                Add Certificate
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingCert ? "Edit Certificate" : "Add New Certificate"}
                </DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-title" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="issuer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Issuer</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., Microsoft, Google" data-testid="input-issuer" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="issueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Issue Date</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., Oct 2025" data-testid="input-issue-date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="credentialId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Credential ID (Optional)</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-credential-id" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="credentialUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Credential URL (Optional)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://..." data-testid="input-credential-url" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Related Skills</FormLabel>
                        <div className="flex gap-2">
                          <Input
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            placeholder="Add skill"
                            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                            data-testid="input-skill"
                          />
                          <Button type="button" onClick={addSkill} data-testid="button-add-skill">
                            Add
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {field.value?.map((skill, index) => (
                            <Badge key={index} variant="secondary">
                              {skill}
                              <button
                                type="button"
                                onClick={() => removeSkill(index)}
                                className="ml-2"
                                data-testid={`button-remove-skill-${index}`}
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={createMutation.isPending || updateMutation.isPending} data-testid="button-submit">
                    {(createMutation.isPending || updateMutation.isPending) ? "Saving..." : "Save Certificate"}
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
        ) : certificates && certificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <Card key={cert.id} data-testid={`certificate-card-${cert.id}`}>
                <CardHeader>
                  <CardTitle className="text-lg">{cert.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">{cert.issuer}</p>
                    <p className="text-xs text-muted-foreground">{cert.issueDate}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.slice(0, 3).map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(cert)}
                      data-testid={`button-edit-${cert.id}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteMutation.mutate(cert.id)}
                      disabled={deleteMutation.isPending}
                      data-testid={`button-delete-${cert.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No certificates yet. Add your first one!</p>
          </div>
        )}
      </div>
    </div>
  );
}
