export interface AnalysisReport {
  id: number;
  url: string;
  overallScore: number;
  performanceScore: number;
  accessibilityScore: number;
  bestPracticesScore: number;
  seoScore: number;
  mobileViewport: {
    score: number;
    passed: boolean;
    details?: any;
  };
  touchElements: {
    score: number;
    passed: boolean;
    details?: any;
  };
  textSize: {
    score: number;
    passed: boolean;
    details?: any;
  };
  contentWidth: {
    score: number;
    passed: boolean;
    details?: any;
  };
  coreWebVitals: {
    lcp: {
      value: number;
      score: number;
    };
    cls: {
      value: number;
      score: number;
    };
    inp: {
      value: number;
      score: number;
    };
  };
  recommendations: Recommendation[];
  analysisTimestamp: Date;
}

export interface Recommendation {
  type: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  solutions: string[];
}

export interface AnalysisState {
  isLoading: boolean;
  report: AnalysisReport | null;
  error: string | null;
}
