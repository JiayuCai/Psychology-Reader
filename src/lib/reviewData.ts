import type {
  ReviewCollection,
  ReviewEntry,
  ReviewYearGroup,
  SubfieldDistributionItem,
} from '@/types/review'

function compareEntries(left: ReviewEntry, right: ReviewEntry) {
  if (left.kind === 'introduction' && right.kind !== 'introduction') {
    return -1
  }

  if (left.kind !== 'introduction' && right.kind === 'introduction') {
    return 1
  }

  return left.title.localeCompare(right.title)
}

export function normalizeCollection(collection: ReviewCollection): ReviewCollection {
  return {
    ...collection,
    years: [...collection.years]
      .sort((left, right) => right.year - left.year)
      .map((yearGroup) => ({
        ...yearGroup,
        entries: [...yearGroup.entries].sort(compareEntries),
        yearSummary: normalizeYearSummary(yearGroup),
      })),
  }
}

export function filterEntries(entries: ReviewEntry[], query: string): ReviewEntry[] {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return entries
  }

  return entries.filter((entry) => {
    const haystack = [entry.title, entry.doi, ...entry.authors].join(' ').toLowerCase()
    return haystack.includes(normalizedQuery)
  })
}

export function getDefaultEntryId(entries: ReviewEntry[]): string | null {
  if (!entries.length) {
    return null
  }

  return entries.find((entry) => entry.kind === 'introduction')?.id ?? entries[0].id
}

export function getSubfieldDistribution(entries: ReviewEntry[]): Array<Pick<SubfieldDistributionItem, 'name' | 'count'>> {
  const counts = new Map<string, number>()

  entries
    .filter((entry) => entry.kind !== 'introduction')
    .forEach((entry) => {
      counts.set(entry.primarySubfield, (counts.get(entry.primarySubfield) ?? 0) + 1)
    })

  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((left, right) => right.count - left.count || left.name.localeCompare(right.name))
}

function normalizeYearSummary(yearGroup: ReviewYearGroup) {
  const derivedTotalEntries = yearGroup.entries.length
  const derivedTotalArticles = yearGroup.entries.filter((entry) => entry.kind !== 'introduction').length
  const fallbackDistribution = getSubfieldDistribution(yearGroup.entries).map((item) => ({
    ...item,
    overview: `本年该子领域共收录 ${item.count} 篇文章，可继续补写年度概述。`,
  }))

  return {
    totalEntries: yearGroup.yearSummary?.totalEntries ?? derivedTotalEntries,
    totalArticles: yearGroup.yearSummary?.totalArticles ?? derivedTotalArticles,
    subfieldDistribution:
      yearGroup.yearSummary?.subfieldDistribution
        ?.filter((item) => item.name !== '总论 / 编辑导论')
        .sort((left, right) => right.count - left.count || left.name.localeCompare(right.name)) ??
      fallbackDistribution,
  }
}
