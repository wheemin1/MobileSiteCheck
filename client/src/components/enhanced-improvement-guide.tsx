import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { AnalysisReport } from "@/lib/types";
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Target, 
  Zap, 
  Smartphone, 
  Image, 
  Code, 
  Server, 
  Search,
  ArrowRight,
  Lightbulb,
  Clock,
  FileText,
  Gauge
} from "lucide-react";

interface EnhancedImprovementGuideProps {
  report: AnalysisReport;
}

export function EnhancedImprovementGuide({ report }: EnhancedImprovementGuideProps) {
  // Generate comprehensive improvement recommendations
  const getPerformanceRecommendations = () => {
    const recommendations = [];
    
    if (report.performanceScore < 50) {
      recommendations.push({
        priority: "high",
        title: "이미지 최적화 (즉시 개선)",
        description: "이미지 파일 크기를 줄여 로딩 속도를 개선하세요.",
        solutions: [
          "이미지를 WebP 형식으로 변환하여 30-50% 용량 절약",
          "이미지 크기를 실제 표시 크기에 맞게 조정",
          "압축 도구를 사용하여 품질 손실 없이 용량 줄이기",
          "중요하지 않은 이미지는 지연 로딩(lazy loading) 적용"
        ],
        impact: "페이지 로딩 시간 30-50% 단축",
        effort: "쉬움"
      });
      
      recommendations.push({
        priority: "high",
        title: "JavaScript 최적화",
        description: "불필요한 JavaScript 코드를 제거하고 압축하세요.",
        solutions: [
          "사용하지 않는 JavaScript 라이브러리 제거",
          "JavaScript 파일을 압축(minify)하여 크기 줄이기",
          "중요하지 않은 스크립트는 페이지 로딩 후 실행",
          "외부 스크립트는 필요한 경우에만 로드"
        ],
        impact: "페이지 응답 시간 20-40% 개선",
        effort: "보통"
      });
    }
    
    if (report.performanceScore < 70) {
      recommendations.push({
        priority: "medium",
        title: "서버 응답 시간 개선",
        description: "웹 서버의 응답 속도를 빠르게 만드세요.",
        solutions: [
          "CDN(Content Delivery Network) 사용으로 전 세계 빠른 접속",
          "브라우저 캐시 설정으로 재방문 시 빠른 로딩",
          "불필요한 플러그인이나 확장 기능 제거",
          "데이터베이스 쿼리 최적화"
        ],
        impact: "초기 로딩 시간 15-30% 단축",
        effort: "어려움"
      });
    }
    
    return recommendations;
  };

  const getMobileRecommendations = () => {
    const recommendations = [];
    
    if (!report.mobileViewport.passed) {
      recommendations.push({
        priority: "high",
        title: "모바일 뷰포트 설정",
        description: "모바일 화면에 맞게 표시되도록 설정하세요.",
        solutions: [
          "HTML 헤드에 viewport 메타 태그 추가",
          '<meta name="viewport" content="width=device-width, initial-scale=1">',
          "모바일에서 가로 스크롤이 생기지 않도록 조정",
          "반응형 CSS 적용으로 다양한 화면 크기 대응"
        ],
        impact: "모바일 사용자 경험 대폭 개선",
        effort: "쉬움"
      });
    }
    
    if (!report.touchElements.passed) {
      recommendations.push({
        priority: "high",
        title: "터치 요소 크기 조정",
        description: "버튼과 링크를 손가락으로 쉽게 누를 수 있게 만드세요.",
        solutions: [
          "모든 버튼과 링크 크기를 최소 48px 이상으로 설정",
          "터치 요소 간 간격을 최소 8px 이상 유지",
          "작은 텍스트 링크는 패딩을 추가하여 터치 영역 확대",
          "메뉴나 네비게이션 버튼을 모바일에 맞게 재배치"
        ],
        impact: "모바일 사용 편의성 크게 향상",
        effort: "보통"
      });
    }
    
    if (!report.textSize.passed) {
      recommendations.push({
        priority: "medium",
        title: "텍스트 크기 조정",
        description: "모바일에서 텍스트를 읽기 쉽게 만드세요.",
        solutions: [
          "기본 텍스트 크기를 최소 16px 이상으로 설정",
          "중요한 제목은 18px 이상의 큰 크기 사용",
          "작은 화면에서도 읽기 편한 폰트 선택",
          "텍스트와 배경 색상의 대비를 높여 가독성 향상"
        ],
        impact: "모바일 가독성 향상",
        effort: "쉬움"
      });
    }
    
    return recommendations;
  };

  const getSEORecommendations = () => {
    const recommendations = [];
    
    if (report.seoScore < 70) {
      recommendations.push({
        priority: "high",
        title: "메타 태그 최적화",
        description: "검색엔진이 웹사이트를 잘 이해할 수 있게 하세요.",
        solutions: [
          "각 페이지마다 고유한 제목(title) 태그 작성",
          "페이지 내용을 요약하는 description 메타 태그 추가",
          "주요 키워드를 자연스럽게 제목과 설명에 포함",
          "소셜 미디어 공유를 위한 Open Graph 태그 추가"
        ],
        impact: "검색 결과 노출 향상",
        effort: "쉬움"
      });
      
      recommendations.push({
        priority: "medium",
        title: "콘텐츠 구조 개선",
        description: "검색엔진이 콘텐츠를 잘 읽을 수 있게 구조화하세요.",
        solutions: [
          "H1, H2, H3 태그를 사용하여 제목 구조 정리",
          "이미지에 alt 속성 추가로 설명 제공",
          "내부 링크를 통해 관련 페이지 연결",
          "사이트맵 XML 파일 생성 및 제출"
        ],
        impact: "검색 순위 상승",
        effort: "보통"
      });
    }
    
    return recommendations;
  };

  const getAccessibilityRecommendations = () => {
    const recommendations = [];
    
    if (report.accessibilityScore < 70) {
      recommendations.push({
        priority: "high",
        title: "색상 대비 개선",
        description: "텍스트와 배경의 색상 대비를 높여 읽기 쉽게 만드세요.",
        solutions: [
          "텍스트와 배경 색상의 대비율을 4.5:1 이상으로 설정",
          "중요한 정보는 색상뿐만 아니라 텍스트나 아이콘으로도 표현",
          "링크는 밑줄이나 다른 방법으로 구분 표시",
          "온라인 색상 대비 검사 도구 사용하여 확인"
        ],
        impact: "시각적 접근성 크게 향상",
        effort: "쉬움"
      });
      
      recommendations.push({
        priority: "medium",
        title: "키보드 탐색 지원",
        description: "마우스 없이도 웹사이트를 사용할 수 있게 하세요.",
        solutions: [
          "모든 버튼과 링크가 탭 키로 접근 가능하도록 설정",
          "현재 선택된 요소가 명확히 표시되도록 focus 스타일 적용",
          "논리적인 순서로 탭 이동이 가능하도록 구조 조정",
          "스크린 리더 사용자를 위한 텍스트 설명 추가"
        ],
        impact: "장애인 사용자 접근성 개선",
        effort: "보통"
      });
    }
    
    return recommendations;
  };

  const allRecommendations = [
    ...getPerformanceRecommendations(),
    ...getMobileRecommendations(),
    ...getSEORecommendations(),
    ...getAccessibilityRecommendations()
  ];

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high": return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "medium": return <Clock className="w-4 h-4 text-orange-500" />;
      case "low": return <Lightbulb className="w-4 h-4 text-blue-500" />;
      default: return <Target className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-300";
      case "medium": return "bg-orange-100 text-orange-800 border-orange-300";
      case "low": return "bg-blue-100 text-blue-800 border-blue-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high": return "즉시 개선";
      case "medium": return "중요함";
      case "low": return "권장사항";
      default: return "일반";
    }
  };

  const highPriorityItems = allRecommendations.filter(r => r.priority === "high");
  const mediumPriorityItems = allRecommendations.filter(r => r.priority === "medium");
  const lowPriorityItems = allRecommendations.filter(r => r.priority === "low");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-6 h-6 mr-2 text-blue-600" />
            개선 가이드
          </CardTitle>
          <p className="text-sm text-gray-600">
            웹사이트를 더 빠르고 사용하기 쉽게 만들기 위한 구체적인 개선 방안을 제시합니다.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="text-2xl font-bold text-red-600">{highPriorityItems.length}</div>
              <div className="text-sm text-red-700">즉시 개선 필요</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="text-2xl font-bold text-orange-600">{mediumPriorityItems.length}</div>
              <div className="text-sm text-orange-700">중요한 개선사항</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{lowPriorityItems.length}</div>
              <div className="text-sm text-blue-700">권장 개선사항</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* High Priority Recommendations */}
      {highPriorityItems.length > 0 && (
        <Card className="border-red-200">
          <CardHeader className="bg-red-50">
            <CardTitle className="text-red-800 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              즉시 개선 필요 ({highPriorityItems.length}개)
            </CardTitle>
            <p className="text-sm text-red-700">
              이 항목들을 우선적으로 개선하면 사용자 경험이 크게 향상됩니다.
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              {highPriorityItems.map((item, index) => (
                <AccordionItem key={index} value={`high-${index}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full mr-4">
                      <div className="flex items-center space-x-3">
                        {getPriorityIcon(item.priority)}
                        <span className="font-medium text-left">{item.title}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={getPriorityBadge(item.priority)}>
                          {getPriorityText(item.priority)}
                        </Badge>
                        <Badge variant="outline" className="bg-gray-100 text-gray-600">
                          {item.effort}
                        </Badge>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="space-y-4">
                      <p className="text-gray-700">{item.description}</p>
                      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                        <div className="text-sm font-medium text-green-800 mb-1">예상 효과</div>
                        <div className="text-sm text-green-700">{item.impact}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-800 mb-2">구체적인 실행 방법</div>
                        <ul className="space-y-2">
                          {item.solutions.map((solution, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <ArrowRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{solution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}

      {/* Medium Priority Recommendations */}
      {mediumPriorityItems.length > 0 && (
        <Card className="border-orange-200">
          <CardHeader className="bg-orange-50">
            <CardTitle className="text-orange-800 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              중요한 개선사항 ({mediumPriorityItems.length}개)
            </CardTitle>
            <p className="text-sm text-orange-700">
              시간이 있을 때 개선하면 더 나은 웹사이트가 됩니다.
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              {mediumPriorityItems.map((item, index) => (
                <AccordionItem key={index} value={`medium-${index}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full mr-4">
                      <div className="flex items-center space-x-3">
                        {getPriorityIcon(item.priority)}
                        <span className="font-medium text-left">{item.title}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={getPriorityBadge(item.priority)}>
                          {getPriorityText(item.priority)}
                        </Badge>
                        <Badge variant="outline" className="bg-gray-100 text-gray-600">
                          {item.effort}
                        </Badge>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="space-y-4">
                      <p className="text-gray-700">{item.description}</p>
                      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                        <div className="text-sm font-medium text-green-800 mb-1">예상 효과</div>
                        <div className="text-sm text-green-700">{item.impact}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-800 mb-2">구체적인 실행 방법</div>
                        <ul className="space-y-2">
                          {item.solutions.map((solution, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <ArrowRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{solution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}

      {/* Low Priority Recommendations */}
      {lowPriorityItems.length > 0 && (
        <Card className="border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-blue-800 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2" />
              권장 개선사항 ({lowPriorityItems.length}개)
            </CardTitle>
            <p className="text-sm text-blue-700">
              완벽한 웹사이트를 위한 추가 개선 방안입니다.
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              {lowPriorityItems.map((item, index) => (
                <AccordionItem key={index} value={`low-${index}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full mr-4">
                      <div className="flex items-center space-x-3">
                        {getPriorityIcon(item.priority)}
                        <span className="font-medium text-left">{item.title}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={getPriorityBadge(item.priority)}>
                          {getPriorityText(item.priority)}
                        </Badge>
                        <Badge variant="outline" className="bg-gray-100 text-gray-600">
                          {item.effort}
                        </Badge>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="space-y-4">
                      <p className="text-gray-700">{item.description}</p>
                      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                        <div className="text-sm font-medium text-green-800 mb-1">예상 효과</div>
                        <div className="text-sm text-green-700">{item.impact}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-800 mb-2">구체적인 실행 방법</div>
                        <ul className="space-y-2">
                          {item.solutions.map((solution, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <ArrowRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{solution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}

      {/* Overall Advice */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center">
            <Gauge className="w-5 h-5 mr-2" />
            개선 우선순위 가이드
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-lg font-semibold text-red-600">1단계</div>
                <div className="text-sm text-gray-600">즉시 개선 필요 항목부터</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-lg font-semibold text-orange-600">2단계</div>
                <div className="text-sm text-gray-600">중요한 개선사항 진행</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-lg font-semibold text-blue-600">3단계</div>
                <div className="text-sm text-gray-600">권장사항으로 완성도 높이기</div>
              </div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-sm text-gray-700">
                💡 <strong>팁:</strong> 한 번에 모든 것을 고치려 하지 말고, 
                높은 우선순위 항목부터 차근차근 개선해보세요. 
                각 개선사항을 적용한 후에는 다시 분석하여 효과를 확인하는 것이 좋습니다.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}