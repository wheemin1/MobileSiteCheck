import { Card, CardContent } from "@/components/ui/card";
import { AnalysisReport } from "@/lib/types";

interface OverallScoreProps {
  report: AnalysisReport;
}

export function OverallScore({ report }: OverallScoreProps) {
  const getScoreStatus = (score: number) => {
    if (score >= 90) return { text: "모바일 최적화 우수", color: "text-green-600" };
    if (score >= 70) return { text: "모바일 최적화 양호", color: "text-yellow-600" };
    return { text: "모바일 최적화 개선 필요", color: "text-red-600" };
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "from-green-500 to-green-400";
    if (score >= 70) return "from-yellow-500 to-yellow-400";
    return "from-red-500 to-red-400";
  };

  const status = getScoreStatus(report.overallScore);
  const scoreColor = getScoreColor(report.overallScore);

  return (
    <Card className="shadow-lg">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">분석 결과</h3>
          <p className="text-gray-600">{report.url}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center">
            <div className={`relative inline-flex items-center justify-center w-40 h-40 rounded-full bg-gradient-to-br ${scoreColor} mb-4`}>
              <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-800">{report.overallScore}</span>
              </div>
            </div>
            <h4 className={`text-xl font-semibold ${status.color}`}>{status.text}</h4>
            <p className="text-gray-600 mt-2">
              {report.overallScore >= 90 
                ? "귀하의 웹사이트는 모바일에서 잘 작동합니다"
                : report.overallScore >= 70
                ? "일부 개선이 필요합니다"
                : "모바일 최적화가 필요합니다"
              }
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`text-2xl font-bold ${report.performanceScore >= 90 ? 'text-green-600' : report.performanceScore >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                {report.performanceScore}
              </div>
              <div className="text-sm text-gray-600">성능 점수</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`text-2xl font-bold ${report.accessibilityScore >= 90 ? 'text-green-600' : report.accessibilityScore >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                {report.accessibilityScore}
              </div>
              <div className="text-sm text-gray-600">접근성 점수</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`text-2xl font-bold ${report.bestPracticesScore >= 90 ? 'text-green-600' : report.bestPracticesScore >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                {report.bestPracticesScore}
              </div>
              <div className="text-sm text-gray-600">모범 사례 점수</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`text-2xl font-bold ${report.seoScore >= 90 ? 'text-green-600' : report.seoScore >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                {report.seoScore}
              </div>
              <div className="text-sm text-gray-600">SEO 점수</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
