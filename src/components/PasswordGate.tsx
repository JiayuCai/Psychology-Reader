import { FormEvent, ReactNode, useEffect, useState } from 'react'

const STORAGE_KEY = 'psychology-reader-unlocked'

interface PasswordGateProps {
  children: ReactNode
  password?: string
}

export function PasswordGate({ children, password = import.meta.env.VITE_SITE_PASSWORD ?? 'forFun' }: PasswordGateProps) {
  const [isReady, setIsReady] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const unlocked = window.sessionStorage.getItem(STORAGE_KEY) === '1'
    setIsUnlocked(unlocked)
    setIsReady(true)
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (value === password) {
      window.sessionStorage.setItem(STORAGE_KEY, '1')
      setIsUnlocked(true)
      setError('')
      return
    }

    setError('密码不正确，请重试。')
  }

  if (!isReady) {
    return null
  }

  if (isUnlocked) {
    return <>{children}</>
  }

  return (
    <main className="page-shell flex min-h-screen items-center justify-center">
      <section className="panel w-full max-w-md px-8 py-10">
        <p className="eyebrow">Private Preview</p>
        <h1 className="mt-4 font-serif text-3xl text-stone-950">请输入访问密码</h1>
        <p className="mt-4 text-sm leading-7 text-stone-600">
          这个页面使用前端口令做轻量访问限制，适合小范围分享预览。
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-stone-700">访问密码</span>
            <input
              aria-label="访问密码"
              type="password"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="输入密码后进入"
              className="h-12 w-full rounded-2xl border border-stone-300 bg-white/80 px-4 text-sm text-stone-700 outline-none transition placeholder:text-stone-400 focus:border-stone-500 focus:ring-2 focus:ring-stone-300"
            />
          </label>

          {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}

          <button
            type="submit"
            className="h-12 w-full rounded-2xl bg-stone-900 text-sm font-semibold text-stone-50 transition hover:bg-stone-700"
          >
            进入
          </button>
        </form>
      </section>
    </main>
  )
}
