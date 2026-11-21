// 서버 공통 응답 형식. 서버 팀과 합의한 형식이 다르면 이 파일만 고친다.
interface ApiEnvelope<T> {
  isSuccess: boolean
  code: string
  message: string
  result?: T
}

/** 서버가 실패로 응답했거나 서버에 닿지 못했을 때 던진다. message 는 화면에 그대로 보여 줄 수 있다. */
export class ApiError extends Error {
  readonly code: string
  readonly status: number
  /** 검증 실패 시 필드별 오류 메시지 */
  readonly fieldErrors: Record<string, string>

  constructor(
    code: string,
    message: string,
    status: number,
    fieldErrors: Record<string, string> = {},
  ) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

const BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')
const TIMEOUT_MS = 10_000

type Body = Record<string, unknown> | FormData

async function request<T>(method: string, path: string, body?: Body): Promise<T> {
  const isForm = body instanceof FormData
  let response: Response
  try {
    response = await fetch(BASE_URL + path, {
      method,
      headers: body && !isForm ? { 'Content-Type': 'application/json' } : undefined,
      body: isForm ? body : body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
  } catch {
    throw new ApiError('NETWORK', '서버에 연결할 수 없어요. 네트워크 상태를 확인해 주세요.', 0)
  }

  const envelope = (await response.json().catch(() => null)) as ApiEnvelope<T> | null
  if (!envelope || typeof envelope.isSuccess !== 'boolean') {
    throw new ApiError(
      'UNKNOWN',
      '서버 응답을 읽을 수 없어요. 잠시 후 다시 시도해 주세요.',
      response.status,
    )
  }
  if (!envelope.isSuccess) {
    const fieldErrors =
      envelope.result && typeof envelope.result === 'object'
        ? (envelope.result as Record<string, string>)
        : {}
    throw new ApiError(envelope.code, envelope.message, response.status, fieldErrors)
  }
  return envelope.result as T
}

export const api = {
  get: <T>(path: string) => request<T>('GET', path),
  post: <T>(path: string, body?: Body) => request<T>('POST', path, body),
  put: <T>(path: string, body?: Body) => request<T>('PUT', path, body),
  patch: <T>(path: string, body?: Body) => request<T>('PATCH', path, body),
  delete: <T = void>(path: string) => request<T>('DELETE', path),
}
