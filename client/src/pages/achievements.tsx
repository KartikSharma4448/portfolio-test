import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Award,
  ExternalLink,
  BookOpen,
  Code,
  Brain,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Certificate, Skill } from "@shared/schema";

export default function Achievements() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: certificates, isLoading: certificatesLoading } = useQuery<
    Certificate[]
  >({
    queryKey: ["/api/certificates"],
  });

  const { data: skills, isLoading: skillsLoading } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });

  const categories = [
    "all",
    "Microsoft",
    "Google",
    "Cloud",
    "Data Analytics",
    "Other",
  ];

  const filteredCertificates =
    selectedCategory === "all"
      ? certificates
      : certificates?.filter((cert) =>
          cert.issuer.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  const groupedSkills = skills?.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Achievements & Skills
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Showcasing my certifications, skills, and continuous learning
            journey
          </p>
        </div>

        <Tabs defaultValue="certificates" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="certificates" data-testid="tab-certificates">
              <Award className="h-4 w-4 mr-2" />
              Certifications
            </TabsTrigger>
            <TabsTrigger value="skills" data-testid="tab-skills">
              <Code className="h-4 w-4 mr-2" />
              Skills
            </TabsTrigger>
          </TabsList>

          <TabsContent value="certificates">
            {/* Certificate Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardContent className="p-6 text-center">
                  <Award className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold text-primary mb-1">
                    {certificates?.length || 0}+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Certifications
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-3 text-chart-2" />
                  <div className="text-3xl font-bold text-chart-2 mb-1">
                    {new Set(certificates?.map((c) => c.issuer)).size || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Platforms
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Brain className="h-8 w-8 mx-auto mb-3 text-chart-3" />
                  <div className="text-3xl font-bold text-chart-3 mb-1">
                    {skills?.length || 0}+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Skills Mastered
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  data-testid={`filter-${category.toLowerCase()}`}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Certificates Grid */}
            {certificatesLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredCertificates && filteredCertificates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCertificates.map((cert) => (
                  <Card
                    key={cert.id}
                    className="hover-elevate transition-transform hover:-translate-y-1"
                    data-testid={`certificate-${cert.id}`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <Award className="h-6 w-6 text-primary flex-shrink-0" />
                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid={`link-credential-${cert.id}`}
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover-elevate active-elevate-2"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </a>
                        )}
                      </div>
                      <CardTitle className="text-lg leading-tight">
                        {cert.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-3">{cert.issuer}</p>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="text-xs">
                          {cert.issueDate}
                        </Badge>
                        {cert.credentialId && (
                          <span className="text-xs text-muted-foreground font-mono">
                            ID: {cert.credentialId.substring(0, 8)}...
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.slice(0, 3).map((skill, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Award className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground">
                  No certifications found in this category.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="skills">
            {skillsLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : groupedSkills && Object.keys(groupedSkills).length > 0 ? (
              <div className="space-y-12">
                {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                  <div key={category}>
                    <h2 className="text-2xl font-bold mb-6 capitalize">
                      {category}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categorySkills.map((skill) => (
                        <Card
                          key={skill.id}
                          className="hover-elevate transition-transform hover:-translate-y-1"
                          data-testid={`skill-${skill.id}`}
                        >
                          <CardContent className="p-4 flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold mb-1">{skill.name}</h3>
                              <Badge
                                variant="secondary"
                                className="text-xs capitalize"
                              >
                                {skill.level}
                              </Badge>
                            </div>
                            <Code className="h-5 w-5 text-primary" />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Code className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground">No skills added yet.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
