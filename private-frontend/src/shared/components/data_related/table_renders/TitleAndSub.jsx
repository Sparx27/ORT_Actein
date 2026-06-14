const TitleAndSub = ({ title, sub }) => (
  <div className="title-and-sub">
    <div className="title-and-sub-title">{title}</div>
    {sub && <div className="title-and-sub-sub">{sub}</div>}
  </div>
)

export default TitleAndSub