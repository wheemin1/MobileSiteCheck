import puppeteer from "puppeteer";
import { AnalysisReport } from "@shared/schema";

export class ReportService {
  async generatePDF(report: AnalysisReport): Promise<Buffer> {
    const browser = await puppeteer.launch({ headless: true });
    try {
      const page = await browser.newPage();
      
      const html = this.generateReportHTML(report);
      await page.setContent(html);
      await page.emulateMediaType('screen');
      
      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px'
        }
      });
      
      return pdf;
    } finally {
      await browser.close();
    }
  }

  async generateScreenshot(report: AnalysisReport): Promise<Buffer> {
    const browser = await puppeteer.launch({ headless: true });
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 800 });
      
      const html = this.generateReportHTML(report);
      await page.setContent(html);
      
      const screenshot = await page.screenshot({
        type: 'png',
        fullPage: true
      });
      
      return screenshot;
    } finally {
      await browser.close();
    }
  }

  private generateReportHTML(report: AnalysisReport): string {
    const formatDate = (date: Date) => {
      return new Date(date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    return `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>모바일 친화성 분석 보고서</title>
        <style>
          body {
            font-family: 'Noto Sans KR', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #3B82F6;
            padding-bottom: 20px;
          }
          .score-circle {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: linear-gradient(135deg, #10B981, #059669);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 36px;
            font-weight: bold;
            margin: 20px auto;
          }
          .metrics {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin: 30px 0;
          }
          .metric {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
          }
          .metric h3 {
            margin: 0 0 10px 0;
            color: #3B82F6;
          }
          .recommendations {
            margin-top: 30px;
          }
          .recommendation {
            background: #fff;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
          }
          .recommendation h4 {
            color: #1f2937;
            margin-bottom: 10px;
          }
          .solutions {
            list-style: none;
            padding: 0;
          }
          .solutions li {
            padding: 5px 0;
            padding-left: 20px;
            position: relative;
          }
          .solutions li::before {
            content: "•";
            color: #3B82F6;
            font-weight: bold;
            position: absolute;
            left: 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>모바일 친화성 분석 보고서</h1>
          <p><strong>분석 URL:</strong> ${report.url}</p>
          <p><strong>분석 일시:</strong> ${formatDate(report.analysisTimestamp)}</p>
        </div>

        <div class="score-section">
          <div class="score-circle">${report.overallScore}</div>
          <p style="text-align: center; font-size: 18px; font-weight: bold;">
            ${report.overallScore >= 90 ? '모바일 최적화 우수' : 
              report.overallScore >= 70 ? '모바일 최적화 양호' : '모바일 최적화 개선 필요'}
          </p>
        </div>

        <div class="metrics">
          <div class="metric">
            <h3>성능 점수</h3>
            <div style="font-size: 24px; font-weight: bold;">${report.performanceScore}</div>
          </div>
          <div class="metric">
            <h3>접근성 점수</h3>
            <div style="font-size: 24px; font-weight: bold;">${report.accessibilityScore}</div>
          </div>
          <div class="metric">
            <h3>모범 사례 점수</h3>
            <div style="font-size: 24px; font-weight: bold;">${report.bestPracticesScore}</div>
          </div>
          <div class="metric">
            <h3>SEO 점수</h3>
            <div style="font-size: 24px; font-weight: bold;">${report.seoScore}</div>
          </div>
        </div>

        <div class="recommendations">
          <h2>개선 권장사항</h2>
          ${(report.recommendations as any[]).map(rec => `
            <div class="recommendation">
              <h4>${rec.title}</h4>
              <p>${rec.description}</p>
              <ul class="solutions">
                ${rec.solutions.map((solution: string) => `<li>${solution}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>

        <footer style="margin-top: 40px; text-align: center; color: #666; font-size: 12px;">
          <p>모바일 친화성 테스트 | 생성일: ${formatDate(new Date())}</p>
        </footer>
      </body>
      </html>
    `;
  }
}
