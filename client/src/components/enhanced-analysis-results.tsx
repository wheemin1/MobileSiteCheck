import { AnalysisReport } from "@/lib/types";
import { OverallScore } from "./overall-score";
import { DetailedAnalysis } from "./detailed-analysis";
import { EnhancedCoreWebVitals } from "./enhanced-core-web-vitals";
import { EnhancedImprovementGuide } from "./enhanced-improvement-guide";
import { ReportDownload } from "./report-download";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, XCircle, Eye, Clock, Zap, Smartphone, Users, Search, Target, Gauge, Shield } from "lucide-react";

interface EnhancedAnalysisResultsProps {
  report: AnalysisReport;
}

function getScoreIcon(score: number) {
  if (score >= 90) return <CheckCircle className="w-5 h-5 text-green-600" />;
  if (score >= 50) return <AlertTriangle className="w-5 h-5 text-orange-500" />;
  return <XCircle className="w-5 h-5 text-red-500" />;
}

function getScoreBadge(score: number) {
  if (score >= 90) return "bg-green-100 text-green-800 border-green-300";
  if (score >= 50) return "bg-orange-100 text-orange-800 border-orange-300";
  return "bg-red-100 text-red-800 border-red-300";
}

function getScoreDescription(score: number) {
  if (score >= 90) return "매우 좋음";
  if (score >= 50) return "개선 필요";
  return "즉시 개선 필요";
}

function getScoreColor(score: number) {
  if (score >= 90) return "text-green-600";
  if (score >= 50) return "text-orange-500";
  return "text-red-500";
}

function getProgressColor(score: number) {
  if (score >= 90) return "bg-green-500";
  if (score >= 50) return "bg-orange-500";
  return "bg-red-500";
}

export function EnhancedAnalysisResults({ report }: EnhancedAnalysisResultsProps) {
  return (
    <div className="space-y-8">
      <OverallScore report={report} />
      
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-12">
          <TabsTrigger value="summary" className="text-sm">
            <Gauge className="w-4 h-4 mr-2" />
            종합 점수
          </TabsTrigger>
          <TabsTrigger value="performance" className="text-sm">
            <Zap className="w-4 h-4 mr-2" />
            성능 분석
          </TabsTrigger>
          <TabsTrigger value="mobile" className="text-sm">
            <Smartphone className="w-4 h-4 mr-2" />
            모바일 최적화
          </TabsTrigger>
          <TabsTrigger value="improvements" className="text-sm">
            <Target className="w-4 h-4 mr-2" />
            개선 가이드
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">성능 점수</CardTitle>
                    <p className="text-sm text-gray-500">로딩 속도와 응답성</p>
                  </div>
                </div>
                {getScoreIcon(report.performanceScore)}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-4xl font-bold ${getScoreColor(report.performanceScore)}`}>
                    {report.performanceScore}
                  </span>
                  <Badge variant="outline" className={getScoreBadge(report.performanceScore)}>
                    {getScoreDescription(report.performanceScore)}
                  </Badge>
                </div>
                <Progress value={report.performanceScore} className="h-3" />
                <p className="text-sm text-gray-600 leading-relaxed">
                  웹사이트 로딩 속도와 응답성을 측정합니다. 빠른 속도는 사용자 경험과 검색 순위에 직접 영향을 줍니다. 
                  특히 모바일에서는 3초 이내 로딩이 중요합니다.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
              <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">접근성 점수</CardTitle>
                    <p className="text-sm text-gray-500">모든 사용자를 위한 설계</p>
                  </div>
                </div>
                {getScoreIcon(report.accessibilityScore)}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-4xl font-bold ${getScoreColor(report.accessibilityScore)}`}>
                    {report.accessibilityScore}
                  </span>
                  <Badge variant="outline" className={getScoreBadge(report.accessibilityScore)}>
                    {getScoreDescription(report.accessibilityScore)}
                  </Badge>
                </div>
                <Progress value={report.accessibilityScore} className="h-3" />
                <p className="text-sm text-gray-600 leading-relaxed">
                  시각장애인이나 신체장애인도 쉽게 사용할 수 있는지 확인합니다. 
                  스크린 리더 호환성, 색상 대비, 키보드 탐색 등을 평가합니다.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
              <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">모범 사례</CardTitle>
                    <p className="text-sm text-gray-500">보안과 웹 표준</p>
                  </div>
                </div>
                {getScoreIcon(report.bestPracticesScore)}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-4xl font-bold ${getScoreColor(report.bestPracticesScore)}`}>
                    {report.bestPracticesScore}
                  </span>
                  <Badge variant="outline" className={getScoreBadge(report.bestPracticesScore)}>
                    {getScoreDescription(report.bestPracticesScore)}
                  </Badge>
                </div>
                <Progress value={report.bestPracticesScore} className="h-3" />
                <p className="text-sm text-gray-600 leading-relaxed">
                  웹 보안과 개발 표준을 얼마나 잘 지키고 있는지 평가합니다. 
                  HTTPS 사용, 안전한 라이브러리, 최신 기술 적용 등을 확인합니다.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600"></div>
              <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Search className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">SEO 점수</CardTitle>
                    <p className="text-sm text-gray-500">검색엔진 최적화</p>
                  </div>
                </div>
                {getScoreIcon(report.seoScore)}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-4xl font-bold ${getScoreColor(report.seoScore)}`}>
                    {report.seoScore}
                  </span>
                  <Badge variant="outline" className={getScoreBadge(report.seoScore)}>
                    {getScoreDescription(report.seoScore)}
                  </Badge>
                </div>
                <Progress value={report.seoScore} className="h-3" />
                <p className="text-sm text-gray-600 leading-relaxed">
                  구글이나 네이버 같은 검색엔진에서 얼마나 잘 검색되는지 측정합니다. 
                  메타 태그, 제목, 설명문, 구조화된 데이터 등을 평가합니다.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Insights */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <Eye className="w-5 h-5 mr-2" />
                빠른 인사이트
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="text-2xl font-bold text-gray-900">{report.overallScore}</div>
                  <div className="text-sm text-gray-600">종합 점수</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="text-2xl font-bold text-blue-600">{report.coreWebVitals.lcp.value.toFixed(1)}s</div>
                  <div className="text-sm text-gray-600">로딩 시간</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="text-2xl font-bold text-green-600">
                    {[report.mobileViewport, report.touchElements, report.textSize, report.contentWidth]
                      .filter(item => item.passed).length}/4
                  </div>
                  <div className="text-sm text-gray-600">모바일 요소 통과</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="mt-6">
          <EnhancedCoreWebVitals report={report} />
        </TabsContent>
        
        <TabsContent value="mobile" className="mt-6">
          <DetailedAnalysis report={report} />
        </TabsContent>
        
        <TabsContent value="improvements" className="mt-6">
          <EnhancedImprovementGuide report={report} />
        </TabsContent>
      </Tabs>
      
      <ReportDownload report={report} />
    </div>
  );
}