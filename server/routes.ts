import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, ensureAuthenticated } from "./auth";
import { sendContactEmail } from "./email";
import {
  insertProjectSchema,
  insertCertificateSchema,
  insertSkillSchema,
  insertServiceSchema,
  insertSocialLinkSchema,
  insertContactMessageSchema,
  insertBlogPostSchema,
  insertAboutContentSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);
  
  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.get("/api/projects", async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get("/api/projects/:id", async (req, res) => {
    const project = await storage.getProject(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  });

  app.post("/api/projects", ensureAuthenticated, async (req, res) => {
    const result = insertProjectSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const project = await storage.createProject(result.data);
    res.json(project);
  });

  app.patch("/api/projects/:id", ensureAuthenticated, async (req, res) => {
    const result = insertProjectSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const project = await storage.updateProject(req.params.id, result.data);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  });

  app.delete("/api/projects/:id", ensureAuthenticated, async (req, res) => {
    const success = await storage.deleteProject(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ success: true });
  });

  app.get("/api/certificates", async (_req, res) => {
    const certificates = await storage.getCertificates();
    res.json(certificates);
  });

  app.get("/api/certificates/:id", async (req, res) => {
    const certificate = await storage.getCertificate(req.params.id);
    if (!certificate) {
      return res.status(404).json({ error: "Certificate not found" });
    }
    res.json(certificate);
  });

  app.post("/api/certificates", ensureAuthenticated, async (req, res) => {
    const result = insertCertificateSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const certificate = await storage.createCertificate(result.data);
    res.json(certificate);
  });

  app.patch("/api/certificates/:id", ensureAuthenticated, async (req, res) => {
    const result = insertCertificateSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const certificate = await storage.updateCertificate(req.params.id, result.data);
    if (!certificate) {
      return res.status(404).json({ error: "Certificate not found" });
    }
    res.json(certificate);
  });

  app.delete("/api/certificates/:id", ensureAuthenticated, async (req, res) => {
    const success = await storage.deleteCertificate(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Certificate not found" });
    }
    res.json({ success: true });
  });

  app.get("/api/skills", async (_req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  app.get("/api/skills/:id", async (req, res) => {
    const skill = await storage.getSkill(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: "Skill not found" });
    }
    res.json(skill);
  });

  app.post("/api/skills", ensureAuthenticated, async (req, res) => {
    const result = insertSkillSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const skill = await storage.createSkill(result.data);
    res.json(skill);
  });

  app.patch("/api/skills/:id", ensureAuthenticated, async (req, res) => {
    const result = insertSkillSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const skill = await storage.updateSkill(req.params.id, result.data);
    if (!skill) {
      return res.status(404).json({ error: "Skill not found" });
    }
    res.json(skill);
  });

  app.delete("/api/skills/:id", ensureAuthenticated, async (req, res) => {
    const success = await storage.deleteSkill(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Skill not found" });
    }
    res.json({ success: true });
  });

  app.get("/api/services", async (_req, res) => {
    const services = await storage.getServices();
    res.json(services);
  });

  app.get("/api/services/:id", async (req, res) => {
    const service = await storage.getService(req.params.id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json(service);
  });

  app.post("/api/services", ensureAuthenticated, async (req, res) => {
    const result = insertServiceSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const service = await storage.createService(result.data);
    res.json(service);
  });

  app.patch("/api/services/:id", ensureAuthenticated, async (req, res) => {
    const result = insertServiceSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const service = await storage.updateService(req.params.id, result.data);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json(service);
  });

  app.delete("/api/services/:id", ensureAuthenticated, async (req, res) => {
    const success = await storage.deleteService(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json({ success: true });
  });

  app.get("/api/social-links", async (_req, res) => {
    const socialLinks = await storage.getSocialLinks();
    res.json(socialLinks);
  });

  app.get("/api/social-links/:id", async (req, res) => {
    const socialLink = await storage.getSocialLink(req.params.id);
    if (!socialLink) {
      return res.status(404).json({ error: "Social link not found" });
    }
    res.json(socialLink);
  });

  app.post("/api/social-links", ensureAuthenticated, async (req, res) => {
    const result = insertSocialLinkSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const socialLink = await storage.createSocialLink(result.data);
    res.json(socialLink);
  });

  app.patch("/api/social-links/:id", ensureAuthenticated, async (req, res) => {
    const result = insertSocialLinkSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const socialLink = await storage.updateSocialLink(req.params.id, result.data);
    if (!socialLink) {
      return res.status(404).json({ error: "Social link not found" });
    }
    res.json(socialLink);
  });

  app.delete("/api/social-links/:id", ensureAuthenticated, async (req, res) => {
    const success = await storage.deleteSocialLink(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Social link not found" });
    }
    res.json({ success: true });
  });

app.post("/api/contact", async (req, res) => {
    const result = insertContactMessageSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    
    try {
      // 1. Save to database FIRST (This guarantees we have the message)
      const message = await storage.createContactMessage(result.data);
      
      // 2. Try to send email (If this fails, we just log it)
      try {
        await sendContactEmail(result.data);
      } catch (emailError) {
        console.error("Email failed to send, but message was saved:", emailError);
      }

      // 3. Always return success to the user
      res.json(message);
    } catch (error) {
      console.error('Error processing contact form:', error);
      return res.status(500).json({ error: "Failed to process contact message" });
    }
  });

  app.get("/api/contact-messages", ensureAuthenticated, async (_req, res) => {
    const messages = await storage.getContactMessages();
    res.json(messages);
  });

  app.get("/api/blog-posts", async (req, res) => {
    const publishedOnly = req.query.published === 'true';
    const blogPosts = await storage.getBlogPosts(publishedOnly);
    res.json(blogPosts);
  });

  app.get("/api/blog-posts/slug/:slug", async (req, res) => {
    const blogPost = await storage.getBlogPostBySlug(req.params.slug);
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(blogPost);
  });

  app.get("/api/blog-posts/:id", async (req, res) => {
    const blogPost = await storage.getBlogPost(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(blogPost);
  });

  app.post("/api/blog-posts", ensureAuthenticated, async (req, res) => {
    const result = insertBlogPostSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const blogPost = await storage.createBlogPost(result.data);
    res.json(blogPost);
  });

  app.patch("/api/blog-posts/:id", ensureAuthenticated, async (req, res) => {
    const result = insertBlogPostSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const blogPost = await storage.updateBlogPost(req.params.id, result.data);
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(blogPost);
  });

  app.delete("/api/blog-posts/:id", ensureAuthenticated, async (req, res) => {
    const success = await storage.deleteBlogPost(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json({ success: true });
  });

  app.get("/api/about-content", async (_req, res) => {
    const content = await storage.getAboutContent();
    res.json(content);
  });

  app.post("/api/about-content", ensureAuthenticated, async (req, res) => {
    const result = insertAboutContentSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const content = await storage.createOrUpdateAboutContent(result.data);
    res.json(content);
  });

  const httpServer = createServer(app);
  return httpServer;
}
