import React from 'react'

const EntityFormHeader = ({ title, icon }) => {
  return (
    <div className="entity-form-header">
      {icon && <div className="entity-form-header-icon">{icon}</div>}
      {title && <div className="h1 entity-form-header-title">{title}</div>}
    </div>
  )
}

export default EntityFormHeader