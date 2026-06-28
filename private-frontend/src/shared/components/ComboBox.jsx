import { useState, useRef, useEffect } from 'react'

const ComboBox = ({
  label,
  id,
  placeholder,
  disabled = false,
  error = false,
  options = [],      // [{ value, label }]
  value,             // value de la opción seleccionada (controlado)
  onChange,          // recibe el value de la opción elegida
  extraClass
}) => {
  const [inputText, setInputText] = useState('')
  const [open, setOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(0)
  const wrapRef = useRef(null)

  // Label de la opción actualmente seleccionada (la fuente de verdad es `value`)
  const selectedLabel = options.find(o => String(o.value) === String(value))?.label ?? ''

  // Si cambia la selección desde afuera (ej: values de un form de edición), sincroniza el texto
  useEffect(() => {
    setInputText(selectedLabel)
  }, [selectedLabel])

  // Cierre por clic afuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        closeAndRevert()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  })

  const filtered = options.filter(o =>
    o?.label?.toLowerCase().includes(inputText.toLowerCase())
  )

  function closeAndRevert() {
    setOpen(false)
    setInputText(selectedLabel) // texto libre no vale: vuelve a la última selección
  }

  function selectOption(opt) {
    onChange(opt.value)
    setInputText(opt.label)
    setOpen(false)
  }

  function handleKeyDown(e) {
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setOpen(true)
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlighted(h => Math.min(h + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlighted(h => Math.max(h - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered[highlighted]) selectOption(filtered[highlighted])
    } else if (e.key === 'Escape') {
      closeAndRevert()
    }
  }

  return (
    <div className={extraClass ? `field ${extraClass}` : 'field'}>
      {label && <label className="field-label" htmlFor={id}>{label}</label>}

      <div
        ref={wrapRef}
        className={[
          'combo-wrap',
          open ? 'combo-open' : '',
          error ? 'has-error' : '',
        ].filter(Boolean).join(' ')}
      >
        <input
          type="text"
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          value={inputText}
          autoComplete="off"
          onChange={(e) => {
            setInputText(e.target.value)
            setOpen(true)
            setHighlighted(0)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
        />

        <span className="combo-icon">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>

        {open && !disabled && (
          <ul className="combo-list" role="listbox">
            {filtered.length > 0 ? (
              filtered.map((opt, i) => (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={String(opt.value) === String(value)}
                  className={[
                    'combo-option',
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
              <li className="combo-empty">Sin resultados</li>
            )}
          </ul>
        )}
      </div>

      {error && <span className="field-error">{error}</span>}
    </div>
  )
}

export default ComboBox