import { users, analysisReports, type User, type InsertUser, type AnalysisReport, type InsertAnalysisReport } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAnalysisReport(id: number): Promise<AnalysisReport | undefined>;
  getAnalysisReportByUrl(url: string): Promise<AnalysisReport | undefined>;
  createAnalysisReport(report: InsertAnalysisReport): Promise<AnalysisReport>;
  getCachedAnalysisReport(url: string): Promise<AnalysisReport | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private analysisReports: Map<number, AnalysisReport>;
  private urlToReportMap: Map<string, number>;
  private currentUserId: number;
  private currentReportId: number;

  constructor() {
    this.users = new Map();
    this.analysisReports = new Map();
    this.urlToReportMap = new Map();
    this.currentUserId = 1;
    this.currentReportId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAnalysisReport(id: number): Promise<AnalysisReport | undefined> {
    return this.analysisReports.get(id);
  }

  async getAnalysisReportByUrl(url: string): Promise<AnalysisReport | undefined> {
    const reportId = this.urlToReportMap.get(url);
    if (reportId) {
      return this.analysisReports.get(reportId);
    }
    return undefined;
  }

  async createAnalysisReport(insertReport: InsertAnalysisReport): Promise<AnalysisReport> {
    const id = this.currentReportId++;
    const report: AnalysisReport = { 
      ...insertReport, 
      id,
      analysisTimestamp: new Date()
    };
    this.analysisReports.set(id, report);
    this.urlToReportMap.set(insertReport.url, id);
    return report;
  }

  async getCachedAnalysisReport(url: string): Promise<AnalysisReport | undefined> {
    const reportId = this.urlToReportMap.get(url);
    if (reportId) {
      const report = this.analysisReports.get(reportId);
      if (report) {
        // Check if report is less than 24 hours old
        const now = new Date();
        const reportTime = new Date(report.analysisTimestamp);
        const hoursDiff = (now.getTime() - reportTime.getTime()) / (1000 * 60 * 60);
        
        if (hoursDiff < 24) {
          return report;
        }
      }
    }
    return undefined;
  }
}

export const storage = new MemStorage();
