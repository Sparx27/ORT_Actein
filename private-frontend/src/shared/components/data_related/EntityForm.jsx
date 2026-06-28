import { Controller } from 'react-hook-form'
import Input from '../Input'
import MessageBox from '../MessageBox'
import TextArea from '../TextArea'
import ComboBox from '../ComboBox'
import CustomSelect from '../CustomSelect'
import Checkbox from '../Checkbox'
import ControlledTextArea from '../ControlledTextArea'
import ControlledCheckbox from '../ControlledCheckbox'

const EntityForm = ({
  formId,
  controls = [],
  apiRes,
  apiResType,
  register,
  control,
  errors,
  submitHandler,
  isLoadingData = false
}) => {
  return (
    <form id={formId} onSubmit={submitHandler}>

      {apiRes && (
        <div style={{ marginBottom: '15px' }}>
          <MessageBox message={apiRes} type={apiResType} />
        </div>
      )}

      {controls?.length > 0 && (
        controls.map((c) => {
          const { controlType } = c
          if (controlType === 'input') {
            return (
              <div key={c.name} className="e-control-space">
                <Controller
                  name={c.name}
                  control={control}
                  rules={c.validations}
                  render={({ field, fieldState }) => (
                    <Input
                      label={c.label}
                      type={c.type}
                      id={c.name}
                      name={field.name}
                      autoComplete="true"
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      inputRef={field.ref}
                      error={fieldState.error?.message}
                      disabled={isLoadingData}
                    />
                  )}
                />
              </div>
            )
          }

          if (controlType === 'textarea') {
            return (
              <div key={c.name} className="e-control-space">
                <Controller
                  name={c.name}
                  control={control}
                  rules={c.validations}
                  render={({ field, fieldState }) => (
                    <ControlledTextArea
                      label={c.label}
                      id={c.name}
                      name={field.name}
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      inputRef={field.ref}
                      error={fieldState.error?.message}
                      disabled={isLoadingData}
                    />
                  )}
                />
              </div>
            )
          }

          if (controlType === 'select') {
            return (
              <div key={c.name} className="e-control-space">
                <Controller
                  name={c.name}
                  control={control}
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
                      disabled={isLoadingData}
                    />
                  )}
                />
              </div>
            )
          }

          if (controlType === 'checkbox') {
            return (
              <div key={c.name} className="e-control-space">
                <Controller
                  name={c.name}
                  control={control}
                  rules={c.validations}
                  render={({ field, fieldState }) => (
                    <ControlledCheckbox
                      label={c.label}
                      id={c.name}
                      name={field.name}
                      extraClass={'data-filters-options'}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      onBlur={field.onBlur}
                      inputRef={field.ref}
                      error={fieldState.error?.message}
                      disabled={isLoadingData}
                    />
                  )}
                />
              </div>
            )
          }

          if (controlType === 'combobox') {
            return (
              <div key={c.name} className="e-control-space">
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
                      disabled={isLoadingData}
                    />
                  )}
                />
              </div>
            )
          }

          return null
        })
      )}

    </form>
  )
}

export default EntityForm