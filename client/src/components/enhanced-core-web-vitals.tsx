import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AnalysisReport } from "@/lib/types";
import { Clock, Zap, LayoutGrid, Info, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

interface EnhancedCoreWebVitalsProps {
  report: AnalysisReport;
}

export function EnhancedCoreWebVitals({ report }: EnhancedCoreWebVitalsProps) {
  const { coreWebVitals } = report;

  const getScoreColor = (score: number) => {
    if (score >= 0.9) return "text-green-600";
    if (score >= 0.5) return "text-orange-500";
    return "text-red-500";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 0.9) return "bg-green-100 text-green-800 border-green-300";
    if (score >= 0.5) return "bg-orange-100 text-orange-800 border-orange-300";
    return "bg-red-100 text-red-800 border-red-300";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 0.9) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (score >= 0.5) return <AlertTriangle className="w-5 h-5 text-orange-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  const getScoreText = (score: number) => {
    if (score >= 0.9) return "우수";
    if (score >= 0.5) return "개선 필요";
    return "나쁨";
  };

  const getLCPDescription = (value: number) => {
    if (value <= 2.5) return "사용자가 즉시 콘텐츠를 볼 수 있어 우수한 경험을 제공합니다.";
    if (value <= 4.0) return "콘텐츠 로딩이 다소 느려 사용자가 기다려야 할 수 있습니다.";
    return "콘텐츠 로딩이 매우 느려 사용자 이탈 위험이 높습니다.";
  };

  const getCLSDescription = (value: number) => {
    if (value <= 0.1) return "페이지가 안정적이어서 사용자가 편안하게 이용할 수 있습니다.";
    if (value <= 0.25) return "페이지 요소가 약간 움직여 사용자에게 불편함을 줄 수 있습니다.";
    return "페이지 요소가 많이 움직여 사용자 경험이 나쁩니다.";
  };

  const getINPDescription = (value: number) => {
    if (value <= 200) return "클릭이나 터치에 즉시 반응하여 반응성이 우수합니다.";
    if (value <= 500) return "클릭이나 터치 반응이 다소 느려 개선이 필요합니다.";
    return "클릭이나 터치 반응이 매우 느려 즉시 개선이 필요합니다.";
  };

  // Convert scores to percentages for progress bars
  const lcpProgress = Math.max(0, Math.min(100, (1 - coreWebVitals.lcp.value / 5) * 100));
  const clsProgress = Math.max(0, Math.min(100, (1 - coreWebVitals.cls.value / 0.5) * 100));
  const inpProgress = Math.max(0, Math.min(100, (1 - coreWebVitals.inp.value / 1000) * 100));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Zap className="w-6 h-6 mr-2 text-blue-600" />
          핵심 웹 바이탈 (Core Web Vitals)
        </CardTitle>
        <p className="text-sm text-gray-600">
          구글이 정의한 사용자 경험의 핵심 지표들입니다. 이 점수들은 검색 순위에도 영향을 줍니다.
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LCP */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">LCP</h3>
                  <p className="text-xs text-gray-500">Largest Contentful Paint</p>
                </div>
              </div>
              {getScoreIcon(coreWebVitals.lcp.score)}
            </div>
            
            <div className="text-center space-y-2">
              <div className={`text-4xl font-bold ${getScoreColor(coreWebVitals.lcp.score)}`}>
                {coreWebVitals.lcp.value.toFixed(1)}초
              </div>
              <Badge variant="outline" className={getScoreBadge(coreWebVitals.lcp.score)}>
                {getScoreText(coreWebVitals.lcp.score)}
              </Badge>
            </div>

            <Progress value={lcpProgress} className="h-2" />
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">가장 큰 콘텐츠 로딩 시간</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                {getLCPDescription(coreWebVitals.lcp.value)}
              </p>
              <div className="bg-gray-50 p-2 rounded text-xs text-gray-600">
                <strong>목표:</strong> 2.5초 이내 (우수), 4.0초 이내 (개선 필요)
              </div>
            </div>
          </div>

          {/* CLS */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <LayoutGrid className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">CLS</h3>
                  <p className="text-xs text-gray-500">Cumulative Layout Shift</p>
                </div>
              </div>
              {getScoreIcon(coreWebVitals.cls.score)}
            </div>
            
            <div className="text-center space-y-2">
              <div className={`text-4xl font-bold ${getScoreColor(coreWebVitals.cls.score)}`}>
                {coreWebVitals.cls.value.toFixed(3)}
              </div>
              <Badge variant="outline" className={getScoreBadge(coreWebVitals.cls.score)}>
                {getScoreText(coreWebVitals.cls.score)}
              </Badge>
            </div>

            <Progress value={clsProgress} className="h-2" />
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">레이아웃 안정성</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                {getCLSDescription(coreWebVitals.cls.value)}
              </p>
              <div className="bg-gray-50 p-2 rounded text-xs text-gray-600">
                <strong>목표:</strong> 0.1 이하 (우수), 0.25 이하 (개선 필요)
              </div>
            </div>
          </div>

          {/* INP */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">INP</h3>
                  <p className="text-xs text-gray-500">Interaction to Next Paint</p>
                </div>
              </div>
              {getScoreIcon(coreWebVitals.inp.score)}
            </div>
            
            <div className="text-center space-y-2">
              <div className={`text-4xl font-bold ${getScoreColor(coreWebVitals.inp.score)}`}>
                {coreWebVitals.inp.value}ms
              </div>
              <Badge variant="outline" className={getScoreBadge(coreWebVitals.inp.score)}>
                {getScoreText(coreWebVitals.inp.score)}
              </Badge>
            </div>

            <Progress value={inpProgress} className="h-2" />
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">상호작용 반응성</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                {getINPDescription(coreWebVitals.inp.value)}
              </p>
              <div className="bg-gray-50 p-2 rounded text-xs text-gray-600">
                <strong>목표:</strong> 200ms 이하 (우수), 500ms 이하 (개선 필요)
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <h4 className="font-medium text-blue-800">핵심 웹 바이탈이 중요한 이유</h4>
              <p className="text-sm text-blue-700 leading-relaxed">
                이 지표들은 실제 사용자가 느끼는 웹사이트 경험을 수치화한 것입니다. 
                구글은 이 점수들을 검색 순위 결정에 반영하므로, 좋은 점수는 더 많은 방문자 유입으로 이어집니다.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}