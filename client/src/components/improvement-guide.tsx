import { Card, CardContent } from "@/components/ui/card";
import { AnalysisReport, Recommendation } from "@/lib/types";
import { Lightbulb, Wrench, CheckCircle, Code } from "lucide-react";

interface ImprovementGuideProps {
  report: AnalysisReport;
}

export function ImprovementGuide({ report }: ImprovementGuideProps) {
  const getBorderColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-red-500";
      case "medium": return "border-yellow-500";
      case "low": return "border-green-500";
      default: return "border-gray-300";
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "viewport":
      case "content-width":
        return <Wrench className="text-primary mr-3 mt-1" />;
      case "font-size":
      case "touch-targets":
        return <Code className="text-primary mr-3 mt-1" />;
      default:
        return <Wrench className="text-primary mr-3 mt-1" />;
    }
  };

  // Filter out recommendations that are already good
  const needsImprovement = report.recommendations.filter(rec => rec.priority !== "low");
  const goodPractices = report.recommendations.filter(rec => rec.priority === "low");

  return (
    <Card className="shadow-lg">
      <CardContent className="p-8">
        <h4 className="text-xl font-semibold mb-6 flex items-center">
          <Lightbulb className="text-yellow-500 mr-3" />
          개선 가이드
        </h4>
        
        <div className="space-y-6">
          {needsImprovement.map((recommendation, index) => (
            <div key={index} className={`border-l-4 ${getBorderColor(recommendation.priority)} pl-6`}>
              <h5 className="font-semibold text-gray-900 mb-2">{recommendation.title}</h5>
              <p className="text-gray-600 mb-3">{recommendation.description}</p>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start">
                  {getIcon(recommendation.type)}
                  <div>
                    <div className="font-medium text-gray-900 mb-1">권장 해결책:</div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {recommendation.solutions.map((solution, solutionIndex) => (
                        <li key={solutionIndex} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {goodPractices.length > 0 && (
            <div className="border-l-4 border-green-500 pl-6">
              <h5 className="font-semibold text-gray-900 mb-2">잘 구현된 부분</h5>
              <p className="text-gray-600 mb-3">
                다음 요소들이 잘 구현되어 있습니다. 계속 유지하세요!
              </p>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-start">
                  <CheckCircle className="text-green-600 mr-3 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900 mb-1">현재 잘 구현된 사항:</div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {report.mobileViewport.passed && (
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          반응형 viewport 메타태그
                        </li>
                      )}
                      {report.touchElements.passed && (
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          적절한 터치 타겟 크기
                        </li>
                      )}
                      {report.contentWidth.passed && (
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          콘텐츠 폭 최적화
                        </li>
                      )}
                      {report.textSize.passed && (
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          적절한 글자 크기
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
