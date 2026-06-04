const ResponsivePanelMobile = ({ isActive, panelClass, children }) => {
  return (
    <div className={`mobile-panel ${panelClass} ${isActive ? 'mobile-panel-active' : ''}`}>
      {children}
    </div>
  )
}
export default ResponsivePanelMobile