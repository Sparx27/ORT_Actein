import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import SidebarOverlay from './components/SidebarOverlay'
import { useSidebar } from './hooks/useSidebar'
import BottomNav from './components/BottomNav'
import SvgSales from '../shared/components/svgs/SvgSales'
import SvgIndex from '../shared/components/svgs/SvgIndex'
import SvgProducts from '../shared/components/svgs/SvgProducts'
import SvgTag from '../shared/components/svgs/SvgTag'

const MainLayout = () => {
  const { open, closeSidebar, toggleSidebar } = useSidebar()

  const bottomTabs = [
    { to: '/', label: 'Inicio', icon: <SvgIndex /> },
    { to: '/procesos', label: 'Procesos', icon: <SvgSales /> },
    { to: '/productos', label: 'Productos', icon: <SvgProducts /> },
    { to: '/categorias', label: 'Categorías', icon: <SvgTag /> },
  ]

  return (
    <div className="main-layout-grid">
      <Sidebar open={open} />
      <SidebarOverlay open={open} onClose={closeSidebar} />

      <main className="main-layout">
        <Outlet />
      </main>
      <BottomNav tabs={bottomTabs} onMore={toggleSidebar} />
    </div>
  )
}

export default MainLayout