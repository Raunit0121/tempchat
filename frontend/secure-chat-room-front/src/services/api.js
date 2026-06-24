import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

export const createRoom = () => api.post('/rooms/create')

export const joinRoom = (roomId, accessToken, nickname) =>
  api.post('/rooms/join', { roomId, accessToken, nickname })

export const getRoomInfo = (roomId) => api.get(`/rooms/${roomId}`)

export const getMessages = (roomId) => api.get(`/messages/${roomId}`)
