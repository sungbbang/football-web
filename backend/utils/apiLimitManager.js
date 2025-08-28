const rateLimitState = {
  remainingRequests: 10, // 초기값: API의 분당 최대 허용 요청 수
  nextResetTime: null, // 초기값: null
};

async function checkRateLimitState() {
  const { remainingRequests, nextResetTime } = rateLimitState;

  if (remainingRequests < 1 && nextResetTime) {
    const currentTime = new Date();
    if (currentTime < nextResetTime) {
      const timeToWaitMs =
        nextResetTime.getTime() - currentTime.getTime() + 1000;
      console.log(`Rate Limit 대기: ${Math.ceil(timeToWaitMs / 1000)}초`);
      await new Promise(resolve => setTimeout(resolve, timeToWaitMs));
      rateLimitState.remainingRequests = 10;
    }
  }
}

function updateRateLimitState(response) {
  if (response && response.headers) {
    rateLimitState.remainingRequests = parseInt(
      response.headers['x-ratelimit-remaining']
    );
    const requestTime = new Date(response.headers.date);
    rateLimitState.nextResetTime = new Date(requestTime);
    rateLimitState.nextResetTime.setMinutes(requestTime.getMinutes() + 1);
    rateLimitState.nextResetTime.setSeconds(0);
    rateLimitState.nextResetTime.setMilliseconds(0);

    console.log(`분당 남은 요청: ${rateLimitState.remainingRequests}`);
    console.log(
      `오늘 남은 요청: ${response.headers['x-ratelimit-requests-remaining']}`
    );
  } else {
    console.warn('API 응답 헤더에 Rate Limit 정보가 없습니다.');
  }
}

module.exports = { checkRateLimitState, updateRateLimitState };
