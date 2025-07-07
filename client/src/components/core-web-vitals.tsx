import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AnalysisReport } from "@/lib/types";
import { Gauge } from "lucide-react";

interface CoreWebVitalsProps {
  report: AnalysisReport;
}

export function CoreWebVitals({ report }: CoreWebVitalsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 0.9) return "text-green-600";
    if (score >= 0.5) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressColor = (score: number) => {
    if (score >= 0.9) return "bg-green-500";
    if (score >= 0.5) return "bg-yellow-500";
    return "bg-red-500";
  };

  const formatLCP = (value: number) => `${value.toFixed(1)}초`;
  const formatCLS = (value: number) => value.toFixed(3);
  const formatINP = (value: number) => `${Math.round(value)}ms`;

  return (
    <Card className="shadow-lg">
      <CardContent className="p-8">
        <h4 className="text-xl font-semibold mb-6 flex items-center">
          <Gauge className="text-primary mr-3" />
          Core Web Vitals
        </h4>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* LCP */}
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className={`text-3xl font-bold mb-2 ${getScoreColor(report.coreWebVitals.lcp.score)}`}>
              {formatLCP(report.coreWebVitals.lcp.value)}
            </div>
            <div className="text-sm font-semibold text-gray-700 mb-1">
              LCP (Largest Contentful Paint)
            </div>
            <div className="text-xs text-gray-500 mb-3">
              가장 큰 콘텐츠 렌더링 시간
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(report.coreWebVitals.lcp.score)}`}
                style={{ width: `${report.coreWebVitals.lcp.score * 100}%` }}
              />
            </div>
          </div>
          
          {/* CLS */}
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className={`text-3xl font-bold mb-2 ${getScoreColor(report.coreWebVitals.cls.score)}`}>
              {formatCLS(report.coreWebVitals.cls.value)}
            </div>
            <div className="text-sm font-semibold text-gray-700 mb-1">
              CLS (Cumulative Layout Shift)
            </div>
            <div className="text-xs text-gray-500 mb-3">
              누적 레이아웃 이동
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(report.coreWebVitals.cls.score)}`}
                style={{ width: `${report.coreWebVitals.cls.score * 100}%` }}
              />
            </div>
          </div>
          
          {/* INP */}
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className={`text-3xl font-bold mb-2 ${getScoreColor(report.coreWebVitals.inp.score)}`}>
              {formatINP(report.coreWebVitals.inp.value)}
            </div>
            <div className="text-sm font-semibold text-gray-700 mb-1">
              INP (Interaction to Next Paint)
            </div>
            <div className="text-xs text-gray-500 mb-3">
              상호작용 응답 시간
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(report.coreWebVitals.inp.score)}`}
                style={{ width: `${report.coreWebVitals.inp.score * 100}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
