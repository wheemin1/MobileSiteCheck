import { apiRequest } from './queryClient';
import { AnalysisReport } from './types';

// API 기본 URL 설정 (개발 환경과 프로덕션 환경 구분)
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/.netlify/functions'
  : '/api';

// URL 분석 API
export async function analyzeWebsite(url: string): Promise<AnalysisReport> {
  const response = await apiRequest('POST', `${API_BASE_URL}/analyze`, { url });
  return response.json();
}

// 웹사이트 미리보기 API
export async function getWebsitePreview(url: string) {
  const response = await apiRequest('POST', `${API_BASE_URL}/preview`, { url });
  return response.json();
}

// 보고서 생성 API
export async function generateReport(reportType: string, reportData: any) {
  const response = await apiRequest('POST', `${API_BASE_URL}/report`, { 
    reportType, 
    reportData 
  });
  return response.json();
}
