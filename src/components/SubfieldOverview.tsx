import type { ReviewYearSummary } from '@/types/review'

interface SubfieldOverviewProps {
  year: number
  summary: ReviewYearSummary
  activeSubfield: string | null
  onSelectSubfield: (subfield: string | null) => void
}

export function SubfieldOverview({
  year,
  summary,
  activeSubfield,
  onSelectSubfield,
}: SubfieldOverviewProps) {
  const topSubfield = summary.subfieldDistribution[0]?.name ?? '待补充'

  return (
    <section className="panel overflow-hidden">
      <div className="border-b border-stone-200/80 px-6 py-6">
        <p className="eyebrow">Year Map</p>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-serif text-3xl leading-tight text-stone-950">年度子领域分布</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-600">
              先看 {year} 年卷覆盖了哪些子领域，再点击某一类筛选文章列表和详情区。
            </p>
          </div>
          <div className="stats-grid">
            <div>
              <span className="stats-label">总条目</span>
              <strong className="stats-value">{summary.totalEntries ?? 0}</strong>
            </div>
            <div>
              <span className="stats-label">研究文章</span>
              <strong className="stats-value">{summary.totalArticles ?? 0}</strong>
            </div>
            <div>
              <span className="stats-label">最活跃子领域</span>
              <strong className="stats-value text-base">{topSubfield}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 px-6 py-6 xl:grid-cols-[minmax(18rem,22rem)_1fr]">
        <div className="space-y-3">
          {summary.subfieldDistribution.map((item) => {
            const isActive = item.name === activeSubfield
            const width = Math.max(18, (item.count / Math.max(summary.totalArticles ?? 1, 1)) * 100)

            return (
              <button
                key={item.name}
                type="button"
                aria-label={`筛选子领域：${item.name}`}
                onClick={() => onSelectSubfield(isActive ? null : item.name)}
                className={`subfield-bar ${isActive ? 'subfield-bar-active' : ''}`}
              >
                <div className="flex items-center justify-between gap-3 text-left">
                  <span className="font-semibold text-stone-900">{item.name}</span>
                  <span className="text-sm text-stone-500">{item.count} 篇</span>
                </div>
                <div className="subfield-meter">
                  <span className="subfield-meter-fill" style={{ width: `${width}%` }} />
                </div>
              </button>
            )
          })}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {summary.subfieldDistribution.map((item) => (
            <article key={item.name} className="detail-card">
              <div className="mb-3 flex items-center justify-between gap-4">
                <h3 className="text-base font-semibold text-stone-950">{item.name}</h3>
                <span className="rounded-full bg-stone-900 px-3 py-1 text-xs font-semibold text-stone-50">
                  {item.count} 篇
                </span>
              </div>
              <p className="detail-paragraph">{item.overview}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
