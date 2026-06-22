import { Controller, useForm } from 'react-hook-form'
import Input from '../Input'
import MessageBox from '../MessageBox'
import TextArea from '../TextArea'
import Modal from '../Modal'
import Select from '../Select'
import ComboBox from '../ComboBox'
import CustomSelect from '../CustomSelect'
import Checkbox from '../Checkbox'
import { useEffect } from 'react'


// useForm({ values }) → objeto con la forma { name: 'Cat1', dsc: 'Una dsc' }
// Las keys tienen que coincidir con los name de los register)
const EntityForm = ({ onSubmit, apiRes, apiResType, controls = [], values, formId, isSuccess }) => {
  const { register, handleSubmit, formState: { errors }, control, reset } = useForm({ values })

  useEffect(() => {
    if (isSuccess) reset()
  }, [isSuccess, reset])

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>

      {apiRes && (
        <div style={{ marginBottom: '15px' }}>
          <MessageBox message={apiRes} type={apiResType} />
        </div>
      )}

      {controls?.length > 0 && (
        controls.map((c, i) => {
          const { controlType } = c

          if (controlType === 'input') {
            return (
              <div key={`econtrol${i}`} className="e-control-space">
                <Input
                  {...register(c.name, c.validations)}
                  label={c.label}
                  type={c.type}
                  id={c.name}
                  autoComplete="true"
                  error={errors[c.name]?.message}
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
                  {...register(c.name, c.validations)}
                  error={errors[c.name]?.message}
                />
              </div>
            )
          }

          if (c.type === 'select') {
            return (
              <div key={`econtrol${i}`} className="e-control-space">
                <Controller
                  name={c.name}
                  control={c.control}
                  rules={c.validations}
                  render={({ field, fieldState }) => (
                    <CustomSelect
                      id={c.name}
                      placeholder={c.placeholder}
                      defaultOpt={c.defaultOpt}
                      options={c.options}
                      value={field.value}
                      onChange={field.onChange}
                      extraClass={'data-filters-options'}
                      error={fieldState.error?.message}
                    />
                  )}
                />
              </div>
            )
          }

          if (controlType === 'checkbox') {
            return (
              <div key={`econtrol${i}`} className="e-control-space">
                <Checkbox
                  label={c.label}
                  id={c.name}
                  extraClass={'data-filters-options'}
                  {...register(c.name, c.validations)}
                  error={errors[c.name]?.message}
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
                  rules={c.validations}
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