import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Search } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { AnalysisReport } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

const urlSchema = z.object({
  url: z.string().url("올바른 URL을 입력해주세요 (https://example.com)")
});

type UrlFormData = z.infer<typeof urlSchema>;

interface UrlInputFormProps {
  onUrlSubmit: (url: string) => void;
  onAnalysisStart: () => void;
  onAnalysisComplete: (report: AnalysisReport) => void;
  onAnalysisError: (error: string) => void;
  currentUrl: string;
  showPreview: boolean;
}

export function UrlInputForm({ onUrlSubmit, onAnalysisStart, onAnalysisComplete, onAnalysisError, currentUrl, showPreview }: UrlInputFormProps) {
  const { toast } = useToast();
  
  const form = useForm<UrlFormData>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      url: currentUrl
    }
  });

  // Update form when currentUrl changes
  useEffect(() => {
    form.setValue('url', currentUrl);
  }, [currentUrl, form]);

  const analysisMutation = useMutation({
    mutationFn: async (data: UrlFormData) => {
      const response = await apiRequest("POST", "/api/analyze", data);
      return response.json();
    },
    onSuccess: (data: AnalysisReport) => {
      onAnalysisComplete(data);
      toast({
        title: "분석 완료",
        description: "웹사이트 모바일 친화성 분석이 완료되었습니다."
      });
    },
    onError: (error: any) => {
      const errorMessage = error.message || "분석 중 오류가 발생했습니다.";
      onAnalysisError(errorMessage);
      toast({
        title: "분석 실패",
        description: errorMessage,
        variant: "destructive"
      });
    }
  });

  // Listen for analysis event from preview confirmation
  useEffect(() => {
    const handleStartAnalysis = (event: any) => {
      if (event.detail.url) {
        onAnalysisStart();
        analysisMutation.mutate({ url: event.detail.url });
      }
    };

    window.addEventListener('startAnalysis', handleStartAnalysis);
    return () => window.removeEventListener('startAnalysis', handleStartAnalysis);
  }, [onAnalysisStart, analysisMutation]);

  const onSubmit = async (data: UrlFormData) => {
    if (showPreview) {
      // If preview is already shown, don't submit again
      return;
    }
    onUrlSubmit(data.url);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="https://example.com"
                  className="px-4 py-3 text-gray-900 placeholder-gray-500 bg-white border-0 focus:ring-2 focus:ring-blue-300"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-blue-200" />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          disabled={analysisMutation.isPending || showPreview}
          className="bg-white text-primary px-8 py-3 font-semibold hover:bg-gray-50 transition-colors"
        >
          {analysisMutation.isPending ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
              분석 중...
            </>
          ) : showPreview ? (
            <>
              <Search className="w-4 h-4 mr-2" />
              미리보기 확인 중
            </>
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              미리보기 생성
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
