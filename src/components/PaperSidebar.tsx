import type { ReviewEntry } from '@/types/review'
import { InfoBadge } from './InfoBadge'

interface PaperSidebarProps {
  entries: ReviewEntry[]
  selectedEntryId: string | null
  onSelect: (entryId: string) => void
}

export function PaperSidebar({ entries, selectedEntryId, onSelect }: PaperSidebarProps) {
  return (
    <div className="panel flex h-full flex-col overflow-hidden">
      <div className="border-b border-stone-200/80 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">条目列表</p>
        <p className="mt-2 text-sm text-stone-600">点击条目查看基础信息与精读内容。</p>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-3">
        <ul className="space-y-2">
          {entries.map((entry) => {
            const isActive = entry.id === selectedEntryId

            return (
              <li key={entry.id}>
                <button
                  type="button"
                  onClick={() => onSelect(entry.id)}
                  aria-label={entry.title}
                  className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                    isActive
                      ? 'border-stone-900 bg-stone-900 text-stone-50 shadow-xl shadow-stone-900/15'
                      : 'border-stone-200 bg-white/80 text-stone-800 hover:border-stone-400 hover:bg-stone-50'
                  }`}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <InfoBadge tone={entry.kind === 'introduction' ? 'intro' : 'article'}>
                      {entry.kind === 'introduction' ? 'Introduction' : 'Article'}
                    </InfoBadge>
                  </div>
                  <p className="text-sm font-semibold leading-6">{entry.title}</p>
                  <p
                    className={`mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                      isActive ? 'text-stone-300' : 'text-stone-400'
                    }`}
                  >
                    {entry.primarySubfield}
                  </p>
                  <p
                    className={`mt-2 text-xs leading-5 ${
                      isActive ? 'text-stone-300' : 'text-stone-500'
                    }`}
                  >
                    {entry.authors.join(', ')}
                  </p>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
