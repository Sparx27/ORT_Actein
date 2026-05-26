export const parseSpecs = (str) => {
  if (!str) return null

  const key_value = str.split(',')
  const res = key_value.map(lv => {
    const [a, b] = lv.split(':')
    return [a, b]
  })
  return res
}

const PARAM_MAP = {
  page: 'pagina',
  category_id: 'categoria',
  brand: 'marca',
  search: 'busqueda',
  installation: 'instalacion',
}

export const buildCatalogPath = (params = {}) => {
  const search = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') return
    const urlKey = PARAM_MAP[key] ?? key
    search.set(urlKey, value)
  })

  const qs = search.toString()
  return qs ? `/productos?${qs}` : '/productos'
}