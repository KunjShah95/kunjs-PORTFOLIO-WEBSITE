import { getSearchIndex } from '@/lib/content'
import { CommandPalette } from '@/components/palette/CommandPalette'
import { MastheadBar } from './MastheadBar'

/** Server wrapper. Reads the content index once and hands it to the
 *  interactive bar, so the palette's dataset ships with the document
 *  rather than being fetched on first open. */
export function Masthead() {
  return (
    <>
      <MastheadBar records={getSearchIndex()} />
    </>
  )
}

export { CommandPalette }
