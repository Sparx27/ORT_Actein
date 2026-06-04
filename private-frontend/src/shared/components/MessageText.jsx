const MessageText = ({ message, type }) => {
  return (
    <p className={type ? `status-text status-text--${type}` : 'status-text'}>
      {message}
    </p>
  )
}

export default MessageText