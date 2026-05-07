import '../styles/responsivePanels.css'

const DesktopPanel = ({ children }) => {
  return (
    <div className="desktop-panel">
      {children}
    </div>
  )
}

export default DesktopPanel