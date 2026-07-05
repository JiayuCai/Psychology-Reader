import type { ReviewCollection } from '@/types/review'
import { normalizeCollection } from './reviewData'

export function getReviewDataPath(baseUrl = import.meta.env.BASE_URL) {
  return `${baseUrl}data/annual-review-psychology.json`
}

export async function loadReviewData(): Promise<ReviewCollection> {
  const response = await fetch(getReviewDataPath())

  if (!response.ok) {
    throw new Error('无法加载 Annual Review of Psychology 数据。')
  }

  const payload = (await response.json()) as ReviewCollection
  return normalizeCollection(payload)
}
