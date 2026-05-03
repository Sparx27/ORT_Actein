import '../../styles/catalog.css'
import Catalog from './Catalog'
import FormSearch from './FormSearch'

const CatalogPage = () => {
  return (
    <main>
      <FormSearch />
      <Catalog />
    </main>
  )
}

export default CatalogPage