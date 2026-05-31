const Button = ({
  variant = 'primary',  // 'primary' | 'secondary' | 'ghost'
  full = false,
  onClick,
  disabled = false,
  children,
}) => {
  const classes = [
    'btn-base',
    `btn-${variant}`,
    full ? 'btn-full' : '',
  ].filter(Boolean).join(' ')

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button