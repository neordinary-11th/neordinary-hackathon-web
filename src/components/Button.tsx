import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
  /** 요청 중이면 true. 버튼을 막고 문구를 바꾼다. */
  loading?: boolean
}

export function Button({
  variant = 'primary',
  loading,
  disabled,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const style =
    variant === 'primary'
      ? 'bg-primary text-white active:bg-primary-pressed'
      : 'bg-transparent text-primary active:bg-surface'
  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={`h-12 w-full rounded-xl px-4 text-base font-semibold disabled:opacity-40 ${style} ${className}`}
      {...rest}
    >
      {loading ? '처리 중…' : children}
    </button>
  )
}
