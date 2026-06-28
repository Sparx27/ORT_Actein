// useSidebar.js
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useSidebar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Al navegar a otra ruta, cerramos el drawer automáticamente.
  // (si el usuario toca un link del menú, no querés que el drawer
  // quede abierto sobre la página nueva)
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Bloqueamos el scroll del body mientras el drawer está abierto,
  // así el contenido de atrás no se mueve al deslizar.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return {
    open,
    openSidebar: () => setOpen(true),
    closeSidebar: () => setOpen(false),
    toggleSidebar: () => setOpen(v => !v),
  }
}