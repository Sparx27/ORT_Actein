import ContentBox from '../../shared_components/ContentBox'
import SvgTag from '../../shared_components/svg/SvgTag'
import SvgWrench from '../../shared_components/svg/SvgWrench'

const ProductInfo = ({ info }) => {
  console.log(info)
  return (
    <ContentBox design={'product-info'}>
      <ul className="product-info-tags">
        { }
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