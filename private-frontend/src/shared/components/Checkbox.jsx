import { forwardRef } from 'react'

const Checkbox = forwardRef(({
  label,
  id,
  disabled,
  error,
  extraClass,
  ...rest           // name, onChange, onBlur que vienen de register()
}, ref) => {
  return (
    <div className={extraClass ? `field ${extraClass}` : 'field'}>
      <label className={[
        'checkbox-wrap',
        disabled ? 'is-disabled' : '',
        error ? 'has-error' : '',
      ].filter(Boolean).join(' ')} htmlFor={id}>

        <input
          ref={ref}
          type="checkbox"
          id={id}
          disabled={disabled}
          {...rest}
        />

        <span className="checkbox-box">
          <svg className="checkbox-check" width="12" height="12" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>

        {label && <span className="checkbox-label">{label}</span>}
      </label>

      {error && <span className="field-error">{error}</span>}
    </div>
  )
})

export default Checkbox