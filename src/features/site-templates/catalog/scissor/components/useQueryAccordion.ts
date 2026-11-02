'use client'
import { useSyncExternalStore } from 'react'

const changeEvent = 'scissor:accordion-query-change'

/** 缺省展开首项；空值、错误前缀和越界值均表示没有展开项。 */
export function parseAccordionValue(value: string | null, prefix: string, count: number): number | null {
  if (value === null) return count > 0 ? 0 : null
  if (!value.toLowerCase().startsWith(prefix.toLowerCase())) return null
  const digits = value.slice(prefix.length)
  if (!/^[1-9]\d*$/.test(digits)) return null
  const index = Number(digits) - 1
  return Number.isSafeInteger(index) && index < count ? index : null
}

function subscribe(notify: () => void): () => void {
  window.addEventListener('popstate', notify)
  window.addEventListener(changeEvent, notify)
  return () => {
    window.removeEventListener('popstate', notify)
    window.removeEventListener(changeEvent, notify)
  }
}

/** URL 是展开状态的唯一来源，避免本地状态与可分享链接相互漂移。 */
export function useQueryAccordion(parameter: string, prefix: string, count: number): readonly [number | null, (index: number | null) => void] {
  const open = useSyncExternalStore(
    subscribe,
    () => parseAccordionValue(new URLSearchParams(window.location.search).get(parameter), prefix, count),
    () => count > 0 ? 0 : null,
  )
  const setOpen = (index: number | null): void => {
    if (index !== null && (!Number.isInteger(index) || index < 0 || index >= count)) throw new RangeError('折叠项目索引越界')
    const url = new URL(window.location.href)
    url.searchParams.set(parameter, index === null ? '' : prefix + String(index + 1))
    window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash)
    window.dispatchEvent(new Event(changeEvent))
    console.debug('[scissor:accordion]', { parameter, value: index === null ? '' : prefix + String(index + 1) })
  }
  return [open, setOpen] as const
}
