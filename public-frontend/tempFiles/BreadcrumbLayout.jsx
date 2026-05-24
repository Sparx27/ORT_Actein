import { Outlet } from 'react-router-dom'
import Breadcrumb from './Breadcrumb'

const BreadcrumbLayout = () => {
  return (
    <>
      <Breadcrumb />  {/* ← acá pero necesita saber qué items mostrar */}
      <Outlet />
    </>
  )
}