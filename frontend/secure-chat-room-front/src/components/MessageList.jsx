import './MessageList.css'

function formatTime(timestamp) {
  if (!timestamp) return ''
  const d = new Date(timestamp)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function MessageList({ messages, nickname, bottomRef }) {
  if (messages.length === 0) {
    return (
      <div className="message-list message-list--empty">
        <p>No messages yet. Say hello! 👋</p>
      </div>
    )
  }

  return (
    <div className="message-list" role="log" aria-live="polite" aria-label="Chat messages">
      {messages.map((msg, idx) => {
        const isOwn = msg.sender === nickname
        return (
          <div
            key={idx}
            className={`message-bubble ${isOwn ? 'message-bubble--own' : 'message-bubble--other'}`}
          >
            {!isOwn && <span className="message-sender">{msg.sender}</span>}
            <p className="message-text">{msg.message}</p>
            <span className="message-time">{formatTime(msg.timestamp)}</span>
          </div>
        )
      })}
      <div ref={bottomRef} />
    </div>
  )
}
