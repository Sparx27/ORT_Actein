import React, { useState } from 'react'
import Modal from '../shared/components/Modal'

const TextPage = () => {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div>
      TextPage
      <button onClick={() => setModalOpen(true)}>click</button>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header title="Crear nueva categoría" onClose={() => setModalOpen(false)} />
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
          <button className="btn-ghost" onClick={() => setModalOpen(false)}>Cancelar</button>
          <button className="btn-primary" onClick={() => setModalOpen(false)}>Confirmar</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default TextPage