import reviewCollection from '../../public/data/annual-review-psychology.json'

import { describe, expect, it } from 'vitest'

describe('formal review dataset', () => {
  it('contains no placeholder deep readings for the current 2026 demo entries', () => {
    const year2026 = reviewCollection.years.find((yearGroup) => yearGroup.year === 2026)

    expect(year2026).toBeDefined()
    expect(year2026?.entries.every((entry) => entry.readingStatus === 'ready')).toBe(true)
    expect(
      year2026?.entries.every(
        (entry) =>
          !entry.deepReading.l1ProblemFraming.includes('占位版') &&
          !entry.deepReading.l2CoreArgument.includes('占位版') &&
          !entry.deepReading.l4DisciplinaryFeedback.includes('占位版') &&
          entry.deepReading.l3ConceptHandles.every((item) => !item.includes('占位版')) &&
          entry.deepReading.l5PivotalRefs.every((item) => !item.includes('占位版')),
      ),
    ).toBe(true)
  })

  it('covers the full 2026 volume in the local formal dataset', () => {
    const year2026 = reviewCollection.years.find((yearGroup) => yearGroup.year === 2026)

    expect(year2026?.entries).toHaveLength(26)
    expect(year2026?.entries.filter((entry) => entry.kind === 'article')).toHaveLength(25)
  })

  it('uses concrete L5 references for formal article entries', () => {
    const year2026 = reviewCollection.years.find((yearGroup) => yearGroup.year === 2026)
    const formalArticles = year2026?.entries.filter((entry) => entry.kind === 'article') ?? []

    expect(formalArticles.length).toBeGreaterThan(0)
    expect(
      formalArticles.every((entry) =>
        entry.deepReading.l5PivotalRefs.every(
          (item) =>
            !item.includes('传统') &&
            !item.includes('学派') &&
            !item.includes('路线') &&
            !item.includes('脉络') &&
            !item.includes('框架：') &&
            !item.includes('暂缺'),
        ),
      ),
    ).toBe(true)
  })
})
