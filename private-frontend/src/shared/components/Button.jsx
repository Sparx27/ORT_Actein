const Button = ({
  variant = 'primary',  // 'primary' | 'secondary' | 'ghost'
  full = false,
  onClick,
  disabled = false,
  children,
  type = 'button',
  bigPadding = false
}) => {
  const classes = [
    'btn-base',
    `btn-${variant}`,
    full ? 'btn-full' : '',
    bigPadding ? 'btn-bigPadding' : ''
  ].filter(Boolean).join(' ')

  return (
    <button className={classes} onClick={onClick} disabled={disabled} type={type}>
      {children}
    </button>
  )
}

export default Button