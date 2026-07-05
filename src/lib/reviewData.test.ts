import { describe, expect, it } from 'vitest'

import {
  filterEntries,
  getSubfieldDistribution,
  getDefaultEntryId,
  normalizeCollection,
} from './reviewData'
import type { ReviewCollection } from '@/types/review'

const fixture: ReviewCollection = {
  publication: 'Annual Review of Psychology',
  sourceUrl: 'https://www.annualreviews.org/content/journals/psych/77/1',
  updatedAt: '2026-07-03',
  years: [
    {
      year: 2026,
      entries: [
        {
          id: 'paper-a',
          kind: 'article',
          title: 'Motivation as Neural Context for Adaptive Learning and Memory Formation',
          authors: ['Jia-Hou Poh', 'R. Alison Adcock'],
          year: 2026,
          doi: '10.1146/annurev-psych-032525-031744',
          articleUrl: 'https://example.com/paper-a',
          abstract: 'Memory is selective and shaped by motivational states.',
          readingStatus: 'placeholder',
          primarySubfield: '学习、记忆与动机',
          secondaryTags: ['记忆', '动机', '学习'],
          subfieldRationale: '聚焦动机如何塑造记忆形成。',
          deepReading: {
            l1ProblemFraming: 'placeholder',
            l2CoreArgument: 'placeholder',
            l3ConceptHandles: ['placeholder'],
            l4DisciplinaryFeedback: 'placeholder',
            l5PivotalRefs: ['placeholder'],
          },
        },
        {
          id: 'intro',
          kind: 'introduction',
          title: 'Introduction',
          authors: ['Susan T. Fiske', 'Daniel L. Schacter'],
          year: 2026,
          doi: '10.1146/annurev-psych-100125-025051',
          articleUrl: 'https://example.com/intro',
          abstract: 'Introduction summary.',
          readingStatus: 'placeholder',
          primarySubfield: '总论 / 编辑导论',
          secondaryTags: ['年度导论'],
          subfieldRationale: '编辑导论条目。',
          deepReading: {
            l1ProblemFraming: 'placeholder',
            l2CoreArgument: 'placeholder',
            l3ConceptHandles: ['placeholder'],
            l4DisciplinaryFeedback: 'placeholder',
            l5PivotalRefs: ['placeholder'],
          },
        },
      ],
      yearSummary: {
        subfieldDistribution: [
          {
            name: '学习、记忆与动机',
            count: 1,
            overview: '聚焦动机与记忆形成。',
          },
          {
            name: '总论 / 编辑导论',
            count: 1,
            overview: '编辑导论概览年度主题。',
          },
        ],
      },
    },
    {
      year: 2025,
      entries: [
        {
          id: 'older-paper',
          kind: 'article',
          title: 'A 2025 paper',
          authors: ['Older Author'],
          year: 2025,
          doi: '10.1146/example-2025',
          articleUrl: 'https://example.com/2025',
          abstract: 'Older abstract.',
          readingStatus: 'placeholder',
          primarySubfield: '方法论与测量',
          secondaryTags: ['测量'],
          subfieldRationale: '仅用于测试排序。',
          deepReading: {
            l1ProblemFraming: 'placeholder',
            l2CoreArgument: 'placeholder',
            l3ConceptHandles: ['placeholder'],
            l4DisciplinaryFeedback: 'placeholder',
            l5PivotalRefs: ['placeholder'],
          },
        },
      ],
    },
  ],
}

describe('reviewData helpers', () => {
  it('sorts years descending and pins the introduction first within a year', () => {
    const normalized = normalizeCollection(fixture)

    expect(normalized.years.map((yearGroup) => yearGroup.year)).toEqual([2026, 2025])
    expect(normalized.years[0].entries.map((entry) => entry.id)).toEqual(['intro', 'paper-a'])
  })

  it('filters entries by title, author, and doi', () => {
    const normalized = normalizeCollection(fixture)
    const entries = normalized.years[0].entries

    expect(filterEntries(entries, 'motivation').map((entry) => entry.id)).toEqual(['paper-a'])
    expect(filterEntries(entries, 'schacter').map((entry) => entry.id)).toEqual(['intro'])
    expect(filterEntries(entries, '032525-031744').map((entry) => entry.id)).toEqual(['paper-a'])
  })

  it('returns the introduction as the default entry when present', () => {
    const normalized = normalizeCollection(fixture)

    expect(getDefaultEntryId(normalized.years[0].entries)).toBe('intro')
  })

  it('builds subfield counts for the selected year', () => {
    const normalized = normalizeCollection(fixture)
    const distribution = getSubfieldDistribution(normalized.years[0].entries)

    expect(distribution).toEqual([
      {
        name: '学习、记忆与动机',
        count: 1,
      },
    ])
  })

  it('preserves explicit yearly totals when the source summary already contains full-volume counts', () => {
    const normalized = normalizeCollection({
      ...fixture,
      years: [
        {
          ...fixture.years[0],
          yearSummary: {
            totalEntries: 26,
            totalArticles: 25,
            subfieldDistribution: [
              {
                name: '学习、记忆与动机',
                count: 1,
                overview: '聚焦动机与记忆形成。',
              },
            ],
          },
        },
      ],
    })

    expect(normalized.years[0].yearSummary?.totalEntries).toBe(26)
    expect(normalized.years[0].yearSummary?.totalArticles).toBe(25)
  })
})
