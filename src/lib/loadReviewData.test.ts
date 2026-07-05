import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getReviewDataPath, loadReviewData } from './loadReviewData'

describe('loadReviewData', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('builds the dataset path from the current Vite base path', () => {
    expect(getReviewDataPath('/Psychology-Reader/')).toBe(
      '/Psychology-Reader/data/annual-review-psychology.json',
    )
  })

  it('loads the dataset from the resolved path', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        publication: 'Annual Review of Psychology',
        sourceUrl: 'https://example.com',
        updatedAt: '2026-07-05',
        years: [],
      }),
    } as Response)

    await loadReviewData()

    expect(fetchMock).toHaveBeenCalledWith(getReviewDataPath())
  })
})
