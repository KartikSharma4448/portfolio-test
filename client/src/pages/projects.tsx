import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Github, Loader2, FolderOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@shared/schema";

export default function Projects() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const featuredProjects = projects?.filter((p) => p.featured === "true");
  const otherProjects = projects?.filter((p) => p.featured !== "true");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Projects</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Building innovative solutions and learning through hands-on
            development
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : projects && projects.length > 0 ? (
          <>
            {/* Featured Projects */}
            {featuredProjects && featuredProjects.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                  {featuredProjects.map((project) => (
                    <motion.div key={project.id} variants={itemVariants}>
                      <Card
                        className="hover-elevate transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden group h-full"
                        data-testid={`project-featured-${project.id}`}
                      >
                        {project.imageUrl && (
                          <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center relative overflow-hidden">
                            <FolderOpen className="h-16 w-16 text-muted-foreground/30 group-hover:scale-110 transition-transform duration-300" />
                          </div>
                        )}
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <CardTitle className="text-2xl">
                              {project.title}
                            </CardTitle>
                            <Badge className="bg-chart-2 hover:bg-chart-2">
                              Featured
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-muted-foreground leading-relaxed">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, idx) => (
                              <Badge key={idx} variant="secondary" className="transition-transform hover:scale-105">
                                {tech}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex gap-3 pt-2">
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid={`link-live-${project.id}`}
                              >
                                <Button size="sm" className="group/btn relative overflow-hidden">
                                  <span className="relative z-10 flex items-center">
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Live Demo
                                  </span>
                                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-chart-2/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                                </Button>
                              </a>
                            )}
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid={`link-github-${project.id}`}
                              >
                                <Button size="sm" variant="outline" className="group/btn relative overflow-hidden">
                                  <span className="relative z-10 flex items-center">
                                    <Github className="h-4 w-4 mr-2" />
                                    GitHub
                                  </span>
                                  <div className="absolute inset-0 bg-primary/5 scale-0 group-hover/btn:scale-100 transition-transform duration-300" />
                                </Button>
                              </a>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>
            )}

            {/* Other Projects */}
            {otherProjects && otherProjects.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-8">More Projects</h2>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {otherProjects.map((project) => (
                    <motion.div key={project.id} variants={itemVariants}>
                      <Card
                        className="hover-elevate transition-all duration-300 hover:-translate-y-2 hover:shadow-lg group h-full"
                        data-testid={`project-${project.id}`}
                      >
                        <CardHeader>
                          <CardTitle className="flex items-start gap-3">
                            <FolderOpen className="h-5 w-5 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                            <span className="leading-tight">{project.title}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 4).map((tech, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs transition-transform hover:scale-105"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex gap-2">
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid={`link-live-${project.id}`}
                              >
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8 hover-elevate active-elevate-2 transition-all duration-300 hover:scale-110"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </a>
                            )}
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid={`link-github-${project.id}`}
                              >
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8 hover-elevate active-elevate-2 transition-all duration-300 hover:scale-110"
                                >
                                  <Github className="h-4 w-4" />
                                </Button>
                              </a>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <FolderOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground">No projects added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
