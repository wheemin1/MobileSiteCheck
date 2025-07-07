import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnalysisReport } from "@/lib/types";
import { Smartphone, Hand, Type, ArrowLeftRight, CheckCircle, AlertTriangle } from "lucide-react";

interface DetailedAnalysisProps {
  report: AnalysisReport;
}

export function DetailedAnalysis({ report }: DetailedAnalysisProps) {
  const getStatusBadge = (passed: boolean) => {
    return passed ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">통과</Badge>
    ) : (
      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">개선 필요</Badge>
    );
  };

  const getStatusIcon = (passed: boolean) => {
    return passed ? (
      <CheckCircle className="w-5 h-5 text-green-600" />
    ) : (
      <AlertTriangle className="w-5 h-5 text-yellow-600" />
    );
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Mobile Viewport */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <Smartphone className="text-green-600 text-xl mr-3" />
            <h4 className="text-lg font-semibold">모바일 뷰포트 설정</h4>
            <div className="ml-auto">{getStatusBadge(report.mobileViewport.passed)}</div>
          </div>
          <p className="text-gray-600 mb-4">
            {report.mobileViewport.passed 
              ? "모바일 기기에서 올바른 크기로 표시됩니다"
              : "모바일 뷰포트 설정이 필요합니다"
            }
          </p>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center text-sm text-gray-700">
              {getStatusIcon(report.mobileViewport.passed)}
              <span className="ml-2">
                {report.mobileViewport.passed 
                  ? "viewport 메타태그가 올바르게 설정되었습니다"
                  : "viewport 메타태그 설정이 필요합니다"
                }
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Touch Elements */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <Hand className="text-green-600 text-xl mr-3" />
            <h4 className="text-lg font-semibold">터치 요소 간격</h4>
            <div className="ml-auto">{getStatusBadge(report.touchElements.passed)}</div>
          </div>
          <p className="text-gray-600 mb-4">
            {report.touchElements.passed
              ? "터치 가능한 요소들 간의 간격이 적절합니다"
              : "터치 요소 간격 개선이 필요합니다"
            }
          </p>
          <div className="flex items-center text-sm text-gray-600">
            {getStatusIcon(report.touchElements.passed)}
            <span className="ml-2">
              {report.touchElements.passed 
                ? "최소 44px 간격 준수"
                : "터치 타겟 크기 및 간격 조정 필요"
              }
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Text Size */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <Type className={`text-xl mr-3 ${report.textSize.passed ? 'text-green-600' : 'text-yellow-600'}`} />
            <h4 className="text-lg font-semibold">글자 크기</h4>
            <div className="ml-auto">{getStatusBadge(report.textSize.passed)}</div>
          </div>
          <p className="text-gray-600 mb-4">
            {report.textSize.passed
              ? "모바일에서 읽기 좋은 글자 크기입니다"
              : "일부 텍스트가 모바일에서 너무 작을 수 있습니다"
            }
          </p>
          <div className="space-y-2">
            {report.textSize.passed ? (
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                모든 텍스트가 읽기 좋은 크기입니다
              </div>
            ) : (
              <>
                <div className="flex items-center text-sm text-gray-600">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
                  일부 텍스트가 12px 이하로 작습니다
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mr-2 flex items-center justify-center">
                    <span className="text-white text-xs">!</span>
                  </div>
                  권장: 16px 이상 사용
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Content Width */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <ArrowLeftRight className="text-green-600 text-xl mr-3" />
            <h4 className="text-lg font-semibold">콘텐츠 폭</h4>
            <div className="ml-auto">{getStatusBadge(report.contentWidth.passed)}</div>
          </div>
          <p className="text-gray-600 mb-4">
            {report.contentWidth.passed
              ? "모바일에서 가로 스크롤 없이 콘텐츠가 표시됩니다"
              : "모바일에서 가로 스크롤이 발생합니다"
            }
          </p>
          <div className="flex items-center text-sm text-gray-600">
            {getStatusIcon(report.contentWidth.passed)}
            <span className="ml-2">
              {report.contentWidth.passed 
                ? "320px 기준 수평 스크롤 없음"
                : "콘텐츠 폭 조정 필요"
              }
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
