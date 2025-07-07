import puppeteer from "puppeteer";
import { getChromePath, chromeBrowserConfig } from "./browser-utils";

export class WebsitePreviewService {
  async generatePreview(url: string): Promise<{ screenshot: Buffer; title: string; description: string }> {
    let browser;
    try {
      browser = await puppeteer.launch({
        ...chromeBrowserConfig,
        executablePath: getChromePath()
      });

      const page = await browser.newPage();
      
      // Set mobile viewport for preview
      await page.setViewport({ 
        width: 375, 
        height: 667, 
        deviceScaleFactor: 2,
        isMobile: true 
      });

      // Set user agent for mobile
      await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1');

      // Navigate to the URL with timeout
      await page.goto(url, { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });

      // Wait a bit for any lazy-loaded content
      await page.waitForTimeout(2000);

      // Get page title and description
      const pageInfo = await page.evaluate(() => {
        const title = document.title || '';
        const descriptionMeta = document.querySelector('meta[name="description"]');
        const description = descriptionMeta ? descriptionMeta.getAttribute('content') || '' : '';
        return { title, description };
      });

      // Take screenshot
      const screenshot = await page.screenshot({
        type: 'png',
        clip: {
          x: 0,
          y: 0,
          width: 375,
          height: 600
        }
      });

      return {
        screenshot,
        title: pageInfo.title,
        description: pageInfo.description
      };

    } catch (error) {
      console.error('Website preview failed:', error);
      throw new Error('웹사이트 미리보기 생성에 실패했습니다.');
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
}