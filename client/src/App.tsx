import { useEffect } from "react";
import { Route, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";
import Home from "@/pages/home";
import About from "@/pages/about";
import Achievements from "@/pages/achievements";
import Projects from "@/pages/projects";
import Services from "@/pages/services";
import Contact from "@/pages/contact";
import SocialLinks from "@/pages/social-links";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import AuthPage from "@/pages/auth";
import Admin from "@/pages/admin";
import AdminProjects from "@/pages/admin-projects";
import AdminCertificates from "@/pages/admin-certificates";
import AdminSkills from "@/pages/admin-skills";
import AdminServices from "@/pages/admin-services";
import AdminSocialLinks from "@/pages/admin-social-links";
import AdminBlog from "@/pages/admin-blog";
import NotFound from "@/pages/not-found";

function Router() {
  useAnalytics();
  const [location] = useLocation();

  const routes = {
    "/": Home,
    "/about": About,
    "/achievements": Achievements,
    "/projects": Projects,
    "/services": Services,
    "/contact": Contact,
    "/social-links": SocialLinks,
  };

  const CurrentPage = routes[location as keyof typeof routes];

  return (
    <>
      <AnimatePresence mode="wait">
        {CurrentPage && (
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <CurrentPage />
          </motion.div>
        )}
      </AnimatePresence>
      
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/admin" component={Admin} />
      <ProtectedRoute path="/admin/projects" component={AdminProjects} />
      <ProtectedRoute path="/admin/certificates" component={AdminCertificates} />
      <ProtectedRoute path="/admin/skills" component={AdminSkills} />
      <ProtectedRoute path="/admin/services" component={AdminServices} />
      <ProtectedRoute path="/admin/social-links" component={AdminSocialLinks} />
      <ProtectedRoute path="/admin/blog" component={AdminBlog} />
      
      {!CurrentPage && location !== "/blog" && !location.startsWith("/blog/") && location !== "/auth" && !location.startsWith("/admin") && <NotFound />}
    </>
  );
}

function App() {
  useEffect(() => {
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    } else {
      initGA();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <AuthProvider>
          <TooltipProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Router />
              </main>
              <Footer />
            </div>
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
