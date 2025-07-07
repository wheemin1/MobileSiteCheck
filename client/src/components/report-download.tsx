import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnalysisReport } from "@/lib/types";
import { FileText, Image, Share2, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReportDownloadProps {
  report: AnalysisReport;
}

export function ReportDownload({ report }: ReportDownloadProps) {
  const { toast } = useToast();

  const handlePDFDownload = async () => {
    try {
      const response = await fetch(`/api/reports/${report.id}/pdf`);
      if (!response.ok) throw new Error('PDF 다운로드에 실패했습니다.');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mobile-analysis-${report.id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "다운로드 완료",
        description: "PDF 보고서가 다운로드되었습니다."
      });
    } catch (error) {
      toast({
        title: "다운로드 실패",
        description: "PDF 다운로드 중 오류가 발생했습니다.",
        variant: "destructive"
      });
    }
  };

  const handleImageDownload = async () => {
    try {
      const response = await fetch(`/api/reports/${report.id}/screenshot`);
      if (!response.ok) throw new Error('이미지 다운로드에 실패했습니다.');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mobile-analysis-${report.id}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "다운로드 완료",
        description: "이미지가 다운로드되었습니다."
      });
    } catch (error) {
      toast({
        title: "다운로드 실패",
        description: "이미지 다운로드 중 오류가 발생했습니다.",
        variant: "destructive"
      });
    }
  };

  const handleKakaoShare = () => {
    const shareData = {
      title: '모바일 친화성 분석 결과',
      description: `${report.url}의 모바일 최적화 점수: ${report.overallScore}점`,
      url: window.location.href
    };
    
    if (navigator.share) {
      navigator.share(shareData).catch(() => {
        toast({
          title: "공유 기능 지원 안됨",
          description: "브라우저에서 공유 기능을 지원하지 않습니다.",
          variant: "destructive"
        });
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shareData.title}\n${shareData.description}\n${shareData.url}`).then(() => {
        toast({
          title: "클립보드에 복사됨",
          description: "분석 결과가 클립보드에 복사되었습니다."
        });
      });
    }
  };

  const handleSlackShare = () => {
    const text = `모바일 친화성 분석 결과\n• URL: ${report.url}\n• 점수: ${report.overallScore}점\n• 상태: ${report.overallScore >= 90 ? '우수' : report.overallScore >= 70 ? '양호' : '개선 필요'}`;
    
    if (navigator.share) {
      navigator.share({
        title: '모바일 친화성 분석 결과',
        text: text,
        url: window.location.href
      }).catch(() => {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(text).then(() => {
          toast({
            title: "클립보드에 복사됨",
            description: "분석 결과가 클립보드에 복사되었습니다."
          });
        });
      });
    } else {
      navigator.clipboard.writeText(text).then(() => {
        toast({
          title: "클립보드에 복사됨",
          description: "분석 결과가 클립보드에 복사되었습니다."
        });
      });
    }
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-8">
        <div className="text-center">
          <h4 className="text-xl font-semibold mb-4">분석 결과 다운로드</h4>
          <p className="text-gray-600 mb-6">
            상세한 분석 결과를 PDF나 이미지로 다운로드하여 보관하거나 공유하세요
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <Button 
              onClick={handlePDFDownload}
              className="bg-primary text-white hover:bg-primary/90"
            >
              <FileText className="w-4 h-4 mr-2" />
              PDF 보고서 다운로드
            </Button>
            
            <Button 
              onClick={handleImageDownload}
              variant="secondary"
              className="bg-gray-600 text-white hover:bg-gray-700"
            >
              <Image className="w-4 h-4 mr-2" />
              이미지 다운로드
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleKakaoShare}
              className="bg-yellow-500 text-white hover:bg-yellow-600"
            >
              <Share2 className="w-4 h-4 mr-2" />
              카카오톡 공유
            </Button>
            
            <Button 
              onClick={handleSlackShare}
              className="bg-purple-600 text-white hover:bg-purple-700"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              슬랙 공유
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
