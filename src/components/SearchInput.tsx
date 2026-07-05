import { Search } from 'lucide-react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <label className="relative block">
      <span className="sr-only">搜索文献</span>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
      <input
        aria-label="搜索文献"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="按标题、作者或 DOI 搜索"
        className="h-12 w-full rounded-2xl border border-stone-300 bg-white/80 pl-11 pr-4 text-sm text-stone-700 outline-none transition placeholder:text-stone-400 focus:border-stone-500 focus:ring-2 focus:ring-stone-300"
      />
    </label>
  )
}
