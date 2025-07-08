const { generatePreview } = require('./website-preview-service');

exports.handler = async function(event, context) {
  try {
    // HTTP 메서드 검증
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' })
      };
    }

    // 요청 본문 파싱
    const body = JSON.parse(event.body);
    const url = body.url;

    if (!url) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'URL is required' })
      };
    }

    // 미리보기 생성
    const previewData = await generatePreview(url);

    // 성공 응답 반환
    return {
      statusCode: 200,
      body: JSON.stringify(previewData)
    };
  } catch (error) {
    console.error('Preview generation error:', error);
    
    // 오류 응답 반환
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate preview', message: error.message })
    };
  }
};
