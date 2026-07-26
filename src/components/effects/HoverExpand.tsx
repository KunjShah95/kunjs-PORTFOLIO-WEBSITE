import { useRef, useCallback } from 'react'
import { clsx } from 'clsx'

interface HoverExpandProps {
  header: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function HoverExpand({ header, children, className }: HoverExpandProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const expandedRef = useRef(false)

  const onEnter = useCallback(() => {
    expandedRef.current = true
    if (contentRef.current) {
      contentRef.current.style.maxHeight = '500px'
      contentRef.current.style.opacity = '1'
    }
  }, [])

  const onLeave = useCallback(() => {
    expandedRef.current = false
    if (contentRef.current) {
      contentRef.current.style.maxHeight = '0px'
      contentRef.current.style.opacity = '0'
    }
  }, [])

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={clsx(
        'relative w-full overflow-hidden transition-all duration-base ease-out-soft',
        className
      )}
    >
      <div>{header}</div>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-out-soft"
        style={{ maxHeight: 0, opacity: 0 }}
      >
        <div className="pt-3">{children}</div>
      </div>
    </div>
  )
}
