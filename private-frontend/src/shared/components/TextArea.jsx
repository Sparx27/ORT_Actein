import { forwardRef } from 'react'

const TextArea = forwardRef(({
  label,
  id,
  placeholder,
  disabled,
  rows = 4,
  error,
  extraClass,
  ...rest           // name, onChange, onBlur que vienen de register()
}, ref) => {
  return (
    <div className={extraClass ? `field ${extraClass}` : 'field'}>
      {label && <label className="field-label" htmlFor={id}>{label}</label>}

      <div className={[
        'textarea-wrap',
        error ? 'has-error' : '',
      ].filter(Boolean).join(' ')}>

        <textarea
          ref={ref}
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          {...rest}
        />
      </div>

      {error && <span className="field-error">{error}</span>}
    </div>
  )
})

export default TextArea