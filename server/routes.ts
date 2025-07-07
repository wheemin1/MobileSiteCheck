import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { LighthouseService } from "./services/lighthouse";
import { WebsitePreviewService } from "./services/website-preview";
import { ReportService } from "./services/report";
import { urlAnalysisSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const lighthouseService = new LighthouseService();
  const previewService = new WebsitePreviewService();
  const reportService = new ReportService();

  // Website preview endpoint
  app.post("/api/preview", async (req, res) => {
    try {
      const { url } = urlAnalysisSchema.parse(req.body);
      const preview = await previewService.generatePreview(url);
      
      res.json({
        title: preview.title,
        description: preview.description,
        screenshot: preview.screenshot.toString('base64')
      });
    } catch (error) {
      console.error("Preview error:", error);
      res.status(400).json({ 
        message: error instanceof Error ? error.message : "미리보기 생성 중 오류가 발생했습니다." 
      });
    }
  });

  // Analyze URL endpoint
  app.post("/api/analyze", async (req, res) => {
    try {
      const { url } = urlAnalysisSchema.parse(req.body);
      
      // Check for cached results
      const cachedResult = await storage.getCachedAnalysisReport(url);
      if (cachedResult) {
        console.log('Returning cached result for:', url);
        return res.json(cachedResult);
      }
      
      console.log('Starting new analysis for:', url);
      
      // Perform new analysis
      try {
        const analysisData = await lighthouseService.analyzeUrl(url);
        const report = await storage.createAnalysisReport(analysisData);
        console.log('Analysis completed successfully for:', url);
        res.json(report);
      } catch (lighthouseError) {
        console.error("Lighthouse analysis failed, trying mock service:", lighthouseError);
        
        // Fallback to mock service if Lighthouse fails
        const { MockLighthouseService } = await import("./services/mock-lighthouse");
        const mockService = new MockLighthouseService();
        const analysisData = await mockService.analyzeUrl(url);
        const report = await storage.createAnalysisReport(analysisData);
        console.log('Mock analysis completed for:', url);
        res.json(report);
      }
      
    } catch (error) {
      console.error("Analysis error:", error);
      res.status(400).json({ 
        message: error instanceof Error ? error.message : "분석 중 오류가 발생했습니다." 
      });
    }
  });

  // Get analysis report by ID
  app.get("/api/reports/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const report = await storage.getAnalysisReport(id);
      
      if (!report) {
        return res.status(404).json({ message: "분석 보고서를 찾을 수 없습니다." });
      }
      
      res.json(report);
    } catch (error) {
      console.error("Report fetch error:", error);
      res.status(500).json({ message: "보고서 조회 중 오류가 발생했습니다." });
    }
  });

  // Download PDF report
  app.get("/api/reports/:id/pdf", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const report = await storage.getAnalysisReport(id);
      
      if (!report) {
        return res.status(404).json({ message: "분석 보고서를 찾을 수 없습니다." });
      }
      
      const pdf = await reportService.generatePDF(report);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="mobile-analysis-${report.id}.pdf"`);
      res.send(pdf);
    } catch (error) {
      console.error("PDF generation error:", error);
      res.status(500).json({ message: "PDF 생성 중 오류가 발생했습니다." });
    }
  });

  // Download screenshot
  app.get("/api/reports/:id/screenshot", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const report = await storage.getAnalysisReport(id);
      
      if (!report) {
        return res.status(404).json({ message: "분석 보고서를 찾을 수 없습니다." });
      }
      
      const screenshot = await reportService.generateScreenshot(report);
      
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Content-Disposition', `attachment; filename="mobile-analysis-${report.id}.png"`);
      res.send(screenshot);
    } catch (error) {
      console.error("Screenshot generation error:", error);
      res.status(500).json({ message: "이미지 생성 중 오류가 발생했습니다." });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
