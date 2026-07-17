import { useState } from 'react'
import { Search } from 'lucide-react'

interface ProjectFiltersProps {
  onFilterChange: (filter: string) => void
  onSearchChange: (search: string) => void
}

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'AI_ML', label: 'AI/ML' },
  { id: 'Agents', label: 'Agents' },
  { id: 'Computer Vision', label: 'Computer Vision' },
  { id: 'Full Stack', label: 'Full Stack' },
  { id: 'Automation', label: 'Automation' },
]

export function ProjectFilters({ onFilterChange, onSearchChange }: ProjectFiltersProps) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [search, setSearch] = useState('')

  const handleFilterClick = (id: string) => {
    setActiveFilter(id)
    onFilterChange(id)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    onSearchChange(value)
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-secondary" />
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2.5 bg-elevated border border-rule/12 rounded-lg text-sm text-ink-primary placeholder:text-ink-secondary focus:border-accent/50 focus:outline-none transition-colors"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleFilterClick(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeFilter === cat.id
                ? 'bg-accent text-white'
                : 'bg-elevated border border-rule/12 text-ink-secondary hover:text-ink-primary hover:border-accent/30'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  )
}