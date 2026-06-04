import SvgPC from './svgs/SvgPC'

const BrandLogo = () => {
  return (
    <div className="brand-container">
      <div className="brand-icon">
        <SvgPC />
      </div>
      <div>
        <div className="brand-name">Sistema Interno</div>
        <div className="brand-sub">Gestión comercial</div>
      </div>
    </div>
  )
}

export default BrandLogo