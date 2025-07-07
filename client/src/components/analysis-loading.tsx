import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

export function AnalysisLoading() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("URL 검증 중...");
  
  useEffect(() => {
    const steps = [
      { progress: 20, text: "URL 검증 중..." },
      { progress: 40, text: "모바일 뷰포트 분석..." },
      { progress: 60, text: "터치 요소 검사..." },
      { progress: 80, text: "성능 측정..." },
      { progress: 95, text: "결과 생성 중..." }
    ];
    
    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        setProgress(steps[stepIndex].progress);
        setCurrentStep(steps[stepIndex].text);
        stepIndex++;
      } else {
        clearInterval(interval);
      }
    }, 800);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="pt-8">
          <div className="text-center mb-8">
            <div className="text-2xl font-bold mb-2">웹사이트 분석 중</div>
            <p className="text-gray-600 mb-6">모바일 친화성을 종합적으로 분석하고 있습니다</p>
            
            <div className="max-w-md mx-auto mb-4">
              <Progress value={progress} className="h-2" />
            </div>
            
            <p className="text-sm text-blue-600 font-medium">{currentStep}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-40 h-40 rounded-full bg-gray-100 mb-4">
                <div className="animate-pulse w-32 h-32 rounded-full bg-gray-200"></div>
              </div>
              <Skeleton className="h-6 w-32 mx-auto mb-2" />
              <Skeleton className="h-4 w-48 mx-auto" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="text-center p-4 bg-gray-50 rounded-lg">
                  <Skeleton className="h-8 w-16 mx-auto mb-2" />
                  <Skeleton className="h-4 w-20 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Skeleton className="w-8 h-8 rounded mr-3" />
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-6 w-16 ml-auto rounded-full" />
              </div>
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
