export const URL_PARAMS = {
  URL_PAGE: 'pagina',
  URL_SEARCH: 'busqueda',
  URL_IS_ACTIVE: 'activo'
}

export const API_FIELDS = {
  API_PAGE: 'page',
  API_SEARCH: 'search',
  API_IS_ACTIVE: 'is_active'
}

export const FILTER_PARAMS = {
  [API_FIELDS.API_SEARCH]: URL_PARAMS.URL_SEARCH,
  [API_FIELDS.API_IS_ACTIVE]: URL_PARAMS.URL_IS_ACTIVE
}