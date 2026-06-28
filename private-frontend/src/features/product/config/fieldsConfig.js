export const URL_PARAMS = {
  URL_PAGE: 'pagina',
  URL_SEARCH: 'busqueda',
  URL_CATEGORY: 'categoria',
  URL_BRAND: 'marca',
  URL_IS_ACTIVE: 'activo',
}

export const API_FIELDS = {
  API_PAGE: 'page',
  API_SEARCH: 'search',
  API_CATEGORY: 'category_id',
  API_BRAND: 'brand',
  API_IS_ACTIVE: 'is_active',
}

export const FILTER_PARAMS = {
  [API_FIELDS.API_SEARCH]: URL_PARAMS.URL_SEARCH,
  [API_FIELDS.API_CATEGORY]: URL_PARAMS.URL_CATEGORY,
  [API_FIELDS.API_BRAND]: URL_PARAMS.URL_BRAND,
  [API_FIELDS.API_IS_ACTIVE]: URL_PARAMS.URL_IS_ACTIVE,
}