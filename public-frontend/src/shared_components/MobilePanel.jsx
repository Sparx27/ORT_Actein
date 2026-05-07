import '../styles/responsivePanels.css'

const MovilePanel = ({ isActive, panelClass, children }) => {
  return (
    <div className={`mobile-panel ${panelClass} ${isActive ? 'mobile-panel-active' : ''}`}>
      {children}
    </div>
  )
}
export default MovilePanel