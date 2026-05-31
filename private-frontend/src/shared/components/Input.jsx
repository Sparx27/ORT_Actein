/*
    EJEMPLOS DE USO

<Input
  label="Nombre"
  id="nombre"
  placeholder="Ej: Juan Pérez"
  value={nombre}
  onChange={e => setNombre(e.target.value)}
/>

<Input
  label="Email"
  id="email"
  type="email"
  placeholder="nombre@empresa.com"
  icon={
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>
    </svg>
  }
  value={email}
  onChange={e => setEmail(e.target.value)}
/>

<Input
  id="busqueda"
  placeholder="Buscar..."
  value={query}
  onChange={e => setQuery(e.target.value)}
/>
*/


const Input = ({
  label,
  icon,
  type = 'text',
  id,
  placeholder,
  value,
  onChange,
  disabled = false,
  autoComplete,
}) => {
  return (
    <div className="field">
      {label && (
        <label className="field-label" htmlFor={id}>
          {label}
        </label>
      )}

      {/* has-icon agrega el padding izquierdo al input solo cuando corresponde */}
      <div className={`input-wrap${icon ? ' has-icon' : ''}`}>
        {icon && (
          <span className="input-icon">
            {icon}
          </span>
        )}
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          autoComplete={autoComplete}
        />
      </div>
    </div>
  )
}

export default Input