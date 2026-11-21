import { Link } from 'react-router'
import { Button } from '../../components/Button'
import { Screen } from '../../components/Screen'
import { EmptyView, ErrorView, LoadingView } from '../../components/StateView'
import { useDeleteMemo, useMemos } from './api'

export function MemoListPage() {
  const memos = useMemos()
  const deleteMemo = useDeleteMemo()

  const newMemoLink = (
    <Link
      to="/memos/new"
      className="flex h-12 w-full items-center justify-center rounded-xl bg-primary text-base font-semibold text-white active:bg-primary-pressed"
    >
      메모 쓰기
    </Link>
  )

  return (
    <Screen title="메모" footer={memos.data?.length ? newMemoLink : undefined}>
      {memos.isPending && <LoadingView />}
      {memos.isError && <ErrorView message={memos.error.message} onRetry={() => memos.refetch()} />}
      {memos.data?.length === 0 && (
        <EmptyView
          title="아직 메모가 없어요"
          description="첫 메모를 남겨 보세요."
          action={newMemoLink}
        />
      )}
      {memos.data && memos.data.length > 0 && (
        <ul className="divide-y divide-line">
          {memos.data.map((memo) => (
            <li key={memo.id} className="flex items-start gap-3 px-4 py-4">
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{memo.title}</p>
                <p className="mt-1 line-clamp-2 text-sm text-sub">{memo.content}</p>
              </div>
              <Button
                variant="ghost"
                className="!h-9 !w-auto text-sm !text-danger"
                disabled={deleteMemo.isPending}
                onClick={() => deleteMemo.mutate(memo.id)}
              >
                삭제
              </Button>
            </li>
          ))}
        </ul>
      )}
      {deleteMemo.isError && (
        <p role="alert" className="px-4 py-3 text-sm text-danger">
          삭제하지 못했어요. {deleteMemo.error.message}
        </p>
      )}
    </Screen>
  )
}
