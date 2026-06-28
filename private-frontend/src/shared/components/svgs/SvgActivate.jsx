const SvgActivate = ({ w = 20, h = 20 }) => {
  return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="5" width="22" height="14" rx="7" />
      <circle cx="16" cy="12" r="4" fill="currentColor" stroke="none" opacity="0.3" />
      <circle cx="16" cy="12" r="3" />
    </svg>
  )
}

export default SvgActivate