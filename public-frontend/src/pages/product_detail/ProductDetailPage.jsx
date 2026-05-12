import { useParams } from 'react-router-dom'
import Container from '../../shared_components/Container'
import { useEffect, useState } from 'react'
import '../../styles/productDetail.css'
import ProductImage from './ProductImage'
import ProductActions from './ProductActions'
import ProductServices from './ProductServices'
import ProductInfo from './ProductInfo'
import ProductSpecs from './ProductSpecs'

const PRODUCT = {
  'id': 1,
  'sku': 'CAM-HIKVISION-2MP-001',
  'nombre': 'Cámara Domo IP 2MP',
  'categoria_nombre': 'Aires',
  'marca': 'Hikvision',
  'descripcion': 'Cámara de vigilancia domo para interiores con resolución Full HD, visión nocturna IR y compresión H.265+.',
  'especificaciones': 'Resolución: 1920x1080 | IR: 30m | Lente: 2.8mm | IP67 | PoE | H.265+',
  'instalacion': true,
  'activo': true,
  'creado': '2025-03-15T10:42:00'
}

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    setProduct(PRODUCT)
  }, [id])

  /*
  {
    !product ? (
      <p>Cargando...</p>
    ) : (
      <>
        <p>{product.nombre}</p>
        <p>{product.categoria_nombre}</p>
        <p>{product.marca}</p>
        <p>{product.descripcion}</p>
        <p>{product.instalacion}</p>
      </>
    )
  }
  */

  return (
    <section className="product-detail page-padding">
      <Container>
        <div className="product-detail-grid">
          <aside className="product-detail-left">
            <ProductImage src={null} productTitle={''} />
            <ProductActions />
            <ProductServices />
          </aside>

          <article className="product-article product-detail-right">
            <ProductInfo />
            <ProductSpecs />
          </article>
        </div>
      </Container>
    </section>
  )
}

export default ProductDetailPage