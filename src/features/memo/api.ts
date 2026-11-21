import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'

// 샘플 기능. 서버의 /api/memos 와 연동한다. 새 기능은 이 파일을 본떠 features/{이름}/api.ts 로 만든다.

export interface Memo {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export interface MemoInput {
  title: string
  content: string
}

const memoKeys = { all: ['memos'] as const }

export function useMemos() {
  return useQuery({ queryKey: memoKeys.all, queryFn: () => api.get<Memo[]>('/api/memos') })
}

export function useCreateMemo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: MemoInput) => api.post<Memo>('/api/memos', { ...input }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: memoKeys.all }),
  })
}

export function useDeleteMemo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.delete(`/api/memos/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: memoKeys.all }),
  })
}
