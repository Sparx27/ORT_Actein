import { Controller } from 'react-hook-form'
import Button from '../Button'
import ComboBox from '../ComboBox'
import ContentBox from '../ContentBox'
import Input from '../Input'
import Select from '../Select'
import Checkbox from '../Checkbox'
import CustomSelect from '../CustomSelect'

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
const EntityFilters = ({ controls = null, onSubmit, register, reset, isLoading }) => {
  if (!controls) return null

  return (
    <div className="data-filters-container">
      <ContentBox design={'no-hidden'}>
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
                extraClass={c.name === 'search' ? 'data-filters-input' : 'data-filters-options'}
                {...register(c.name)}
              />
            }

            if (c.type === 'combobox') {
              return <Controller
                key={`control-${i}`}
                name={c.name}
                control={c.control}
                render={({ field }) => (
                  <ComboBox
                    id={c.name}
                    placeholder={c.placeholder}
                    options={c.options}
                    value={field.value}
                    onChange={field.onChange}
                    extraClass={'data-filters-options'}
                  />
                )}
              />
            }

            if (c.type === 'select') {
              return <Controller
                key={`control-${i}`}
                name={c.name}
                control={c.control}
                render={({ field }) => (
                  <CustomSelect
                    id={c.name}
                    placeholder={c.placeholder}
                    defaultOpt={c.defaultOpt}
                    options={c.options}
                    value={field.value}
                    onChange={field.onChange}
                    extraClass={'data-filters-options'}
                  />
                )}
              />
            }

            if (c.type === 'checkbox') {
              return <Checkbox
                key={`control-${i}`}
                label={c.label}
                id={c.name}
                extraClass={'data-filters-options'}
                {...register(c.name)}
              />
            }

            return null
          })}

          <div className="data-filters-divider"></div>

          <div className="data-filters-actions">
            <Button type="button" variant="ghost" onClick={reset}>Limpiar</Button>
            <Button type="submit" loading={isLoading}>Buscar</Button>
          </div>
        </form>
      </ContentBox>
    </div>
  )
}

export default EntityFilters