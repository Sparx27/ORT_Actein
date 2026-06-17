import { useState, useRef, useEffect } from 'react'

const CustomSelect = ({
  label,
  id,
  placeholder,
  disabled,
  error,
  options = [],     // [{ value, label }]
  value,            // controlado
  onChange,         // recibe el value elegido
  defaultOpt = '',
  extraClass
}) => {
  const [open, setOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(0)
  const wrapRef = useRef(null)

  const selectedLabel = options.find(o => String(o.value) === String(value))?.label ?? ''

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  })

  function selectOption(opt) {
    onChange(opt.value)
    setOpen(false)
  }

  function handleKeyDown(e) {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter')) {
      e.preventDefault()
      setOpen(true)
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlighted(h => Math.min(h + 1, options.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlighted(h => Math.max(h - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (options[highlighted]) selectOption(options[highlighted])
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div className={extraClass ? `field ${extraClass}` : 'field'}>
      {label && <label className="field-label" htmlFor={id}>{label}</label>}

      <div
        ref={wrapRef}
        className={[
          'cuselect-wrap',
          open ? 'is-open' : '',
          error ? 'has-error' : '',
        ].filter(Boolean).join(' ')}
      >
        <button
          type="button"
          id={id}
          disabled={disabled}
          className="cuselect-trigger"
          onClick={() => setOpen(o => !o)}
          onKeyDown={handleKeyDown}
        >
          <span className={selectedLabel ? 'cuselect-value' : 'cuselect-placeholder'}>
            {selectedLabel || placeholder}
          </span>
        </button>

        <span className="cuselect-icon">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>

        {open && !disabled && (
          <ul className="cuselect-list" role="listbox">
            <li
              role="option"
              className={[
                'cuselect-option',
                !value ? 'is-selected' : '',
              ].filter(Boolean).join(' ')}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => selectOption({ value: '', label: defaultOpt })}
            >
              {defaultOpt}
            </li>
            {options.length > 0 ? (
              options.map((opt, i) => (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={String(opt.value) === String(value)}
                  className={[
                    'cuselect-option',
                    i === highlighted ? 'is-highlighted' : '',
                    String(opt.value) === String(value) ? 'is-selected' : ''
                  ].filter(Boolean).join(' ')}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => selectOption(opt)}
                  onMouseEnter={() => setHighlighted(i)}
                >
                  {opt.label}
                </li>
              ))
            ) : (
              <li className="cuselect-empty">Sin opciones</li>
            )}
          </ul>
        )}
      </div>

      {error && <span className="field-error">{error}</span>}
    </div>
  )
}

export default CustomSelect