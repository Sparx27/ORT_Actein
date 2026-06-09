import { useForm } from 'react-hook-form'
import Input from '../Input'
import { useState } from 'react'
import MessageBox from '../MessageBox'
import TextArea from '../TextArea'
import Modal from '../Modal'

const EntityForm = ({ title, onSubmit, apiRes, apiResType, controls = [] }) => {
  const { register, handleSubmit, formState } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

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
                  autoComplete
                  {...register(c.name)}
                />
              </div>

            )
          }
        })
      )}


      <TextArea
        label="Descripción"
        id="dsc"
        {...register('dsc')}
      />
    </form>
  )
}

export default EntityForm