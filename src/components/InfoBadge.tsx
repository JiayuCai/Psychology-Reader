import { BookOpenText, FileText } from 'lucide-react'

type BadgeTone = 'intro' | 'article'

interface InfoBadgeProps {
  tone: BadgeTone
  children: string
}

const toneClassMap: Record<BadgeTone, string> = {
  intro: 'border-sky-200 bg-sky-100/80 text-sky-800',
  article: 'border-stone-300 bg-white/75 text-stone-700',
}

const toneIconMap: Record<BadgeTone, typeof FileText> = {
  intro: BookOpenText,
  article: FileText,
}

export function InfoBadge({ tone, children }: InfoBadgeProps) {
  const Icon = toneIconMap[tone]

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${toneClassMap[tone]}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {children}
    </span>
  )
}
