import ContentBox from '../../shared_components/ContentBox'
import ImagePlaceholder from '../../shared_components/ImagePlaceholder'
import SvgImagePlaceholder from '../../shared_components/svg/SvgImagePlaceholder'


const ProductImage = ({ src = null, productTitle = '' }) => {
  const imgAlt = `Imágen del producto ${productTitle}`

  return (
    <ContentBox>
      <figure className="product-detail-figure">
        {
          src ? (
            <img src={src} alt={imgAlt} />
          ) : (
            <ImagePlaceholder>
              <SvgImagePlaceholder />
            </ImagePlaceholder>
          )
        }
      </figure>
    </ContentBox>

  )
}

export default ProductImage