const SvgImagePlaceholder = ({ w = '85', h = '85' }) => {
  return (
    <svg width={w} height={h} viewBox="230 70 220 220">
      <rect x="240" y="80" width="200" height="200" rx="10" fill="none" stroke="#0e7490" strokeWidth="6" />
      <circle cx="290" cy="140" r="22" fill="#0e7490" />
      <polygon points="240,280 330,180 420,280" fill="#0e7490" />
      <polygon points="330,280 390,210 440,280" fill="#0e7490" />
    </svg>
  )
}

export default SvgImagePlaceholder