import ProductInfo from './ProductInfo'
import ProductSpecs from './ProductSpecs'

const ProductDetail = ({ productData }) => {
  return (
    <article className="product-article product-detail-right">
      {productData && <ProductInfo info={productData} />}
      {productData.specifications && <ProductSpecs />}
    </article>
  )
}

export default ProductDetail