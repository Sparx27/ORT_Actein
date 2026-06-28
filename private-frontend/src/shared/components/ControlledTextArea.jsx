const ControlledTextArea = ({
  label,
  id,
  name,
  placeholder,
  disabled,
  rows = 4,
  error,
  extraClass,
  value = '',
  onChange,
  onBlur,
  inputRef,   // field.ref
}) => {
  return (
    <div className={extraClass ? `field ${extraClass}` : 'field'}>
      {label && <label className="field-label" htmlFor={id}>{label}</label>}

      <div className={[
        'textarea-wrap',
        error ? 'has-error' : '',
      ].filter(Boolean).join(' ')}>

        <textarea
          ref={inputRef}
          id={id}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>

      {error && <span className="field-error">{error}</span>}
    </div>
  )
}

export default ControlledTextArea