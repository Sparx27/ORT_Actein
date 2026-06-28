import ProductInfo from './ProductInfo'
import ProductSpecs from './ProductSpecs'

const ProductDetail = ({ productData }) => {
  return (
    <article className="product-article product-detail-right">
      {productData && <ProductInfo info={productData} />}
      {productData.specifications && <ProductSpecs specifications={productData.specifications} />}
    </article>
  )
}

export default ProductDetail