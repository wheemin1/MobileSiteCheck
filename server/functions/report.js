const { generateReport } = require('../services/report');

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
    const { reportType, reportData } = body;

    if (!reportType || !reportData) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Report type and data are required' })
      };
    }

    // 보고서 생성
    const report = await generateReport(reportType, reportData);

    // 성공 응답 반환
    return {
      statusCode: 200,
      body: JSON.stringify(report),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    console.error('Report generation error:', error);
    
    // 오류 응답 반환
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate report', message: error.message })
    };
  }
};
