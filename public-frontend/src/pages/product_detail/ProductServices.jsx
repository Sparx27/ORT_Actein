import ContentBox from '../../shared_components/ContentBox'
import SvgShield from '../../shared_components/svg/SvgShield'
import SvgWrench from '../../shared_components/svg/SvgWrench'

const ProductServices = () => {
  return (
    <ContentBox design={'product-services-box'}>
      <h2 className="h2 upper">Servicios disponibles</h2>

      <div className="service-item">
        <div className="service-icon"><SvgWrench /></div>
        <div>
          <h3>Instalación</h3>
          <p>Contamos con técnicos especializados para la instalación de este equipo.</p>
        </div>
      </div>

      <div className="service-item">
        <div className="service-icon"><SvgShield /></div>
        <div>
          <h3>Mantenimiento</h3>
          <p>Ofrecemos planes de mantenimiento preventivo y correctivo para equipos instalados.</p>
        </div>
      </div>
    </ContentBox>
  )
}

export default ProductServices