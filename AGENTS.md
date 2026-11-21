# AGENTS.md

해커톤 웹 저장소다. 모바일 화면 하나를 웹으로 만들고 Capacitor로 Android, iOS 앱에 담아 제출한다. 심사자는 앱을 실행해 핵심 기능을 끝까지 써 보고, 코드에서 실제 서버와 통신하는지 확인한다. 목 데이터만 쓰면 API 연동 항목이 0점이다.

## 새 기능은 memo를 본뜬다

`src/features/memo` 가 본보기다. 새 기능은 `src/features/{이름}/` 에 같은 구성으로 만든다.

- **서버 호출**. `features/{이름}/api.ts` 에 타입과 React Query 훅(`useQuery`, `useMutation`)을 만들고, 훅 안에서 `lib/api.ts` 의 `api.get/post/put/patch/delete` 를 쓴다. 변경이 성공하면 관련 쿼리를 `invalidateQueries` 한다.
- **화면 틀**. 모든 화면은 `Screen` 으로 감싼다. 주요 버튼은 `footer` 에 둔다.
- **세 가지 상태**. 데이터를 불러오는 화면은 `LoadingView`, `EmptyView`, `ErrorView` 를 모두 그린다. `ErrorView` 에는 `onRetry` 를 넘긴다.
- **변경 요청**. 버튼에 `loading` 을 넘겨 중복 요청을 막고, 실패하면 `ApiError.message` 를 화면에 보여 준다. 검증 실패는 `ApiError.fieldErrors` 를 입력창 아래에 보여 준다.
- **스타일**. Tailwind 클래스를 쓰고, 색과 폰트는 `src/index.css` 의 `@theme` 토큰(`bg-primary`, `text-sub`)으로 쓴다. 새 색은 토큰에 먼저 추가한다.
- **라우트**. `src/App.tsx` 의 `Routes` 에 추가한다. 화면 이동은 `Link` 와 `useNavigate` 를 쓴다.
- **상태**. 서버 데이터는 React Query, 입력값은 `useState` 로 다룬다.
- **앱 전용 동작**. 네이티브 기능은 `lib/native.ts` 에 모으고 `isNative` 로 분기한다. 브라우저나 앱 한쪽에서 동작하지 않는 기능은 그 자리에서 안내 문구를 보여 준다.

## 완료 기준

`npm run build` 와 `npm run lint` 가 통과하고, 추가한 화면이 로컬 서버와 연결된 상태에서 로딩, 빈 목록, 실패 세 경우 모두 확인됐다.

## 범위

애니메이션, 전역 상태 라이브러리, 로그인은 팀이 결정했다고 사용자가 말한 경우에만 추가한다. 서버 API가 아직 없어서 임시 데이터를 쓸 때는 `// TODO(mock)` 주석을 달고 사용자에게 알린다.

## 이 저장소에서 헷갈리는 것

- 서버 응답은 `{ isSuccess, code, message, result }` 형식이고 `lib/api.ts` 가 `result` 만 꺼내 준다. 서버 팀 형식이 다르면 그 파일 하나만 고친다.
- `HashRouter` 를 쓴다. 주소는 `/#/memos/new` 형태다.
- React Router는 `react-router` 패키지에서 import 한다 (`react-router-dom` 아님).
- Tailwind 4다. 설정 파일 없이 `src/index.css` 의 `@theme` 으로 토큰을 정의한다.
- 서버 주소는 `VITE_API_BASE_URL` 이다. 앱(Capacitor)에서는 `https` 주소만 호출된다.
- 웹 코드를 고친 뒤 앱에 반영하려면 `npm run app:sync` 를 실행한다. `android/`, `ios/` 폴더의 웹 파일은 직접 고치지 않는다.
- 커밋은 기능 단위로 나누고 `feat: 메모 목록 화면 추가` 형식을 쓴다. 작업은 `feat/작업명` 브랜치에서 하고 PR로 합친다.
