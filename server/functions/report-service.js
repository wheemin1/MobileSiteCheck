// 보고서 생성 서비스 - Netlify 함수 전용 버전
exports.generateReport = async function(reportType, reportData) {
  try {
    // Netlify 환경에서는 간단한 보고서 JSON 반환
    return {
      generatedAt: new Date().toISOString(),
      reportType: reportType,
      url: reportData.url || '',
      summary: {
        overallScore: reportData.overallScore || 0,
        performanceScore: reportData.performanceScore || 0,
        accessibilityScore: reportData.accessibilityScore || 0,
        bestPracticesScore: reportData.bestPracticesScore || 0,
        seoScore: reportData.seoScore || 0
      },
      // Netlify 환경에서는 다운로드 링크 대신 메시지 반환
      downloadUrl: null,
      message: "Netlify 환경에서는 PDF 다운로드를 지원하지 않습니다. 테스트 환경에서만 가능합니다."
    };
  } catch (error) {
    console.error('Report generation error:', error);
    throw new Error('Failed to generate report');
  }
};
