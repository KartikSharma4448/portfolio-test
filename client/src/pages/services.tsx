import { useQuery } from "@tanstack/react-query";
import { Loader2, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Service } from "@shared/schema";
import * as Icons from "lucide-react";

export default function Services() {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? IconComponent : Briefcase;
  };

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Services & Expertise
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional services I offer to help bring your ideas to life
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : services && services.length > 0 ? (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {services.map((service) => {
                const Icon = getIcon(service.icon);
                return (
                  <motion.div key={service.id} variants={itemVariants}>
                    <Card
                      className="hover-elevate transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group h-full"
                      data-testid={`service-${service.id}`}
                    >
                      <CardHeader>
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mt-20 text-center bg-gradient-to-br from-primary/10 to-chart-2/10 rounded-lg p-12"
            >
              <h2 className="text-3xl font-bold mb-4">Interested in Working Together?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                I'm available for freelance projects, internships, and collaboration
                opportunities. Let's discuss how I can help with your next project.
              </p>
              <a href="/contact">
                <button
                  className="group relative overflow-hidden inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  data-testid="button-get-started"
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-chart-2/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </a>
            </motion.div>
          </>
        ) : (
          <div className="text-center py-20">
            <Briefcase className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground">No services added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
