// Breadcrumb.jsx
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useBreadcrumbContext } from '../hooks/useBreadcrumbContext'
import { useBreadcrumbs } from '../hooks/useBreadcrumbs'

const Breadcrumb = () => {
  const { overrides } = useBreadcrumbContext()
  const items = useBreadcrumbs(overrides)

  if (items.length === 0) return null

  return (
    <div className="breadcrumb-bar">
      <nav className="breadcrumb-inner" aria-label="breadcrumb">
        {items.map((item, i) => (
          <Fragment key={item.path}>
            {i > 0 && <span className="bc-sep">›</span>}
            {item.isLast
              ? <span className="bc-current">{item.label}</span>
              : <Link to={item.path}>{item.label}</Link>}
          </Fragment>
        ))}
      </nav>
    </div>
  )
}

export default Breadcrumb