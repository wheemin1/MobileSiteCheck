import { pgTable, text, serial, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const analysisReports = pgTable("analysis_reports", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  overallScore: integer("overall_score").notNull(),
  performanceScore: integer("performance_score").notNull(),
  accessibilityScore: integer("accessibility_score").notNull(),
  bestPracticesScore: integer("best_practices_score").notNull(),
  seoScore: integer("seo_score").notNull(),
  mobileViewport: jsonb("mobile_viewport").notNull(),
  touchElements: jsonb("touch_elements").notNull(),
  textSize: jsonb("text_size").notNull(),
  contentWidth: jsonb("content_width").notNull(),
  coreWebVitals: jsonb("core_web_vitals").notNull(),
  recommendations: jsonb("recommendations").notNull(),
  analysisTimestamp: timestamp("analysis_timestamp").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertAnalysisReportSchema = createInsertSchema(analysisReports).omit({
  id: true,
  analysisTimestamp: true,
});

export const urlAnalysisSchema = z.object({
  url: z.string().url("올바른 URL을 입력해주세요"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type AnalysisReport = typeof analysisReports.$inferSelect;
export type InsertAnalysisReport = z.infer<typeof insertAnalysisReportSchema>;
export type UrlAnalysisRequest = z.infer<typeof urlAnalysisSchema>;
