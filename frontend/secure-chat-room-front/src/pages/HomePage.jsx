import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createRoom, joinRoom } from '../services/api'
import ThemeToggle from '../components/ThemeToggle'
import './HomePage.css'

export default function HomePage() {
  const navigate = useNavigate()

  const [creating, setCreating] = useState(false)
  const [joinRoomId, setJoinRoomId] = useState('')
  const [joinToken, setJoinToken] = useState('')
  const [joinNickname, setJoinNickname] = useState('')
  const [joinError, setJoinError] = useState('')
  const [joining, setJoining] = useState(false)

  const handleCreate = async () => {
    setCreating(true)
    try {
      const { data } = await createRoom()
      navigate('/room', {
        state: {
          roomId: data.roomId,
          accessToken: data.accessToken,
          nickname: 'Host',
          isCreator: true,
        },
      })
    } catch {
      alert('Failed to create room. Is the backend running?')
    } finally {
      setCreating(false)
    }
  }

  const handleJoin = async (e) => {
    e.preventDefault()
    setJoinError('')
    if (!joinRoomId || !joinToken || !joinNickname) {
      setJoinError('All fields are required.')
      return
    }
    setJoining(true)
    try {
      await joinRoom(joinRoomId, joinToken, joinNickname)
      navigate('/room', {
        state: {
          roomId: joinRoomId,
          accessToken: joinToken,
          nickname: joinNickname,
          isCreator: false,
        },
      })
    } catch (err) {
      const msg = err.response?.data?.error || 'Invalid room ID or access token.'
      setJoinError(msg)
    } finally {
      setJoining(false)
    }
  }

  return (
    <div className="home-page">
      {/* Top-right theme toggle */}
      <div className="home-topbar">
        <ThemeToggle />
      </div>

      <header className="home-header">
        <h1>🔒 Secure Chat Room</h1>
        <p>Create or join a temporary chat room — no registration required.</p>
      </header>

      <div className="home-cards">
        {/* Create Card */}
        <div className="card">
          <div className="card-icon">🏠</div>
          <h2>Create a Room</h2>
          <p>Start a new chat room and share the credentials with your participants.</p>
          <button className="btn btn-primary" onClick={handleCreate} disabled={creating}>
            {creating ? 'Creating…' : 'Create Room'}
          </button>
        </div>

        {/* Join Card */}
        <div className="card">
          <div className="card-icon">🔑</div>
          <h2>Join a Room</h2>
          <form onSubmit={handleJoin} className="join-form" noValidate>
            <label htmlFor="roomId">Room ID</label>
            <input
              id="roomId"
              type="text"
              placeholder="e.g. ROOM1A2B3C4D"
              value={joinRoomId}
              onChange={(e) => setJoinRoomId(e.target.value.trim())}
              autoComplete="off"
            />

            <label htmlFor="token">Access Token</label>
            <input
              id="token"
              type="text"
              placeholder="e.g. ABCD1234EFGH5678"
              value={joinToken}
              onChange={(e) => setJoinToken(e.target.value.trim())}
              autoComplete="off"
            />

            <label htmlFor="nickname">Nickname</label>
            <input
              id="nickname"
              type="text"
              placeholder="e.g. Guest007"
              value={joinNickname}
              onChange={(e) => setJoinNickname(e.target.value.trim())}
              autoComplete="off"
            />

            {joinError && <p className="error-msg" role="alert">{joinError}</p>}

            <button className="btn btn-secondary" type="submit" disabled={joining}>
              {joining ? 'Joining…' : 'Join Room'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
