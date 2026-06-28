import React from 'react'

const SvgSpecs = ({ w = 20, h = 20 }) => {
  return (
    <svg width={w} height={h} viewBox="0 0 80 80" role="img">
      <rect x="12" y="6" width="56" height="68" rx="4" fill="none" stroke="currentColor" strokeWidth="2.5" />

      <line x1="22" y1="26" x2="58" y2="26" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />

      <line x1="22" y1="42" x2="36" y2="42" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <line x1="44" y1="42" x2="58" y2="42" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />

      <line x1="22" y1="58" x2="36" y2="58" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <line x1="44" y1="58" x2="58" y2="58" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

export default SvgSpecs