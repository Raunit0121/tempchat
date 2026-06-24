import { useState, useRef } from 'react'
import EmojiPicker from './EmojiPicker'
import './MessageInput.css'

export default function MessageInput({ onSend }) {
  const [text, setText] = useState('')
  const [showEmoji, setShowEmoji] = useState(false)
  const textareaRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    onSend(text.trim())
    setText('')
    textareaRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleEmojiSelect = (emoji) => {
    // Insert emoji at current cursor position
    const el = textareaRef.current
    if (!el) {
      setText(t => t + emoji)
      return
    }
    const start = el.selectionStart
    const end = el.selectionEnd
    const newText = text.slice(0, start) + emoji + text.slice(end)
    setText(newText)
    // Restore cursor after emoji
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(start + emoji.length, start + emoji.length)
    })
  }

  return (
    <form className="message-input" onSubmit={handleSubmit} aria-label="Send a message">
      {/* Emoji picker popover */}
      <div className="emoji-trigger-wrap">
        <button
          type="button"
          className="emoji-trigger"
          onClick={() => setShowEmoji(v => !v)}
          aria-label="Open emoji picker"
          title="Emoji"
        >
          😊
        </button>
        {showEmoji && (
          <EmojiPicker
            onSelect={(emoji) => {
              handleEmojiSelect(emoji)
              setShowEmoji(false)
            }}
            onClose={() => setShowEmoji(false)}
          />
        )}
      </div>

      <textarea
        ref={textareaRef}
        className="message-input__field"
        placeholder="Type a message…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        aria-label="Message text"
      />

      <button
        className="message-input__send btn btn-primary"
        type="submit"
        disabled={!text.trim()}
        aria-label="Send message"
      >
        <span className="send-label">Send</span>
        <span aria-hidden="true"> ➤</span>
      </button>
    </form>
  )
}
