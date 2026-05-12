const Button = ({ primary, secondary, design = '', onClick, children }) => {
  const baseClass = 'btn-base'
  const btnClassType = primary ? 'btn-primary' : secondary ? 'btn-secondary' : ''
  const btnClass = `${baseClass} ${btnClassType} ${design}`

  return (
    <button className={btnClass} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button