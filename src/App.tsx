import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HashRouter, Route, Routes } from 'react-router'
import { NotFoundPage } from './components/NotFoundPage'
import { MemoCreatePage } from './features/memo/MemoCreatePage'
import { MemoListPage } from './features/memo/MemoListPage'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
})

// HashRouter 를 쓴다. 정적 호스팅과 앱(WebView) 어디서든 새로고침과 딥링크가 서버 설정 없이 동작한다.
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MemoListPage />} />
          <Route path="/memos/new" element={<MemoCreatePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  )
}
