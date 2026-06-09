// useBreadcrumbContext.js
import { useContext } from 'react'
import BreadcrumbContext from '../context/BreadcrumbContext'

export function useBreadcrumbContext() {
  return useContext(BreadcrumbContext)
}