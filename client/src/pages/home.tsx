import { useState } from "react";
import { UrlInputForm } from "@/components/url-input-form";
import { WebsitePreview } from "@/components/website-preview";
import { AnalysisLoading } from "@/components/analysis-loading";
import { AnalysisResults } from "@/components/analysis-results";
import { FeaturesSection } from "@/components/features-section";
import { Footer } from "@/components/footer";
import { AnalysisReport } from "@/lib/types";
import { Smartphone, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [analysisReport, setAnalysisReport] = useState<AnalysisReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);

  const handleAnalysisComplete = (report: AnalysisReport) => {
    setAnalysisReport(report);
    setIsLoading(false);
    setError(null);
    setShowPreview(false);
  };

  const handleAnalysisStart = () => {
    setIsLoading(true);
    setError(null);
    setAnalysisReport(null);
    setShowPreview(false);
  };

  const handleAnalysisError = (errorMessage: string) => {
    setError(errorMessage);
    setIsLoading(false);
    setAnalysisReport(null);
    setShowPreview(false);
  };

  const handleUrlSubmit = (url: string) => {
    setCurrentUrl(url);
    setShowPreview(true);
    setError(null);
    setAnalysisReport(null);
  };

  const handlePreviewConfirm = () => {
    setShowPreview(false);
    handleAnalysisStart();
    // Trigger actual analysis
    const event = new CustomEvent('startAnalysis', { detail: { url: currentUrl } });
    window.dispatchEvent(event);
  };

  const handlePreviewCancel = () => {
    setShowPreview(false);
    setCurrentUrl("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Smartphone className="text-primary text-2xl mr-3" />
              <h1 className="text-xl font-bold text-gray-900">모바일 친화성 테스트</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">가이드</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">FAQ</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">문의</a>
            </nav>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-blue-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            웹사이트 모바일 최적화 진단
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            URL만 입력하면 모바일 친화성을 자동 분석하여<br />
            점수와 개선 가이드를 제공합니다
          </p>
          
          <div className="max-w-2xl mx-auto">
            <UrlInputForm 
              onUrlSubmit={handleUrlSubmit}
              onAnalysisStart={handleAnalysisStart}
              onAnalysisComplete={handleAnalysisComplete}
              onAnalysisError={handleAnalysisError}
              currentUrl={currentUrl}
              showPreview={showPreview}
            />
            <p className="text-sm text-blue-100 mt-4">
              <span className="inline-block w-1 h-1 rounded-full bg-blue-100 mr-2"></span>
              실제 Lighthouse 분석 (30-60초 소요)
            </p>
          </div>
        </div>
      </section>

      {/* Website Preview */}
      {showPreview && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <WebsitePreview 
              url={currentUrl}
              onConfirm={handlePreviewConfirm}
              onCancel={handlePreviewCancel}
            />
          </div>
        </section>
      )}

      {/* Analysis Results */}
      {isLoading && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <AnalysisLoading />
          </div>
        </section>
      )}

      {error && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-red-800 mb-2">분석 실패</h3>
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        </section>
      )}

      {analysisReport && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <AnalysisResults report={analysisReport} />
          </div>
        </section>
      )}

      {/* Features Section */}
      <FeaturesSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
