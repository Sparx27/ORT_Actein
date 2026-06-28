const SvgInfo = ({ w = '14', h = '14' }) => {
  return (
    <svg width={w} height={h} viewBox="0 0 80 80">
      <circle cx="40" cy="40" r="36" fill="none" stroke="#64748b" strokeWidth="2.5" />
      <circle cx="40" cy="26" r="3.5" fill="#64748b" />
      <line x1="40" y1="36" x2="40" y2="58" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

export default SvgInfo