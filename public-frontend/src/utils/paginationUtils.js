export const getPageList = (currentPage, totalPages) => {
  // Calcula el array de páginas a renderizar.

  // Caso 1: 10 páginas o menos, muestra todos los numeritos de paginas
  if (totalPages <= 10) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // Caso 2: más de 10 páginas
  // Se define una ventana de 3 páginas alrededor de la actual: anterior, actual, siguiente
  // Se quitan los que caen fuera del rango
  const window = [currentPage - 1, currentPage, currentPage + 1].filter(p => p > 1 && p < totalPages)

  const pagesList = []

  // La primera página siempre se muestra
  pagesList.push(1)

  // Si la ventana no empieza justo después del 1, agrego '...'
  if (window[0] > 2) pagesList.push('...')

  // Páginas cercanas a la actual
  pagesList.push(...window)

  // Si la ventana no termina justo antes de la última, agrego '...'
  if (window[window.length - 1] < totalPages - 1) pagesList.push('...')

  // La última página siempre se muestra
  pagesList.push(totalPages)

  return pagesList
}