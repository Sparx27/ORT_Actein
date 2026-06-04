import SvgBusiness from '../../shared/components/svgs/SvgBusiness'
import SvgWrench from '../../shared/components/svgs/SvgWrench'
import SvgIndex from '../../shared/components/svgs/SvgIndex'
import SvgPerson from '../../shared/components/svgs/SvgPerson'
import SvgProducts from '../../shared/components/svgs/SvgProducts'
import SvgSales from '../../shared/components/svgs/SvgSales'
import SvgTag from '../../shared/components/svgs/SvgTag'
import NavItem from './NavItem'
import NavSection from './NavSection'

const SidebarNav = () => {
  return (
    <nav className="sidebar-nav">
      <NavSection label="Principal">
        <NavItem to="/" icon={<SvgIndex />}>Inicio</NavItem>
        <NavItem to="/ventas" icon={<SvgSales />}>Procesos de venta</NavItem>
        <NavItem to="/empresas" icon={<SvgBusiness />}>Empresas</NavItem>
        <NavItem to="/contactos" icon={<SvgPerson />}>Contactos</NavItem>
      </NavSection>

      <NavSection label="Catálogo">
        <NavItem to="/productos" icon={<SvgProducts />}>Productos</NavItem>
        <NavItem to="/categorias" icon={<SvgTag />}>Categorías</NavItem>
        <NavItem to="/servicios" icon={<SvgWrench />}>Servicios</NavItem>
      </NavSection>
    </nav>
  )
}

export default SidebarNav