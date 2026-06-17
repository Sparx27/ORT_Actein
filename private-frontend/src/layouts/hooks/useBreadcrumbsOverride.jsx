// useBreadcrumbOverride.js
import { useEffect } from 'react'
import { useBreadcrumbContext } from './useBreadcrumbContext'

export function useBreadcrumbOverride(path, label) {
  const { setOverrides } = useBreadcrumbContext()

  useEffect(() => {
    if (!path) return

    setOverrides(prev => ({ ...prev, [path]: label }))

    return () => {
      setOverrides(prev => {
        const next = { ...prev }
        delete next[path]
        return next
      })
    }
  }, [path, label, setOverrides])
}