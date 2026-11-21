import type { InputHTMLAttributes } from 'react'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  /** 있으면 빨간 안내 문구를 보여 준다 */
  error?: string
}

export function TextField({ label, error, id, className = '', ...rest }: TextFieldProps) {
  const inputId = id ?? rest.name
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-sub">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        className={`h-12 rounded-xl border px-3 text-base outline-none focus:border-primary ${error ? 'border-danger' : 'border-line'} ${className}`}
        {...rest}
      />
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  )
}
