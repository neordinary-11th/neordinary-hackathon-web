import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../../components/Button'
import { Screen } from '../../components/Screen'
import { TextField } from '../../components/TextField'
import { ApiError } from '../../lib/api'
import { useCreateMemo } from './api'

export function MemoCreatePage() {
  const navigate = useNavigate()
  const createMemo = useCreateMemo()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  // 서버 검증 실패(400)는 필드 아래에, 그 밖의 실패는 폼 위에 보여 준다.
  const error = createMemo.error instanceof ApiError ? createMemo.error : null
  const fieldErrors = error?.fieldErrors ?? {}
  const formError = error && Object.keys(fieldErrors).length === 0 ? error.message : null

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    createMemo.mutate(
      { title: title.trim(), content: content.trim() },
      { onSuccess: () => navigate('/') },
    )
  }

  return (
    <Screen
      title="메모 쓰기"
      back
      footer={
        <Button
          type="submit"
          form="memo-form"
          loading={createMemo.isPending}
          disabled={!title.trim() || !content.trim()}
        >
          저장
        </Button>
      }
    >
      <form id="memo-form" onSubmit={handleSubmit} className="flex flex-col gap-5 px-4 py-5">
        {formError && (
          <p role="alert" className="rounded-xl bg-surface px-3 py-3 text-sm text-danger">
            {formError}
          </p>
        )}
        <TextField
          label="제목"
          name="title"
          maxLength={100}
          placeholder="제목을 입력해 주세요"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          error={fieldErrors.title}
        />
        <TextField
          label="내용"
          name="content"
          placeholder="내용을 입력해 주세요"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          error={fieldErrors.content}
        />
      </form>
    </Screen>
  )
}
