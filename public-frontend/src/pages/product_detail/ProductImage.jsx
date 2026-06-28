import ContentBox from '../../shared_components/ContentBox'
import ImagePlaceholder from '../../shared_components/ImagePlaceholder'
import SvgImagePlaceholder from '../../shared_components/svg/SvgImagePlaceholder'

/*
const ProductImage = ({ src, productTitle }) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="product-image-wrapper">
      // El skeleton se muestra mientras loaded es false
      {!loaded && <div className="skeleton" />}

      <img
        src={src}
        alt={productTitle}
        // onLoad se dispara cuando la imagen terminó de cargar.
        // Ahí ocultás el skeleton.
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          e.target.src = '/placeholder-product.png'
          setLoaded(true)
        }}
        style={{ display: loaded ? 'block' : 'none' }}
      />
    </div>
  )
}
*/

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