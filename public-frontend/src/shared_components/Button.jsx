const Button = ({ primary, secondary, design = '', onClick, disabled = false, children }) => {
  const baseClass = 'btn-base'
  const btnClassType = primary ? 'btn-primary' : secondary ? 'btn-secondary' : ''
  const btnClass = `${baseClass} ${btnClassType} ${design}`

  return (
    <button className={btnClass} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button