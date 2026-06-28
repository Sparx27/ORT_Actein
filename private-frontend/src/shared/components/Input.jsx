const Input = ({
  label,
  icon,
  type = 'text',
  id,
  placeholder,
  disabled = false,
  autoComplete = 'true',
  error = false,
  extraClass,
  ref,        // ahora ref es un prop normal (React 19)
  ...rest     // name, onChange, onBlur que vienen de register()
}) => {
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
}

export default Input