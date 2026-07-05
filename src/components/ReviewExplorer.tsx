import { useEffect, useMemo, useState } from 'react'

import type { ReviewCollection } from '@/types/review'
import { filterEntries, getDefaultEntryId, normalizeCollection } from '@/lib/reviewData'
import { PaperDetail } from './PaperDetail'
import { PaperSidebar } from './PaperSidebar'
import { SearchInput } from './SearchInput'
import { YearTabs } from './YearTabs'

interface ReviewExplorerProps {
  collection: ReviewCollection
}

export function ReviewExplorer({ collection }: ReviewExplorerProps) {
  const normalizedCollection = useMemo(() => normalizeCollection(collection), [collection])
  const years = useMemo(() => normalizedCollection.years.map((yearGroup) => yearGroup.year), [normalizedCollection])
  const [activeYear, setActiveYear] = useState<number>(years[0] ?? new Date().getFullYear())
  const [searchQuery, setSearchQuery] = useState('')

  const activeYearGroup =
    normalizedCollection.years.find((yearGroup) => yearGroup.year === activeYear) ??
    normalizedCollection.years[0]

  const visibleEntries = useMemo(
    () => filterEntries(activeYearGroup?.entries ?? [], searchQuery),
    [activeYearGroup, searchQuery],
  )

  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(
    getDefaultEntryId(activeYearGroup?.entries ?? []),
  )

  useEffect(() => {
    setSelectedEntryId(getDefaultEntryId(visibleEntries))
  }, [activeYear, searchQuery, visibleEntries])

  const selectedEntry =
    visibleEntries.find((entry) => entry.id === selectedEntryId) ?? visibleEntries[0] ?? null

  return (
    <div className="page-shell">
      <header className="hero-grid">
        <div>
          <p className="eyebrow">Annual Review of Psychology Reader</p>
          <h1 className="hero-title">Annual Review of Psychology 年度精读总览</h1>
          <p className="hero-copy">
            左侧按年份与题目浏览卷内条目，右侧集中展示 `Introduction` 的年度导读、单篇综述的 DOI、摘要、分类定位与
            `L1-L5` 精读内容。
          </p>
        </div>
        <div className="hero-note">
          <p className="hero-note-label">收录范围</p>
          <p className="hero-note-title">{collection.publication}</p>
          <p className="hero-note-copy">
            当前收录 2026 年卷本地正式数据，可从卷首导论进入年度脉络，再按主题切换到具体综述。
          </p>
        </div>
      </header>

      <section className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <YearTabs years={years} activeYear={activeYear} onChange={setActiveYear} />
        <div className="w-full xl:max-w-md">
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(19rem,24rem)_1fr]">
        <PaperSidebar
          entries={visibleEntries}
          selectedEntryId={selectedEntry?.id ?? null}
          onSelect={setSelectedEntryId}
        />
        <PaperDetail entry={selectedEntry} yearSummary={activeYearGroup?.yearSummary} />
      </section>
    </div>
  )
}
