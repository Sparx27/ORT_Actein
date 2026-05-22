import ContentBox from '../../shared_components/ContentBox'
import SvgTag from '../../shared_components/svg/SvgTag'
import SvgWrench from '../../shared_components/svg/SvgWrench'

/*
<div class="info-card-body">
  <div class="product-tags">
    <span class="tag-cat">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
        <line x1="7" y1="7" x2="7.01" y2="7"/>
      </svg>
      Cámaras frigoríficas
    </span>
    <span class="tag-install">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
      Requiere instalación
    </span>
  </div>

  <h1 class="product-title">BHT-20 Cámara Frigorífica Modular</h1>
  <p class="product-brand">Bohn</p>

  <!-- DESCRIPCION: campo nuevo en public.PRODUCTO (pendiente en DDL) -->
  <p class="product-description" id="productDescription">
  Cámara frigorífica modular de alta eficiencia diseñada para la conservación de alimentos perecederos en entornos comerciales e industriales. Ideal para supermercados, restaurantes, hoteles y depósitos que requieren temperatura controlada de forma continua y confiable.
  </p>
</div>
*/
const ProductInfo = () => {
  return (
    <ContentBox design={'product-info'}>
      <ul className="product-info-tags">
        <li className="product-info-tag-cat">
          <SvgTag />
          Cámaras frigoríficas
        </li>
        <li className="product-info-tag-install">
          <SvgWrench w={'11'} h={'11'} />
          Requiere instalación
        </li>
      </ul>

      <h1 className="product-info-title">BHT-20 Cámara Frigorífica Modular</h1>
      <p className="product-info-brand">Bohn</p>

      <p className="product-info-description">
        Cámara frigorífica modular de alta eficiencia diseñada para la conservación de alimentos perecederos en entornos comerciales e industriales. Ideal para supermercados, restaurantes, hoteles y depósitos que requieren temperatura controlada de forma continua y confiable.
      </p>
    </ContentBox>

  )
}

export default ProductInfo