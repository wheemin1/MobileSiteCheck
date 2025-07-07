import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle, AlertCircle, Eye } from "lucide-react";

interface WebsitePreview {
  title: string;
  description: string;
  screenshot: string;
}

interface WebsitePreviewProps {
  url: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function WebsitePreview({ url, onConfirm, onCancel }: WebsitePreviewProps) {
  const [preview, setPreview] = useState<WebsitePreview | null>(null);

  const previewMutation = useMutation({
    mutationFn: async (url: string) => {
      const response = await apiRequest("POST", "/api/preview", { url });
      return response.json();
    },
    onSuccess: (data: WebsitePreview) => {
      setPreview(data);
    },
    onError: (error: any) => {
      console.error("Preview failed:", error);
    }
  });

  const handleGeneratePreview = () => {
    previewMutation.mutate(url);
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold mb-2 flex items-center justify-center">
            <Eye className="mr-2 text-primary" />
            웹사이트 미리보기
          </h3>
          <p className="text-gray-600">
            분석할 웹사이트가 맞는지 확인해주세요
          </p>
        </div>

        <div className="mb-6">
          <div className="bg-gray-100 rounded-lg p-3 mb-4">
            <p className="text-sm text-gray-700">
              <strong>URL:</strong> {url}
            </p>
          </div>

          {!preview && !previewMutation.isPending && (
            <Button 
              onClick={handleGeneratePreview}
              className="w-full mb-4"
              variant="outline"
            >
              <Eye className="mr-2 w-4 h-4" />
              미리보기 생성
            </Button>
          )}

          {previewMutation.isPending && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">모바일 미리보기 생성 중...</p>
            </div>
          )}

          {preview && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg border p-4">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <img 
                      src={`data:image/png;base64,${preview.screenshot}`}
                      alt="Website Preview"
                      className="max-w-full h-auto rounded-lg shadow-md border"
                      style={{ maxHeight: '400px' }}
                    />
                    <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-xs">
                      모바일 뷰
                    </div>
                  </div>
                </div>
                
                {preview.title && (
                  <div className="mb-2">
                    <p className="text-sm font-semibold text-gray-700">제목:</p>
                    <p className="text-gray-900">{preview.title}</p>
                  </div>
                )}
                
                {preview.description && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700">설명:</p>
                    <p className="text-gray-600 text-sm">{preview.description}</p>
                  </div>
                )}
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start">
                  <CheckCircle className="text-green-600 mr-3 mt-0.5 flex-shrink-0" size={18} />
                  <div>
                    <p className="text-green-800 font-medium">올바른 웹사이트인가요?</p>
                    <p className="text-green-700 text-sm mt-1">
                      위 미리보기가 분석하려는 웹사이트가 맞다면 계속 진행해주세요.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {previewMutation.isError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="text-red-600 mr-3 mt-0.5 flex-shrink-0" size={18} />
                <div>
                  <p className="text-red-800 font-medium">미리보기 생성 실패</p>
                  <p className="text-red-700 text-sm mt-1">
                    웹사이트에 접근할 수 없거나 오류가 발생했습니다. URL을 확인해주세요.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={onCancel}
            variant="outline"
            className="flex-1"
          >
            URL 수정
          </Button>
          <Button 
            onClick={onConfirm}
            className="flex-1"
            disabled={!preview && !previewMutation.isError}
          >
            분석 시작
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}