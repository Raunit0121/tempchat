import { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import './RoomInfo.css'

export default function RoomInfo({ roomId, accessToken, nickname, isCreator, connected, onLeave }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const text = `Room ID: ${roomId}\nAccess Token: ${accessToken}`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="room-info">
      <div className="room-info__left">
        <span className={`status-dot ${connected ? 'connected' : 'disconnected'}`}
              title={connected ? 'Connected' : 'Disconnected'} />
        <span className="room-id">
          <span className="label">Room: </span>{roomId}
        </span>
      </div>

      <div className="room-info__right">
        <ThemeToggle />

        <span className="nickname-badge">👤 {nickname}</span>

        {isCreator && (
          <button className="btn btn-ghost" onClick={handleCopy} title="Copy room credentials">
            {copied ? '✅' : '📋'} <span className="copy-label">{copied ? 'Copied!' : 'Share'}</span>
          </button>
        )}

        <button className="btn btn-danger" onClick={onLeave} title="Leave room">
          Leave
        </button>
      </div>
    </div>
  )
}
