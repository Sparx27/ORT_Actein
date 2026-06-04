const NavSection = ({ label, children }) => {
  return (
    <div className="nav-section">
      <div className="nav-section-label">{label}</div>
      {children}
    </div>
  )
}

export default NavSection