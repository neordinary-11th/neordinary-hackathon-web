import type { ReactNode } from 'react'
import { useNavigate } from 'react-router'

interface ScreenProps {
  title: string
  /** 왼쪽에 뒤로가기 버튼을 보여 줄지 */
  back?: boolean
  /** 헤더 오른쪽 영역 */
  action?: ReactNode
  /** 화면 아래에 고정되는 영역 (주요 버튼) */
  footer?: ReactNode
  children: ReactNode
}

/** 모든 화면의 틀. 모바일 폭(최대 402px)으로 고정하고 노치와 홈 인디케이터 영역을 비운다. */
export function Screen({ title, back, action, footer, children }: ScreenProps) {
  const navigate = useNavigate()
  return (
    <div className="mx-auto flex h-dvh w-full max-w-[402px] flex-col bg-white">
      <header className="flex h-14 shrink-0 items-center gap-2 border-b border-line px-4 pt-[env(safe-area-inset-top)] box-content">
        {back && (
          <button
            type="button"
            aria-label="뒤로"
            onClick={() => navigate(-1)}
            className="-ml-2 flex size-10 items-center justify-center rounded-full active:bg-surface"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15 5l-7 7 7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        <h1 className="flex-1 truncate text-lg font-semibold">{title}</h1>
        {action}
      </header>
      <main className="flex-1 overflow-y-auto">{children}</main>
      {footer && (
        <footer className="shrink-0 border-t border-line px-4 pt-3 pb-[calc(env(safe-area-inset-bottom)+12px)]">
          {footer}
        </footer>
      )}
    </div>
  )
}
