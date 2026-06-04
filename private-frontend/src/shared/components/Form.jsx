import MessageBox from './MessageBox'

const CForm = ({
  onSubmit,
  children,
  message,       // texto del MessageBox, si hay
  messageType,   // 'success' | 'error' | 'warning' | 'info'
  formHead = null // { title: 'un titulo', txt: 'alguna dsc extra' }
}) => {
  return (
    <form
      className="form"
      onSubmit={onSubmit}
      noValidate
    >
      {formHead && (
        <div className="form-head">
          {formHead.title && <h1 className="h1">{formHead.title}</h1>}
          {formHead.txt && <p>{formHead.txt}</p>}
        </div>
      )}

      {message && (
        <MessageBox message={message} type={messageType} />
      )}

      {children}
    </form>
  )
}

export default CForm