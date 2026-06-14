import { Controller, useForm } from 'react-hook-form'
import Input from '../Input'
import MessageBox from '../MessageBox'
import TextArea from '../TextArea'
import Modal from '../Modal'
import Select from '../Select'
import ComboBox from '../ComboBox'


// useForm({ values }) → objeto con la forma { name: 'Cat1', dsc: 'Una dsc' }
// Las keys tienen que coincidir con los name de los register)
const EntityForm = ({ onSubmit, apiRes, apiResType, controls = [], values, formId }) => {
  const { register, handleSubmit, formState, control } = useForm({ values })

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>

      {apiRes && (
        <MessageBox message={apiRes} type={apiResType} />
      )}

      {controls?.length > 0 && (
        controls.map((c, i) => {
          const { controlType } = c
          if (controlType === 'input') {
            return (
              <div key={`econtrol${i}`} className="e-control-space">
                <Input
                  label={c.label}
                  type={c.type}
                  id={c.name}
                  autoComplete="true"
                  {...register(c.name)}
                />
              </div>
            )
          }

          if (controlType === 'textarea') {
            return (
              <div key={`econtrol${i}`} className="e-control-space">
                <TextArea
                  label={c.label}
                  id={c.name}
                  {...register(c.name)}
                />
              </div>
            )
          }

          if (controlType === 'select') {
            return (
              <div key={`econtrol${i}`} className="e-control-space">
                <Select
                  label={c.label}
                  id={c.name}
                  placeholder={c.placeholder}
                  options={c.options}
                  {...register(c.name)}
                />
              </div>
            )
          }

          if (controlType === 'combobox') {
            return (
              <div key={`econtrol${i}`} className="e-control-space">
                <Controller
                  name={c.name}
                  control={control}
                  render={({ field, fieldState }) => (
                    <ComboBox
                      label={c.label}
                      id={c.name}
                      placeholder={c.placeholder}
                      options={c.options}
                      value={field.value}
                      onChange={field.onChange}
                      error={fieldState.error?.message}
                    />
                  )}
                />
              </div>
            )
          }
        })
      )}

    </form>
  )
}

export default EntityForm