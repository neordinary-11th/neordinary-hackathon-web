import type { ReactNode } from 'react'
import { Button } from './Button'

/** 목록이나 상세를 불러오는 동안 보여 준다. */
export function LoadingView() {
  return (
    <div role="status" className="flex h-full flex-col items-center justify-center gap-3 text-sub">
      <span className="size-8 animate-spin rounded-full border-4 border-line border-t-primary" />
      <p className="text-sm">불러오는 중…</p>
    </div>
  )
}

/** 데이터가 하나도 없을 때. 다음에 할 행동을 action 으로 넣는다. */
export function EmptyView({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 px-8 text-center">
      <p className="text-base font-semibold">{title}</p>
      {description && <p className="text-sm text-sub">{description}</p>}
      {action && <div className="mt-4 w-full">{action}</div>}
    </div>
  )
}

/** 요청이 실패했을 때. 다시 시도할 수 있게 한다. */
export function ErrorView({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div
      role="alert"
      className="flex h-full flex-col items-center justify-center gap-2 px-8 text-center"
    >
      <p className="text-base font-semibold">문제가 생겼어요</p>
      <p className="text-sm text-sub">{message}</p>
      {onRetry && (
        <div className="mt-4 w-full">
          <Button variant="ghost" onClick={onRetry}>
            다시 시도
          </Button>
        </div>
      )}
    </div>
  )
}
