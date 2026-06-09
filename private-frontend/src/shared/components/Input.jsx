import { forwardRef } from 'react'

const Input = forwardRef(({
  label,
  icon,
  type = 'text',
  id,
  placeholder,
  disabled,
  autoComplete,
  error,
  extraClass,
  ...rest   // para capturar name, onChange, onBlur que vienen de register()
}, ref) => {
  return (
    <div className={extraClass ? `field ${extraClass}` : 'field'}>
      {label && <label className="field-label" htmlFor={id}>{label}</label>}

      <div className={[
        'input-wrap',
        icon ? 'has-icon' : '',
        error ? 'has-error' : '',
      ].filter(Boolean).join(' ')}>

        {icon && <span className="input-icon">{icon}</span>}

        <input
          ref={ref}
          type={type}
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          {...rest}
        />
      </div>

      {error && <span className="field-error">{error}</span>}
    </div>
  )
})

export default Input