const ButtonIcon = ({
  onClick,
  disabled = false,
  type = 'button',
  icon = null,
  extraClass,
  danger = false,
  ...rest
}) => {

  return (
    <button className={`btn-icon ${danger && 'danger'} ${extraClass}`} onClick={onClick} disabled={disabled} type={type} {...rest}>
      {icon && icon}
    </button>
  )
}

export default ButtonIcon