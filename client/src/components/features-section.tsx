import { Card, CardContent } from "@/components/ui/card";
import { Search, Users, TrendingUp } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">왜 모바일 최적화가 중요한가요?</h3>
          <p className="text-xl text-gray-600">모바일 사용자가 전체 웹 트래픽의 60% 이상을 차지합니다</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center shadow-lg">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-white text-2xl" />
              </div>
              <h4 className="text-xl font-semibold mb-2">SEO 향상</h4>
              <p className="text-gray-600">구글은 모바일 친화적인 사이트를 더 높게 평가합니다</p>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-lg">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white text-2xl" />
              </div>
              <h4 className="text-xl font-semibold mb-2">사용자 경험</h4>
              <p className="text-gray-600">모바일 최적화로 이탈률을 크게 줄일 수 있습니다</p>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-lg">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-white text-2xl" />
              </div>
              <h4 className="text-xl font-semibold mb-2">전환율 증가</h4>
              <p className="text-gray-600">빠른 로딩과 사용하기 쉬운 인터페이스로 매출 향상</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
