import Button from '../Button'
/*
  Expected btnList object:
  {
    label: 'Nueva Categoría',
    icon: <SvgAdd />,
    onClick: handleClick,
    variant: 'primary' / 'ghost'
  }
*/
const EntityPageHeader = ({ title, sub, btnList = [] }) => {
  return (
    <header className="data-header">
      {(title || sub) && (
        <div className="data-header-title">
          {title && <h1 className="h1">{title}</h1>}
          {sub && <p>{sub}</p>}
        </div>
      )}

      {btnList?.length > 0 && (
        <div className="data-header-actions">
          {btnList.map(b =>
            <Button
              key={b.label}
              icon={b.icon}
              onClick={b.onClick}
              variant={b.variant}
              hideTextOnMobile
            >{b.label}</Button>)}
        </div>
      )}
    </header>
  )
}

export default EntityPageHeader