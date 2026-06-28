import SvgLoading from './svgs/SvgLoading'

const Button = ({
  variant = 'primary',  // 'primary' | 'secondary' | 'ghost'
  full = false,
  onClick,
  disabled = false,
  children,
  type = 'button',
  bigPadding = false,
  icon = null,
  hideTextOnMobile = false,
  loading = false,
  extraClass,
  ...rest
}) => {
  const classes = [
    'btn-base',
    `btn-${variant}`,
    full ? 'btn-full' : '',
    bigPadding ? 'btn-bigPadding' : '',
    hideTextOnMobile ? 'btn-hide-txt-mobile' : '',
    extraClass ? extraClass : ''
  ].filter(Boolean).join(' ')

  return (
    <button className={classes} onClick={onClick} disabled={disabled || loading} type={type} {...rest}>
      {loading ? <SvgLoading /> : (
        <>
          {icon && icon}
          <span className="btn-content">{children}</span>
        </>
      )}
    </button>
  )
}

export default Button