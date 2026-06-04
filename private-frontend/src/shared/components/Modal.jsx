import { useRef, useEffect } from 'react'

/*
EJEMPLO DE USO:
<>
    <div className="demo-area">
      <button className="btn-primary" onClick={() => setOpen(true)}>
        Abrir modal
      </button>
    </div>

    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <Modal.Header title="Confirmar acción" onClose={() => setOpen(false)} />
      <Modal.Body>
        <p style={{ fontSize: 14, color: 'var(--gray-700)', lineHeight: 1.6 }}>
          Esto es el contenido del modal. Podés poner cualquier cosa acá:
          formularios, texto, tablas, lo que necesites.
        </p>
        <p style={{ fontSize: 14, color: 'var(--gray-500)', marginTop: 10 }}>
          Hacé click afuera de la caja o presioná <strong>Escape</strong> para cerrar.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-ghost" onClick={() => setOpen(false)}>Cancelar</button>
        <button className="btn-primary" onClick={() => setOpen(false)}>Confirmar</button>
      </Modal.Footer>
    </Modal>
</>
*/

function Modal({ isOpen, onClose, children }) {
  const overlayRef = useRef(null)
  useEffect(() => {
    if (!isOpen) return

    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) onClose()
  }

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <dialog className="modal-box">
        {children}
      </dialog>
    </div>
  )
}

Modal.Header = function ModalHeader({ title, onClose }) {
  return (
    <div className="modal-header">
      <span className="modal-title">{title}</span>
      <button className="btn-close" onClick={onClose} aria-label="Cerrar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  )
}

Modal.Body = ({ children }) => <div className="modal-body">{children}</div>
Modal.Footer = ({ children }) => <div className="modal-footer">{children}</div>

export default Modal