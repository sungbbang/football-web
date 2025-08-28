function validateApiResponse(entityName, { response, year, leagueId }) {
  if (
    !response ||
    !response.data ||
    !response.data.response ||
    response.data.response.length === 0
  ) {
    const context = year
      ? `[${year}시즌 ${leagueId}리그]`
      : `[${leagueId}리그]`;
    const errorMessage = `응답 데이터 검증에서 ${context} ${entityName}를 찾을 수 없거나 데이터가 비어 있습니다.`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}

module.exports = { validateApiResponse };
