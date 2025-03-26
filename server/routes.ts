import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const contactSchema = z.object({
        name: z.string().min(2),
        email: z.string().email(),
        subject: z.string().min(5),
        message: z.string().min(10),
      });

      const validatedData = contactSchema.parse(req.body);

      // Here you would typically integrate with an email service like Nodemailer
      // For now, we'll just return a success response
      
      console.log("Contact form submission:", validatedData);

      return res.status(200).json({
        success: true,
        message: "Message received successfully",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: error.errors,
        });
      }

      return res.status(500).json({
        success: false,
        message: "An error occurred while processing your request",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
