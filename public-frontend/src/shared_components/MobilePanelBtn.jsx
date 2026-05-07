import '../styles/responsivePanels.css'

const MobilePanelBtn = ({ onPress, btnClass, children }) => {
  return (
    <button className={`movile-btn ${btnClass}`} onClick={onPress}>
      {children}
    </button>
  )
}

export default MobilePanelBtn