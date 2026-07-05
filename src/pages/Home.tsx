import { useEffect, useState } from 'react'

import { ReviewExplorer } from '@/components/ReviewExplorer'
import { loadReviewData } from '@/lib/loadReviewData'
import type { ReviewCollection } from '@/types/review'

export default function Home() {
  const [collection, setCollection] = useState<ReviewCollection | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function bootstrap() {
      try {
        const payload = await loadReviewData()

        if (!cancelled) {
          setCollection(payload)
        }
      } catch (loadError) {
        if (!cancelled) {
          const message =
            loadError instanceof Error ? loadError.message : '加载数据时发生未知错误。'
          setError(message)
        }
      }
    }

    bootstrap()

    return () => {
      cancelled = true
    }
  }, [])

  if (error) {
    return (
      <main className="page-shell">
        <section className="panel flex min-h-[22rem] flex-col items-center justify-center px-8 py-12 text-center">
          <p className="eyebrow">Load Error</p>
          <h1 className="mt-4 font-serif text-3xl text-stone-900">数据加载失败</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-stone-600">{error}</p>
        </section>
      </main>
    )
  }

  if (!collection) {
    return (
      <main className="page-shell">
        <section className="panel min-h-[32rem] px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-5 w-40 rounded-full bg-stone-200" />
            <div className="h-12 max-w-3xl rounded-3xl bg-stone-200" />
            <div className="h-28 rounded-3xl bg-stone-100" />
            <div className="grid gap-6 xl:grid-cols-[minmax(19rem,24rem)_1fr]">
              <div className="h-[32rem] rounded-[2rem] bg-stone-100" />
              <div className="h-[32rem] rounded-[2rem] bg-stone-100" />
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main>
      <ReviewExplorer collection={collection} />
    </main>
  )
}
