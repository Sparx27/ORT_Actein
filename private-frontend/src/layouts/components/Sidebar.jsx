import BrandLogo from '../../shared/components/BrandLogo'
import SidebarNav from './SidebarNav'

const Sidebar = ({ open }) => {
  return (
    <aside className={`main-layout-sidebar${open ? ' open' : ''}`}>
      <div className="sidebar-brand">
        <BrandLogo />
      </div>
      <SidebarNav />
    </aside>
  )
}

export default Sidebar