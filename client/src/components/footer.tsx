import { Smartphone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Smartphone className="text-primary text-2xl mr-3" />
              <h5 className="text-xl font-semibold">모바일 친화성 테스트</h5>
            </div>
            <p className="text-gray-400">
              누구나 쉽게 사용할 수 있는 모바일 최적화 진단 도구
            </p>
          </div>
          
          <div>
            <h6 className="font-semibold mb-4">서비스</h6>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">모바일 테스트</a></li>
              <li><a href="#" className="hover:text-white transition-colors">성능 분석</a></li>
              <li><a href="#" className="hover:text-white transition-colors">SEO 검사</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API 문서</a></li>
            </ul>
          </div>
          
          <div>
            <h6 className="font-semibold mb-4">지원</h6>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">사용 가이드</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">문의하기</a></li>
              <li><a href="#" className="hover:text-white transition-colors">피드백</a></li>
            </ul>
          </div>
          
          <div>
            <h6 className="font-semibold mb-4">연락처</h6>
            <ul className="space-y-2 text-gray-400">
              <li>이메일: help@mobilefriendly.kr</li>
              <li>전화: 1588-0000</li>
              <li>평일 09:00 - 18:00</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 모바일 친화성 테스트. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
