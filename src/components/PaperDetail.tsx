import { ExternalLink, FileQuestion } from 'lucide-react'

import type { ReviewEntry, ReviewYearSummary } from '@/types/review'
import { InfoBadge } from './InfoBadge'

interface PaperDetailProps {
  entry: ReviewEntry | null
  yearSummary?: ReviewYearSummary
}

const sectionLabels = [
  ['L1', '问题意识'],
  ['L2', '核心论点 + 论证链'],
  ['L3', '学科抓手'],
  ['L4', '对学科自身的反哺'],
  ['L5', 'Pivotal References'],
] as const

export function PaperDetail({ entry, yearSummary }: PaperDetailProps) {
  if (!entry) {
    return (
      <div className="panel flex min-h-[32rem] items-center justify-center p-10 text-center">
        <div className="max-w-sm">
          <FileQuestion className="mx-auto h-10 w-10 text-stone-400" />
          <h2 className="mt-4 text-xl font-semibold text-stone-800">暂无可展示条目</h2>
          <p className="mt-3 text-sm leading-7 text-stone-500">
            当前年份没有命中搜索结果，请调整关键词或切换年份继续查看。
          </p>
        </div>
      </div>
    )
  }

  const isIntroduction = entry.kind === 'introduction'

  return (
    <article className="panel min-h-[32rem] overflow-hidden">
      <div className="border-b border-stone-200/80 px-6 py-6">
        <div className="flex flex-wrap items-center gap-3">
          <InfoBadge tone={entry.kind === 'introduction' ? 'intro' : 'article'}>
            {entry.kind === 'introduction' ? 'Introduction' : 'Article'}
          </InfoBadge>
        </div>
        <h1 className="mt-4 text-balance font-serif text-3xl leading-tight text-stone-950">
          {entry.title}
        </h1>
        <p className="mt-4 text-sm leading-7 text-stone-600">{entry.authors.join(', ')}</p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-stone-500">
          <span>{entry.year}</span>
          <span className="text-stone-300">|</span>
          <span>{entry.doi}</span>
        </div>
        <a
          href={entry.articleUrl}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-stone-500 hover:text-stone-950"
        >
          查看原文
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="space-y-8 px-6 py-6">
        {isIntroduction ? (
          <>
            <section className="detail-card">
              <h2 className="detail-section-title">年度脉络</h2>
              <div className="space-y-4">
                <p className="detail-paragraph">{entry.deepReading.l1ProblemFraming}</p>
                <p className="detail-paragraph">{entry.deepReading.l2CoreArgument}</p>
              </div>
            </section>

            <section>
              <h2 className="detail-section-title">年度主线</h2>
              <div className="space-y-4">
                {entry.deepReading.l3ConceptHandles.map((item) => (
                  <div key={item} className="detail-card">
                    <p className="detail-paragraph">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {yearSummary && (
              <section>
                <h2 className="detail-section-title">本年分布要点</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {yearSummary.subfieldDistribution.map((item) => (
                    <article key={item.name} className="detail-card">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-base font-semibold text-stone-950">{item.name}</h3>
                        <span className="rounded-full bg-stone-900 px-3 py-1 text-xs font-semibold text-stone-50">
                          {item.count} 篇
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-stone-600">{item.overview}</p>
                    </article>
                  ))}
                </div>
              </section>
            )}

            <section className="detail-card">
              <h2 className="detail-section-title">对心理学的回推</h2>
              <p className="detail-paragraph">{entry.deepReading.l4DisciplinaryFeedback}</p>
            </section>

            <section className="detail-card">
              <h2 className="detail-section-title">建议先读</h2>
              <ul className="detail-list">
                {entry.deepReading.l5PivotalRefs.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </>
        ) : (
          <section className="detail-card">
            <h2 className="detail-section-title">分类定位</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Primary Subfield</p>
                <p className="mt-2 text-lg font-semibold text-stone-950">{entry.primarySubfield}</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Why It Sits Here</p>
                <p className="mt-2 text-sm leading-7 text-stone-600">{entry.subfieldRationale}</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Secondary Tags</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {entry.secondaryTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-semibold text-stone-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <section>
          <h2 className="detail-section-title">摘要</h2>
          <p className="detail-paragraph">{entry.abstract}</p>
        </section>

        {!isIntroduction && (
          <section>
            <div className="space-y-4">
              {sectionLabels.map(([prefix, label]) => (
                <div key={prefix} className="detail-card">
                  <h3 className="detail-card-title">
                    <span className="detail-card-prefix">{prefix}</span>
                    {label}
                  </h3>
                  {prefix === 'L3' ? (
                    <ul className="detail-list">
                      {entry.deepReading.l3ConceptHandles.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : prefix === 'L5' ? (
                    <ul className="detail-list">
                      {entry.deepReading.l5PivotalRefs.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="detail-paragraph">
                      {prefix === 'L1' && entry.deepReading.l1ProblemFraming}
                      {prefix === 'L2' && entry.deepReading.l2CoreArgument}
                      {prefix === 'L4' && entry.deepReading.l4DisciplinaryFeedback}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  )
}
