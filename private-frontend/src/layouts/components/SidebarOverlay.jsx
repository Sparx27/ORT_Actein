const SidebarOverlay = ({ open, onClose }) => {
  return (
    <div
      className={`sidebar-overlay${open ? ' open' : ''}`}
      onClick={onClose}
    />
  )
}

export default SidebarOverlay