import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  role: text("role").notNull().default("client"), // client, admin
  createdAt: timestamp("created_at").defaultNow(),
  company: text("company"),
  phone: text("phone"),
  lastLogin: timestamp("last_login"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  fullName: true,
  role: true,
  company: true,
  phone: true,
  lastLogin: true,
});

// Client register schema
export const registerUserSchema = insertUserSchema.pick({
  username: true,
  email: true,
  password: true,
  fullName: true,
  company: true,
  phone: true,
}).extend({
  confirmPassword: z.string(),
  acceptTerms: z.boolean(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
}).refine(data => data.acceptTerms === true, {
  message: "You must accept the terms",
  path: ["acceptTerms"]
});

// Login schema
export const loginUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Contact submission schema
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  inquiry: text("inquiry").notNull(),
  budget: text("budget").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  inquiry: z.string().min(1, "Inquiry type is required"),
  budget: z.string().min(1, "Budget range is required"),
  message: z.string().min(1, "Message is required"),
  privacy: z.boolean().refine(val => val === true, {
    message: "You must agree to the privacy policy"
  })
});

export const insertContactSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  inquiry: true,
  budget: true,
  message: true,
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSchema>;

// Projects
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull().default("planning"), // planning, in_progress, testing, completed, maintenance
  startDate: timestamp("start_date").defaultNow(),
  endDate: timestamp("end_date"),
  budget: text("budget"),
  clientId: integer("client_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  name: true,
  description: true,
  status: true,
  startDate: true,
  endDate: true,
  budget: true,
  clientId: true,
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

// Project Updates
export const projectUpdates = pgTable("project_updates", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  createdBy: integer("created_by").references(() => users.id),
});

export const insertProjectUpdateSchema = createInsertSchema(projectUpdates).pick({
  projectId: true,
  title: true,
  content: true,
  createdBy: true,
});

export type ProjectUpdate = typeof projectUpdates.$inferSelect;
export type InsertProjectUpdate = z.infer<typeof insertProjectUpdateSchema>;

// Invoices
export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id),
  clientId: integer("client_id").notNull().references(() => users.id),
  amount: text("amount").notNull(),
  status: text("status").notNull().default("unpaid"), // unpaid, paid
  dueDate: timestamp("due_date").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  paidAt: timestamp("paid_at"),
});

export const insertInvoiceSchema = createInsertSchema(invoices).pick({
  projectId: true,
  clientId: true,
  amount: true,
  status: true,
  dueDate: true,
  notes: true,
});

export type Invoice = typeof invoices.$inferSelect;
export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;

// Define relationships

export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projects),
  invoices: many(invoices),
  projectUpdates: many(projectUpdates, { relationName: "created_by" }),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  client: one(users, {
    fields: [projects.clientId],
    references: [users.id],
  }),
  updates: many(projectUpdates),
  invoices: many(invoices),
}));

export const projectUpdatesRelations = relations(projectUpdates, ({ one }) => ({
  project: one(projects, {
    fields: [projectUpdates.projectId],
    references: [projects.id],
  }),
  creator: one(users, {
    fields: [projectUpdates.createdBy],
    references: [users.id],
    relationName: "created_by",
  }),
}));

export const invoicesRelations = relations(invoices, ({ one }) => ({
  project: one(projects, {
    fields: [invoices.projectId],
    references: [projects.id],
  }),
  client: one(users, {
    fields: [invoices.clientId],
    references: [users.id],
  }),
}));
