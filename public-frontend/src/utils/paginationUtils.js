export const getPageList = (currentPage, totalPages) => {
  // Caso 1: 10 páginas o menos, mostramos todas
  if (totalPages <= 10) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const pagesList = []

  // Calculamos la ventana de páginas a mostrar (7 páginas)
  let windowStart, windowEnd

  if (currentPage <= 5) {
    // Cerca del inicio: ventana fija al principio
    windowStart = 1
    windowEnd = 8
  } else if (currentPage >= totalPages - 4) {
    // Cerca del final: ventana fija al final
    windowStart = totalPages - 7
    windowEnd = totalPages
  } else {
    // En el medio: ventana centrada en currentPage (3 antes y 3 después)
    windowStart = currentPage - 3
    windowEnd = currentPage + 3
  }

  // Primera página y "..." si la ventana no incluye el inicio
  if (windowStart > 1) {
    pagesList.push(1)
    if (windowStart > 2) pagesList.push('...')
  }

  // Ventana
  for (let i = windowStart; i <= windowEnd; i++) {
    pagesList.push(i)
  }

  // "..." y última página si la ventana no incluye el final
  if (windowEnd < totalPages) {
    if (windowEnd < totalPages - 1) pagesList.push('...')
    pagesList.push(totalPages)
  }

  return pagesList
}