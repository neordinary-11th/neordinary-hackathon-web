# 11th NE(O)RDINARY HACKATHON 웹

React 19, TypeScript, Vite, Tailwind CSS 4, TanStack Query 기반 보일러플레이트입니다. 모바일 화면을 웹으로 만들고 Capacitor로 Android와 iOS 앱에 담습니다. 웹 파트 심사 기준에 맞춰 API 연동 구조, 로딩과 빈 상태와 에러 화면, 앱 프로젝트를 미리 갖춰 두었습니다.

## 빠른 시작

Node 22 이상이 필요합니다.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # 타입 검사 포함 빌드
npm run lint
```

샘플 화면은 서버의 `/api/memos` 를 호출합니다. 서버 저장소에서 `docker compose up -d` 와 `./gradlew bootRun` 으로 로컬 서버(8080)를 띄우면 바로 동작합니다. 서버 주소는 `.env.development` 의 `VITE_API_BASE_URL` 입니다.

## 구조

```
src
├── App.tsx                 라우트 목록
├── index.css               디자인 토큰 (색, 폰트)
├── lib
│   ├── api.ts              서버 호출과 공통 응답 처리, ApiError
│   └── native.ts           앱 전용 동작 (뒤로가기 등)
├── components              Screen, Button, TextField, 상태 화면
└── features
    └── memo                샘플 기능. 복사해서 쓰고 지운다
        ├── api.ts          타입과 React Query 훅
        ├── MemoListPage.tsx
        └── MemoCreatePage.tsx
android, ios                Capacitor 앱 프로젝트
```

## 새 화면을 추가하는 순서

1. `src/features/{이름}/api.ts` 에 타입과 훅을 만든다. Swagger 명세의 필드 이름을 그대로 쓴다.
2. 화면 컴포넌트를 `Screen` 으로 감싸서 만든다.
3. 조회 화면에는 `LoadingView`, `EmptyView`, `ErrorView` 를 모두 넣는다.
4. `src/App.tsx` 에 라우트를 추가한다.
5. 로컬 서버에 연결해 정상, 빈 목록, 서버 중단 세 경우를 직접 확인한다.

디자인 시스템이 나오면 `src/index.css` 의 `@theme` 값을 먼저 바꿉니다. AI 도구용 규칙은 `AGENTS.md` 에 있습니다.

## 앱으로 만들기

웹을 고친 뒤에는 항상 `npm run app:sync` 로 앱 프로젝트에 반영합니다.

| 플랫폼  | 필요한 것      | 실행                                                                                                                                    |
| ------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Android | Android Studio | `npm run app:android` 로 열고 Run. APK는 `cd android && ./gradlew assembleDebug` 후 `android/app/build/outputs/apk/debug/app-debug.apk` |
| iOS     | Xcode          | `npm run app:ios` 로 열고 시뮬레이터에서 Run                                                                                            |

- 앱 이름과 ID는 `capacitor.config.ts` 에서 바꿉니다.
- 아이콘과 스플래시는 `assets/icon.png` (1024px), `assets/splash.png` (2732px) 를 넣고 `npx capacitor-assets generate` 로 만듭니다. 스플래시 처리는 가산점 항목입니다.
- 앱에서는 `https` 서버만 호출됩니다. 배포 빌드 전에 `.env.production` 에 `VITE_API_BASE_URL` 을 넣습니다.
- 앱 변환은 마감 직전에 처음 하지 말고, 첫 화면이 나오면 바로 한 번 돌려 봅니다.

## 웹 파트 심사 체크리스트

안내 페이지의 심사 기준을 옮긴 것입니다. 기본 100점에 가산점 최대 10점입니다.

**기능 구현 완성도 (30)**

- [ ] 핵심 기능이 모두 정상 동작 (20, 일부만 구현하면 10)
- [ ] 사용자 시나리오가 끊기지 않고 이어짐 (5)
- [ ] 에러 처리 (2.5)
- [ ] 빈 상태 처리 (2.5)

**디자인 구현 완성도 (20)**

- [ ] 전체 화면 구현, 레이아웃과 간격과 타이포그래피와 색상이 시안과 일치
- [ ] 여러 화면 크기에서 레이아웃이 안정적

**서버 및 API 연동 (20)**

- [ ] 전체 API 연동 (20). 일부만 연동하고 목업을 섞으면 10, 2개 이하면 5, 목 데이터만 쓰면 0

**애플리케이션 완성도 (20)**

- [ ] APK가 설치되고 실행됨 (10). Android와 iOS 정상 실행 각 5
- [ ] 네이티브와 웹 연결 완성도 (10). 웹에서는 되는데 앱에서 안내 없이 안 되는 기능은 건당 2점 감점

**팀워크 (10)**

- [ ] 작업별 커밋 분리 (5)
- [ ] 협업 컨벤션 준수 (5)

**가산점**

- [ ] 스플래시 이미지 처리 (5)

## 당일 흐름

| 시각        | 웹 파트가 할 일                                                                  |
| ----------- | -------------------------------------------------------------------------------- |
| 16:40       | 아이디어 회의. 화면 수와 구현 가능성을 PM, 디자이너와 맞춘다                     |
| 17:30       | 개발 시작. 저장소 공유, 역할 분담, 디자인 토큰 반영                              |
| 이후        | 디자인이 나온 화면부터 구현하고, 서버 API가 하나 나오면 바로 연동해 본다         |
| 04:40       | 주요 기능 완성 목표 (발표 3시간 전). 이후는 앱에서 전체 흐름을 직접 써 보며 수정 |
| 05:30       | 최종 앱 빌드 시작. APK 설치와 iOS 실행 확인                                      |
| 07:20~07:30 | 프로젝트 제출                                                                    |
