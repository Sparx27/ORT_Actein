import Button from '../Button'
import ContentBox from '../ContentBox'
import Input from '../Input'

/*
ejemplo de controls:
const filterControls = [
  {
    type: 'text',
    placeholder: 'Buscar por nombre',
    icon: <SvgSearch />,
    onChange: () => console.log('buscar')
  },
  {
    type: 'select',
    placeholder: 'Seleccionar categoría',
    onChange: () => console.log('buscar')
  }
]
*/
const EntityFilters = ({ controls = null, onSubmit }) => {
  if (!controls) return null

  return (
    <div className="data-filters-container">
      <ContentBox>
        <form
          className="data-filters"
          onSubmit={onSubmit}
        >
          {controls.map((c, i) => {
            if (c.type === 'text') {
              return <Input
                key={`control-${i}`}
                icon={c.icon}
                type="text"
                id={c.name}
                placeholder={c.placeholder}
                disabled={false}
                autoComplete="true"
                error={false}
                extraClass={'data-filters-input'}
              />
            }

            return null
          })}

          <div className="data-filters-divider"></div>

          <div className="data-filters-actions">
            <Button variant="ghost">Limpiar</Button>
            <Button type="submit">Buscar</Button>
          </div>
        </form>
      </ContentBox>
    </div>
  )
}

export default EntityFilters