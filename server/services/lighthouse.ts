import { exec } from "child_process";
import { promisify } from "util";
import { InsertAnalysisReport } from "@shared/schema";

const execAsync = promisify(exec);

interface LighthouseResult {
  lhr: {
    finalUrl: string;
    categories: {
      performance: { score: number };
      accessibility: { score: number };
      "best-practices": { score: number };
      seo: { score: number };
    };
    audits: {
      viewport: { score: number; details?: any };
      "tap-targets": { score: number; details?: any };
      "font-size": { score: number; details?: any };
      "content-width": { score: number; details?: any };
      "largest-contentful-paint": { numericValue: number; score: number };
      "cumulative-layout-shift": { numericValue: number; score: number };
      "interaction-to-next-paint": { numericValue: number; score: number };
      "speed-index": { numericValue: number; score: number };
    };
  };
}

export class LighthouseService {
  async analyzeUrl(url: string): Promise<InsertAnalysisReport> {
    try {
      // Run Lighthouse CLI with mobile configuration
      const command = `lighthouse "${url}" --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=/tmp/lighthouse-${Date.now()}.json --emulated-form-factor=mobile --throttling-method=simulate --no-enable-error-reporting --quiet`;
      
      const { stdout } = await execAsync(command);
      const result: LighthouseResult = JSON.parse(stdout);
      
      return this.processLighthouseResult(url, result);
    } catch (error) {
      console.error("Lighthouse analysis failed:", error);
      throw new Error("웹사이트 분석 중 오류가 발생했습니다. URL을 다시 확인해주세요.");
    }
  }

  private processLighthouseResult(url: string, result: LighthouseResult): InsertAnalysisReport {
    const { lhr } = result;
    
    // Calculate overall score
    const scores = [
      lhr.categories.performance.score,
      lhr.categories.accessibility.score,
      lhr.categories["best-practices"].score,
      lhr.categories.seo.score
    ];
    const overallScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 100);

    // Process mobile-specific audits
    const mobileViewport = {
      score: lhr.audits.viewport.score,
      passed: lhr.audits.viewport.score === 1,
      details: lhr.audits.viewport.details
    };

    const touchElements = {
      score: lhr.audits["tap-targets"].score,
      passed: lhr.audits["tap-targets"].score === 1,
      details: lhr.audits["tap-targets"].details
    };

    const textSize = {
      score: lhr.audits["font-size"].score,
      passed: lhr.audits["font-size"].score === 1,
      details: lhr.audits["font-size"].details
    };

    const contentWidth = {
      score: lhr.audits["content-width"].score,
      passed: lhr.audits["content-width"].score === 1,
      details: lhr.audits["content-width"].details
    };

    // Process Core Web Vitals
    const coreWebVitals = {
      lcp: {
        value: lhr.audits["largest-contentful-paint"].numericValue / 1000,
        score: lhr.audits["largest-contentful-paint"].score
      },
      cls: {
        value: lhr.audits["cumulative-layout-shift"].numericValue,
        score: lhr.audits["cumulative-layout-shift"].score
      },
      inp: {
        value: lhr.audits["interaction-to-next-paint"]?.numericValue || 0,
        score: lhr.audits["interaction-to-next-paint"]?.score || 1
      }
    };

    // Generate Korean recommendations
    const recommendations = this.generateRecommendations({
      mobileViewport,
      touchElements,
      textSize,
      contentWidth,
      coreWebVitals
    });

    return {
      url,
      overallScore,
      performanceScore: Math.round(lhr.categories.performance.score * 100),
      accessibilityScore: Math.round(lhr.categories.accessibility.score * 100),
      bestPracticesScore: Math.round(lhr.categories["best-practices"].score * 100),
      seoScore: Math.round(lhr.categories.seo.score * 100),
      mobileViewport,
      touchElements,
      textSize,
      contentWidth,
      coreWebVitals,
      recommendations
    };
  }

  private generateRecommendations(data: any): any[] {
    const recommendations = [];

    if (!data.mobileViewport.passed) {
      recommendations.push({
        type: "viewport",
        title: "모바일 뷰포트 설정",
        description: "모바일 기기에서 올바른 크기로 표시되지 않습니다.",
        priority: "high",
        solutions: [
          "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> 태그를 추가하세요",
          "반응형 디자인을 구현하세요",
          "CSS Media Query를 사용하여 다양한 화면 크기에 대응하세요"
        ]
      });
    }

    if (!data.touchElements.passed) {
      recommendations.push({
        type: "touch-targets",
        title: "터치 요소 간격 개선",
        description: "터치 가능한 요소들 간의 간격이 부족합니다.",
        priority: "medium",
        solutions: [
          "버튼과 링크 사이에 최소 44px 간격을 유지하세요",
          "터치 타겟 크기를 44px 이상으로 설정하세요",
          "CSS padding과 margin을 적절히 활용하세요"
        ]
      });
    }

    if (!data.textSize.passed) {
      recommendations.push({
        type: "font-size",
        title: "글자 크기 개선",
        description: "모바일에서 읽기 어려운 작은 텍스트가 발견되었습니다.",
        priority: "medium",
        solutions: [
          "본문 텍스트 최소 16px 이상 사용하세요",
          "중요한 텍스트는 18px 이상 권장합니다",
          "CSS에서 font-size: 16px 또는 1rem을 사용하세요"
        ]
      });
    }

    if (!data.contentWidth.passed) {
      recommendations.push({
        type: "content-width",
        title: "콘텐츠 폭 최적화",
        description: "모바일에서 가로 스크롤이 발생합니다.",
        priority: "high",
        solutions: [
          "CSS max-width: 100%를 사용하여 콘텐츠 폭을 제한하세요",
          "overflow-x: hidden을 적용하여 가로 스크롤을 방지하세요",
          "Flexbox나 Grid를 사용하여 반응형 레이아웃을 구현하세요"
        ]
      });
    }

    if (data.coreWebVitals.lcp.score < 0.9) {
      recommendations.push({
        type: "lcp",
        title: "로딩 성능 개선",
        description: "가장 큰 콘텐츠 렌더링 시간이 느립니다.",
        priority: "high",
        solutions: [
          "이미지 최적화 및 압축을 진행하세요",
          "중요한 리소스를 미리 로딩하세요",
          "서버 응답 시간을 개선하세요"
        ]
      });
    }

    if (data.coreWebVitals.cls.score < 0.9) {
      recommendations.push({
        type: "cls",
        title: "레이아웃 안정성 개선",
        description: "페이지 로딩 중 레이아웃이 이동합니다.",
        priority: "medium",
        solutions: [
          "이미지와 광고에 크기 속성을 지정하세요",
          "동적 콘텐츠를 위한 공간을 미리 확보하세요",
          "웹 폰트 로딩을 최적화하세요"
        ]
      });
    }

    if (data.coreWebVitals.inp.score < 0.9) {
      recommendations.push({
        type: "inp",
        title: "상호작용 응답 시간 개선",
        description: "사용자 터치에 대한 응답 시간이 느립니다.",
        priority: "medium",
        solutions: [
          "불필요한 JavaScript를 제거하세요",
          "이벤트 핸들러를 최적화하세요",
          "코드 분할 및 지연 로딩을 적용하세요"
        ]
      });
    }

    return recommendations;
  }
}
