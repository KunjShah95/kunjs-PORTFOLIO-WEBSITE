/** Deterministic procedural marks.
 *
 *  Each project gets a small technical drawing generated from its slug: a
 *  7×7 lattice with a seeded subset of nodes and edges. Same slug, same
 *  drawing, on every render and on the server — no images, no layout
 *  shift, no request. It reads as a diagram rather than as decoration. */

const GRID = 7
const STEP = 100 / (GRID - 1)

function hash(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** Small deterministic PRNG so a slug always yields the same drawing. */
function rng(seed: number) {
  let s = seed || 1
  return () => {
    s ^= s << 13
    s ^= s >>> 17
    s ^= s << 5
    s >>>= 0
    return s / 4294967296
  }
}

export type MarkMotif = 'graph' | 'flow' | 'grid' | 'stack' | 'wave'

const MOTIFS: MarkMotif[] = ['graph', 'flow', 'grid', 'stack', 'wave']

export function markMotif(seed: string): MarkMotif {
  return MOTIFS[hash(seed) % MOTIFS.length]
}

export function ProjectMark({
  seed,
  className,
  accent = 0.34,
}: {
  seed: string
  className?: string
  accent?: number
}) {
  const h = hash(seed)
  const next = rng(h)
  const motif = markMotif(seed)

  const nodes: Array<[number, number]> = []
  const count = 7 + Math.floor(next() * 5)
  for (let i = 0; i < count; i++) {
    nodes.push([Math.floor(next() * GRID), Math.floor(next() * GRID)])
  }

  // De-duplicate so the lattice does not stack marks on one cell.
  const seen = new Set<string>()
  const pts = nodes.filter(([x, y]) => {
    const k = `${x}:${y}`
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })

  const edges: Array<[[number, number], [number, number]]> = []
  for (let i = 1; i < pts.length; i++) {
    if (next() > 0.42) edges.push([pts[i - 1], pts[i]])
  }

  return (
    <svg
      className={className}
      viewBox="-6 -6 112 112"
      aria-hidden="true"
      focusable="false"
      shapeRendering="geometricPrecision"
    >
      {/* lattice */}
      <g opacity="0.24">
        {Array.from({ length: GRID }, (_, i) => (
          <g key={i}>
            <line
              x1={0}
              y1={i * STEP}
              x2={100}
              y2={i * STEP}
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <line
              x1={i * STEP}
              y1={0}
              x2={i * STEP}
              y2={100}
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </g>
        ))}
      </g>

      {/* edges */}
      <g opacity={accent + 0.24}>
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={a[0] * STEP}
            y1={a[1] * STEP}
            x2={b[0] * STEP}
            y2={b[1] * STEP}
            stroke="currentColor"
            strokeWidth="0.9"
          />
        ))}
      </g>

      {/* motif overlay */}
      {motif === 'flow' ? (
        <g opacity={accent + 0.4}>
          {[0, 1, 2].map((i) => (
            <line
              key={i}
              x1={i * 33}
              y1={50}
              x2={i * 33 + 26}
              y2={50}
              stroke="currentColor"
              strokeWidth="1.2"
            />
          ))}
        </g>
      ) : null}

      {motif === 'wave' ? (
        <g opacity={accent + 0.4}>
          <path
            d={`M0 50 Q 12.5 ${20 + next() * 30} 25 50 T 50 50 T 75 50 T 100 50`}
            stroke="currentColor"
            strokeWidth="1.1"
            fill="none"
          />
        </g>
      ) : null}

      {motif === 'stack' ? (
        <g opacity={accent + 0.4}>
          {[0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1={10}
              y1={20 + i * 20}
              x2={90 - i * 12}
              y2={20 + i * 20}
              stroke="currentColor"
              strokeWidth="1.2"
            />
          ))}
        </g>
      ) : null}

      {motif === 'grid' ? (
        <g opacity={accent + 0.4}>
          {[25, 50, 75].map((v, i) => (
            <g key={i}>
              <circle cx={v} cy={25} r="2" fill="currentColor" />
              <circle cx={25} cy={v} r="2" fill="currentColor" />
            </g>
          ))}
        </g>
      ) : null}

      {/* nodes */}
      <g>
        {pts.map(([x, y], i) => (
          <rect
            key={i}
            x={x * STEP - 2.4}
            y={y * STEP - 2.4}
            width="4.8"
            height="4.8"
            fill={i === 0 ? 'var(--signal)' : 'currentColor'}
            opacity={i === 0 ? 1 : 0.75}
          />
        ))}
      </g>
    </svg>
  )
}
