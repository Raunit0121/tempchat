import { useState, useEffect, useRef } from 'react'
import './EmojiPicker.css'

const CATEGORIES = [
  {
    label: '😀 Smileys',
    emojis: ['😀','😁','😂','🤣','😃','😄','😅','😆','😉','😊',
             '😋','😎','😍','🥰','😘','😗','😙','😚','🙂','🤗',
             '🤩','🤔','🤨','😐','😑','😶','🙄','😏','😣','😥',
             '😮','🤐','😯','😪','😫','🥱','😴','😌','😛','😜',
             '😝','🤤','😒','😓','😔','😕','🙃','🤑','😲','☹️',
             '🙁','😖','😞','😟','😤','😢','😭','😦','😧','😨'],
  },
  {
    label: '👍 Gestures',
    emojis: ['👍','👎','👌','✌️','🤞','🤟','🤘','🤙','👈','👉',
             '👆','👇','☝️','✋','🤚','🖐️','🖖','👋','🤙','💪',
             '🦾','🙌','👐','🤲','🤝','🙏','✍️','💅','🤳','💋'],
  },
  {
    label: '❤️ Hearts',
    emojis: ['❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔',
             '❣️','💕','💞','💓','💗','💖','💘','💝','💟','☮️',
             '✨','💫','⭐','🌟','🌈','🔥','💯','🎉','🎊','🎁'],
  },
  {
    label: '🐶 Animals',
    emojis: ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯',
             '🦁','🐮','🐷','🐸','🐵','🐔','🐧','🐦','🦆','🦅',
             '🦉','🦇','🐺','🐗','🐴','🦄','🐝','🐛','🦋','🐌'],
  },
  {
    label: '🍕 Food',
    emojis: ['🍕','🍔','🌮','🌯','🥗','🍜','🍣','🍩','🍪','🎂',
             '🍰','🧁','🍫','🍬','🍭','🍦','🧃','☕','🍵','🧋',
             '🍺','🥂','🍾','🥃','🍷','🍸','🍹','🧉','🥤','🍻'],
  },
  {
    label: '⚽ Sports',
    emojis: ['⚽','🏀','🏈','⚾','🥎','🎾','🏐','🏉','🎱','🏓',
             '🏸','🥊','🥋','🎯','🎳','🏹','🛹','🛷','⛸️','🥌',
             '🎿','⛷️','🏂','🏋️','🤸','🤺','🤾','🏌️','🏇','🧘'],
  },
]

export default function EmojiPicker({ onSelect, onClose }) {
  const [activeTab, setActiveTab] = useState(0)
  const ref = useRef(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  return (
    <div className="emoji-picker" ref={ref} role="dialog" aria-label="Emoji picker">
      {/* Category tabs */}
      <div className="emoji-picker__tabs" role="tablist">
        {CATEGORIES.map((cat, i) => (
          <button
            key={i}
            className={`emoji-tab ${activeTab === i ? 'active' : ''}`}
            onClick={() => setActiveTab(i)}
            title={cat.label}
            role="tab"
            aria-selected={activeTab === i}
          >
            {cat.emojis[0]}
          </button>
        ))}
      </div>

      {/* Emoji grid */}
      <div className="emoji-picker__grid" role="tabpanel">
        {CATEGORIES[activeTab].emojis.map((emoji, i) => (
          <button
            key={i}
            className="emoji-btn"
            onClick={() => onSelect(emoji)}
            aria-label={emoji}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  )
}
