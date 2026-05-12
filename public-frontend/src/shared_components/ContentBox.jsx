const ContentBox = ({ design, children }) => {
  return (
    <div className={`content-box ${design}`}>{children}</div>
  )
}

export default ContentBox