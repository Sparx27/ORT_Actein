const ControlledInput = ({
  label,
  icon,
  type = 'text',
  id,
  name,
  placeholder,
  disabled = false,
  autoComplete = 'true',
  error = false,
  extraClass,
  value = '',
  onChange,
  onBlur,
  inputRef,
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
          ref={inputRef}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>

      {error && <span className="field-error">{error}</span>}
    </div>
  )
}

export default ControlledInput