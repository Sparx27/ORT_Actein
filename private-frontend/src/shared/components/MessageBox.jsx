const MessageBox = ({ message, type }) => {
  return (
    <div className={type ? `msg msg-${type}` : 'msg'}>
      {message}
    </div>
  )
}

export default MessageBox