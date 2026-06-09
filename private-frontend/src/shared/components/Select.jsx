import { forwardRef } from 'react'

const Select = forwardRef(({
  label,
  id,
  placeholder,
  disabled,
  error,
  options = [],     // [{ value, label }]
  extraClass,
  ...rest           // name, onChange, onBlur que vienen de register()
}, ref) => {
  return (
    <div className={extraClass ? `field ${extraClass}` : 'field'}>
      {label && <label className="field-label" htmlFor={id}>{label}</label>}

      <div className={[
        'select-wrap',
        error ? 'has-error' : '',
      ].filter(Boolean).join(' ')}>

        <select
          ref={ref}
          id={id}
          disabled={disabled}
          defaultValue=""
          {...rest}
        >
          {placeholder && (
            <option value="" disabled hidden>{placeholder}</option>
          )}

          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <span className="select-icon">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>

      {error && <span className="field-error">{error}</span>}
    </div>
  )
})

export default Select