// useBreadcrumbs.js
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

function formatSegment(seg) {
  const text = decodeURIComponent(seg).replace(/-/g, ' ')
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function useBreadcrumbs(overrides = {}) {
  const { pathname } = useLocation()

  // Guardamos el stringify en una variable para poder usarla
  // como dependencia simple sin que el linter se queje.
  const overridesKey = JSON.stringify(overrides)

  return useMemo(() => {
    const segments = pathname.split('/').filter(Boolean)

    // reduce recorre el array acumulando un resultado.
    // acc acá es el array de migas que vamos armando (distinto al acc de antes).
    // El segundo argumento ({ items: [], path: '' }) es el valor inicial.
    // En cada paso: armamos el path acumulado, creamos la miga, la agregamos.
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