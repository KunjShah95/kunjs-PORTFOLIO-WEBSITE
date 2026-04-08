const MONTHS: Record<string, string> = {
  JAN: '01',
  FEB: '02',
  MAR: '03',
  APR: '04',
  MAY: '05',
  JUN: '06',
  JUL: '07',
  AUG: '08',
  SEP: '09',
  OCT: '10',
  NOV: '11',
  DEC: '12',
}

/**
 * Normalizes portfolio blog dates (`JAN 2026` or `2026-01-15`) to `YYYY-MM-DD` for schema.org.
 */
export function blogDateToIsoDate(raw: string): string {
  const trimmed = raw.trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed
  }
  const mshort = /^([A-Za-z]{3})\s+(\d{4})$/.exec(trimmed)
  if (mshort) {
    const mon = mshort[1].toUpperCase()
    const year = mshort[2]
    const mm = MONTHS[mon] ?? '01'
    return `${year}-${mm}-01`
  }
  return trimmed
}

/** ISO date at noon UTC for Open Graph `article:*_time` (valid W3C date). */
export function isoDateToOgDateTime(isoDate: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
    return new Date().toISOString()
  }
  return `${isoDate}T12:00:00.000Z`
}
