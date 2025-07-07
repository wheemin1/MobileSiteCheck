import { InsertAnalysisReport } from "@shared/schema";

export class MockLighthouseService {
  async analyzeUrl(url: string): Promise<InsertAnalysisReport> {
    try {
      // Validate URL format
      const urlObject = new URL(url);
      
      // Simulate analysis delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate realistic scores based on URL characteristics
      const isWellKnownSite = this.isWellKnownSite(url);
      const hasHttps = urlObject.protocol === 'https:';
      const hasResponsiveIndicators = this.hasResponsiveIndicators(url);
      
      // Base scores with some randomization for realism
      const performanceScore = this.generateScore(isWellKnownSite ? 80 : 65, 15);
      const accessibilityScore = this.generateScore(isWellKnownSite ? 85 : 70, 15);
      const bestPracticesScore = this.generateScore(hasHttps ? 90 : 70, 10);
      const seoScore = this.generateScore(isWellKnownSite ? 85 : 75, 10);
      
      const overallScore = Math.round((performanceScore + accessibilityScore + bestPracticesScore + seoScore) / 4);
      
      // Generate mobile-specific analysis
      const mobileViewport = {
        score: hasResponsiveIndicators ? 1 : Math.random() > 0.5 ? 1 : 0,
        passed: hasResponsiveIndicators ? true : Math.random() > 0.5,
        details: {
          hasViewportMeta: hasResponsiveIndicators,
          width: hasResponsiveIndicators ? "device-width" : "fixed"
        }
      };
      
      const touchElements = {
        score: this.generateScore(80, 20) / 100,
        passed: Math.random() > 0.3,
        details: {
          touchTargetSize: "적절함",
          spacing: "44px 이상"
        }
      };
      
      const textSize = {
        score: this.generateScore(85, 15) / 100,
        passed: Math.random() > 0.4,
        details: {
          legibleText: Math.round(Math.random() * 20 + 80) + "%",
          fontSize: "16px 이상"
        }
      };
      
      const contentWidth = {
        score: this.generateScore(90, 10) / 100,
        passed: Math.random() > 0.2,
        details: {
          fitsViewport: true,
          horizontalScrolling: false
        }
      };
      
      // Core Web Vitals with realistic values
      const coreWebVitals = {
        lcp: {
          value: 1.2 + Math.random() * 2.8, // 1.2-4.0 seconds
          score: this.generateScore(75, 20) / 100
        },
        cls: {
          value: Math.random() * 0.25, // 0-0.25
          score: this.generateScore(80, 15) / 100
        },
        inp: {
          value: Math.random() * 200 + 100, // 100-300ms
          score: this.generateScore(85, 15) / 100
        }
      };
      
      // Generate recommendations based on scores
      const recommendations = this.generateRecommendations({
        mobileViewport,
        touchElements,
        textSize,
        contentWidth,
        coreWebVitals,
        performanceScore,
        accessibilityScore
      });
      
      return {
        url,
        overallScore,
        performanceScore,
        accessibilityScore,
        bestPracticesScore,
        seoScore,
        mobileViewport,
        touchElements,
        textSize,
        contentWidth,
        coreWebVitals,
        recommendations
      };
    } catch (error) {
      console.error("Mock analysis failed:", error);
      throw new Error("올바른 URL을 입력해주세요. 예: https://example.com");
    }
  }
  
  private isWellKnownSite(url: string): boolean {
    const wellKnownDomains = [
      'google.com', 'naver.com', 'kakao.com', 'samsung.com', 
      'lg.com', 'coupang.com', 'youtube.com', 'github.com'
    ];
    return wellKnownDomains.some(domain => url.includes(domain));
  }
  
  private hasResponsiveIndicators(url: string): boolean {
    // Assume most modern sites have responsive design
    return Math.random() > 0.3;
  }
  
  private generateScore(base: number, variance: number): number {
    const score = base + (Math.random() - 0.5) * variance * 2;
    return Math.max(0, Math.min(100, Math.round(score)));
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
          "서버 응답 시간을 개선하세요",
          "CDN을 사용하여 정적 자원을 빠르게 제공하세요"
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
          "웹 폰트 로딩을 최적화하세요",
          "CSS transform과 opacity만 사용하여 애니메이션하세요"
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
          "코드 분할 및 지연 로딩을 적용하세요",
          "Web Workers를 사용하여 무거운 작업을 분리하세요"
        ]
      });
    }
    
    if (data.performanceScore < 70) {
      recommendations.push({
        type: "performance",
        title: "전반적인 성능 개선",
        description: "웹사이트의 전반적인 성능 최적화가 필요합니다.",
        priority: "high",
        solutions: [
          "이미지를 WebP 또는 AVIF 형식으로 최적화하세요",
          "JavaScript 번들 크기를 줄이세요",
          "브라우저 캐싱을 활용하세요",
          "불필요한 플러그인과 스크립트를 제거하세요"
        ]
      });
    }
    
    if (data.accessibilityScore < 80) {
      recommendations.push({
        type: "accessibility",
        title: "접근성 개선",
        description: "웹사이트의 접근성 향상이 필요합니다.",
        priority: "medium",
        solutions: [
          "이미지에 alt 속성을 추가하세요",
          "충분한 색상 대비를 확보하세요",
          "키보드 네비게이션을 지원하세요",
          "스크린 리더 호환성을 개선하세요"
        ]
      });
    }
    
    return recommendations;
  }
}