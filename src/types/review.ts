export type EntryKind = 'introduction' | 'article'

export type ReadingStatus = 'placeholder' | 'ready'

export interface DeepReading {
  l1ProblemFraming: string
  l2CoreArgument: string
  l3ConceptHandles: string[]
  l4DisciplinaryFeedback: string
  l5PivotalRefs: string[]
}

export interface SubfieldDistributionItem {
  name: string
  count: number
  overview: string
}

export interface ReviewYearSummary {
  totalEntries?: number
  totalArticles?: number
  subfieldDistribution: SubfieldDistributionItem[]
}

export interface ReviewEntry {
  id: string
  kind: EntryKind
  title: string
  authors: string[]
  year: number
  doi: string
  articleUrl: string
  abstract: string
  readingStatus: ReadingStatus
  primarySubfield: string
  secondaryTags: string[]
  subfieldRationale: string
  deepReading: DeepReading
}

export interface ReviewYearGroup {
  year: number
  entries: ReviewEntry[]
  yearSummary?: ReviewYearSummary
}

export interface ReviewCollection {
  publication: string
  sourceUrl: string
  updatedAt: string
  years: ReviewYearGroup[]
}
