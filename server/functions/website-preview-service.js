// 웹사이트 미리보기 서비스 - Netlify 함수 전용 버전
exports.generatePreview = async function(url) {
  try {
    // Netlify 환경에서는 간단한 미리보기 정보만 반환
    return {
      title: url,
      description: "Netlify 환경에서는 미리보기 스크린샷을 제공하지 않습니다.",
      screenshot: ""  // 빈 스크린샷
    };
  } catch (error) {
    console.error('Website preview generation error:', error);
    throw new Error('Failed to generate website preview');
  }
};
