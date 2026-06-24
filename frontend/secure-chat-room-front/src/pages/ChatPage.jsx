import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getMessages } from '../services/api'
import { connectSocket, disconnectSocket, sendMessage } from '../services/socket'
import RoomInfo from '../components/RoomInfo'
import MessageList from '../components/MessageList'
import MessageInput from '../components/MessageInput'
import './ChatPage.css'

export default function ChatPage() {
  const { state } = useLocation()
  const navigate = useNavigate()

  const [messages, setMessages] = useState([])
  const [connected, setConnected] = useState(false)
  const bottomRef = useRef(null)

  const { roomId, accessToken, nickname, isCreator } = state || {}

  // Redirect if arrived without credentials
  useEffect(() => {
    if (!roomId || !nickname) {
      navigate('/')
    }
  }, [roomId, nickname, navigate])

  // Load history, then connect WebSocket
  useEffect(() => {
    if (!roomId) return

    getMessages(roomId)
      .then(({ data }) => setMessages(data))
      .catch(() => {})

    connectSocket(roomId, (msg) => {
      setMessages((prev) => [...prev, msg])
    })

    setConnected(true)

    return () => {
      disconnectSocket()
      setConnected(false)
    }
  }, [roomId])

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = (text) => {
    if (!text.trim()) return
    sendMessage(roomId, nickname, text)
  }

  const handleLeave = () => {
    disconnectSocket()
    navigate('/')
  }

  if (!roomId) return null

  return (
    <div className="chat-page">
      <RoomInfo
        roomId={roomId}
        accessToken={accessToken}
        nickname={nickname}
        isCreator={isCreator}
        connected={connected}
        onLeave={handleLeave}
      />
      <MessageList messages={messages} nickname={nickname} bottomRef={bottomRef} />
      <MessageInput onSend={handleSend} />
    </div>
  )
}
