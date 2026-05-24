import { useState } from 'react'

function useToggle(initialValue = false) {
  const [isActive, setIsActive] = useState(initialValue)
  const toggle = () => { setIsActive(prev => !prev) }
  return { isActive, toggle }
}

export default useToggle