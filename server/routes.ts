import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes and middleware
  setupAuth(app);
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = contactSchema.parse(req.body);
      
      // Store the contact request
      const contactSubmission = await storage.createContactSubmission(validatedData);
      
      res.status(201).json({
        success: true,
        message: "Contact submission successfully received",
        id: contactSubmission.id
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false,
          message: "Validation error",
          errors: validationError.message
        });
      } else {
        console.error("Error processing contact submission:", error);
        res.status(500).json({ 
          success: false,
          message: "An error occurred while processing your request"
        });
      }
    }
  });

  // Test route to check if API is working
  app.get("/api/health", (_req, res) => {
    res.status(200).json({ status: "ok", message: "API is working" });
  });

  const httpServer = createServer(app);

  return httpServer;
}
