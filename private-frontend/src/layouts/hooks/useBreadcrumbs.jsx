// useBreadcrumbs.js
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

function formatSegment(seg) {
  const text = decodeURIComponent(seg).replace(/-/g, ' ')
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function useBreadcrumbs(overrides = {}) {
  const { pathname } = useLocation()
  const overridesKey = JSON.stringify(overrides)

  return useMemo(() => {
    const segments = pathname.split('/').filter(Boolean)

    return segments.reduce((acc, seg, i) => {
      const currentPath = acc.path + '/' + seg
      const isLast = i === segments.length - 1
      const label = overrides[currentPath] ?? formatSegment(seg)

      return {
        path: currentPath,
        items: [...acc.items, { label, path: currentPath, isLast }]
      }
    }, { items: [], path: '' }).items
  }, [pathname, overridesKey])
}