const StatusBadge = ({ active, labelOn = 'Activo', labelOff = 'Inactivo' }) => (
  <span className={`status-badge ${active ? 'on' : 'off'}`}>
    <span className="status-badge-dot" />
    {active ? labelOn : labelOff}
  </span>
)

export default StatusBadge