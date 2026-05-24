import { Link } from 'react-router-dom'
import '../../styles/breadcrumb.css'
import Container from '../Container'

const Breadcrumb = ({ categoryLabel, productLabel, backPath, categoryPath }) => {
  return (
    <div className="breadcrumb-bar">
      <Container>
        <nav className="breadcrumb-inner">
          <Link to={backPath}>Catálogo</Link>
          <span className="bc-sep">›</span>
          <Link to={categoryPath}>
            <span>{categoryLabel}</span>
          </Link>
          <span className="bc-sep">›</span>
          <span className="bc-current">{productLabel}</span>
        </nav>
      </Container>
    </div>
  )
}
export default Breadcrumb