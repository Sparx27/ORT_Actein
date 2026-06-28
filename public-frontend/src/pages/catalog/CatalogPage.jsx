import ProductsList from './ProductsList'
import '../../styles/catalog.css'
import Container from '../../shared_components/Container'
import CatalogFilter from './CatalogFilter'
import CatalogSearch from './CatalogSearch'

const CatalogPage = () => {
  return (
    <section>
      <CatalogSearch />
      <Container>
        <div className="catalog-products page-padding">
          <CatalogFilter />
          <ProductsList />
        </div>
      </Container>
    </section>
  )
}

export default CatalogPage