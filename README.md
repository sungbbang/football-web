# 해외축구 커뮤니티

해외축구 5대 리그의 경기일정, 순위정보를 보여주고 게시판을 통한 커뮤니티 기능을 제공합니다.

[배포 링크](https://football-web-e0bf1.web.app/)
(콜드스타트때문에 최대 2분 이상 api 요청이 지연될 수 있습니다. 양해해주시면 감사하겠습니다.)

## 만든 이유

평소에 좋아하는 해외축구의 정보를 네이버 해외축구 서비스에서 확인했는데, 직접 내가 만들어보면 어떨까라는 생각에서 시작했습니다.

기존에 바닐라 자바스크립트로 프리미어리그 일정표를 만든 경험이 있는데, 이번에는 React로 5개 리그 전체를 다루고 백엔드도 해보면서 사람들이 함께 소통할 수 있는 커뮤니티 기능까지 구현해보고 싶었습니다.

## 구동 모습

### 데스크탑 환경

![데스크탑 구동모습 gif](https://github.com/user-attachments/assets/d2da352e-522f-4874-8a75-e2145965c738)

### 모바일 환경

![모바일 구동모습 gif](https://github.com/user-attachments/assets/304def1f-5d3d-4e83-814a-5cf98734b376)

## 주요 기능

현재 해외축구 오픈 API가 무료 플랜은 2021년부터 2023년까지만 이용가능하게 변경해서 최근 데이터(2025.11.04 이후)는 갱신되지 않고 있습니다.

- 5대 리그(EPL, 라리가, 분데스리가, 세리에A, 리그1) 경기 일정 및 결과
- 각 리그의 클럽 순위, 득점왕, 도움왕 정보
- 로그인/회원가입 기능
- 게시판 글 작성/수정/삭제, 댓글 작성/수정/삭제
- 게시글 좋아요 기능

## 작업 내용

### FE

- React Router Loader를 활용한 데이터 프리페칭
- TanStack Query를 통한 서버 상태 관리 및 캐싱
- URL 쿼리 파라미터 기반 상태 관리
- Protected Route로 인증 페이지 보호
- Context API를 통한 로그인 상태 전역 관리
- Tailwind CSS를 이용한 반응형 디자인 구현
- useMutation 훅을 통한 게시판 기능 낙관적 업데이트 적용 및 서버상태 관리

### BE

- REST API 설계 및 구현
- Mongoose 스키마 설계
- JWT 기반 인증 시스템
- node-cron 스케줄러로 오픈 API 데이터 자동 갱신
- API 요청 제한 체크 로직 구현

## 사용 기술

### FE

- React ^19.1
- React-router ^7.8
- Tailwind CSS ^4.1
- TanStack Query ^5.85

### BE

- Node.js ^24.7
- Express.js ^5.1
- MongoDB / mongoose ^8.18

### 배포

- Firebase - 프론트엔드 배포
- Render - 백엔드 서버 배포

## 회고

### 고민한 점

- 데이터 페칭 전략
  기존에 라우터 레벨(loader)에서 페칭하던 방식은 작업이 완료될 때까지 컴포넌트 렌더링이 블로킹되는 단점이 있어 최소한의 데이터만 페칭 후 컴포넌트 레벨(TanStack Query)에서 상세 데이터 페칭, 페이지 전환 속도가 빨라지고 사용자 경험 향상
- 상태 관리 방법
  날짜, 리그 같은 필터 상태를 어떻게 관리할까에 대한 고민을 URL 쿼리 파라미터 기반으로 해결, 페이지의 상태는 쿼리 스트링과 동일하며 별도의 state를 선언하지 않아도 됨
- API 구조 설계
  프론트엔드 기준 필요한 데이터를 한번에 응답받는게 편할 것으로 생각해서 통합 API를 설계했으나 단일 책임 원칙, REST 원칙에 근거해 기능별로 API 분리. 유지보수가 용이해짐

### 배운 점

- React Router와 TanStack Query의 조합

  Loader에서 prefetch한 데이터를 TanStack Query로 캐싱하는 패턴을 통해, 빠른 페이지 전환과 효율적인 데이터 관리를 동시에 달성할 수 있었음.

- URL을 상태로 활용하는 설계

  useState를 제거하고 URL을 상태의 유일한 출처로 만들면서, 코드가 단순해지고 예측 가능해짐. SSOT(Single source of truth) 원칙의 중요성을 체감

- 풀스택 개발 경험

  프론트엔드부터 백엔드 API, 데이터베이스 설계, 배포까지 전체 과정을 경험하면서 웹 애플리케이션의 전반적인 흐름을 이해

## 참고

- 해외축구 오픈 API
  https://www.api-football.com/documentation-v3
- 네이버 해외축구
  https://m.sports.naver.com/wfootball/index
- 다음 해외축구
  https://sports.daum.net/worldsoccer
- TanStack Query + React Router
  https://tanstack.com/query/latest/docs/framework/react/examples/react-router
