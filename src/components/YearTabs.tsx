interface YearTabsProps {
  years: number[]
  activeYear: number
  onChange: (year: number) => void
}

export function YearTabs({ years, activeYear, onChange }: YearTabsProps) {
  return (
    <div className="flex flex-wrap gap-3" aria-label="年份切换">
      {years.map((year) => {
        const isActive = year === activeYear

        return (
          <button
            key={year}
            type="button"
            onClick={() => onChange(year)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? 'border-stone-900 bg-stone-900 text-stone-50 shadow-lg shadow-stone-900/10'
                : 'border-stone-300 bg-white/70 text-stone-600 hover:border-stone-500 hover:text-stone-900'
            }`}
          >
            {year}
          </button>
        )
      })}
    </div>
  )
}
