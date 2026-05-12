import Button from '../../shared_components/Button'
import ContentBox from '../../shared_components/ContentBox'
import SvgAdd from '../../shared_components/svg/SvgAdd'
import SvgInfo from '../../shared_components/svg/SvgInfo'

const ProductActions = () => {
  return (
    <ContentBox design={'product-actions-box'}>
      <div className="product-actions-note">
        <SvgInfo />
        <p>El precio está disponible previa consulta. Podés agregar este producto a tu lista y enviarnos la solicitud.</p>
      </div>
      <Button primary>
        <SvgAdd />
        Agregar a lista de cotización
      </Button>
    </ContentBox>
  )
}

export default ProductActions