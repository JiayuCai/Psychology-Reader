import type { ReviewCollection } from '@/types/review'
import { normalizeCollection } from './reviewData'

export async function loadReviewData(): Promise<ReviewCollection> {
  const response = await fetch('/data/annual-review-psychology.json')

  if (!response.ok) {
    throw new Error('无法加载 Annual Review of Psychology 数据。')
  }

  const payload = (await response.json()) as ReviewCollection
  return normalizeCollection(payload)
}
