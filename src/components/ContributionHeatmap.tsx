import { useMemo } from 'react'

interface ContributionHeatmapProps {
  cells?: number
  cols?: number
}

/**
 * Deterministic GitHub-style contribution heatmap. Opacities are computed
 * from a fixed formula so the grid is stable across renders (SSR-safe).
 * Ported from the imported design's data-op heatmap.
 */
export function ContributionHeatmap({ cells = 98, cols = 14 }: ContributionHeatmapProps) {
  const ops = useMemo(() => {
    return Array.from({ length: cells }, (_, i) => {
      const r = ((i * 53 + (i % 7) * 17 + Math.floor(i / 7) * 29) % 100) / 100
      if (r < 0.44) return 0.06
      if (r < 0.66) return 0.16
      if (r < 0.83) return 0.34
      if (r < 0.94) return 0.6
      return 0.9
    })
  }, [cells])

  return (
    <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {ops.map((op, i) => (
        <div
          key={i}
          className="aspect-square rounded-[3px] bg-accent"
          style={{ opacity: op }}
        />
      ))}
    </div>
  )
}
