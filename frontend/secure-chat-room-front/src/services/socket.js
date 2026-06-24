import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client/dist/sockjs.min.js'

let stompClient = null

export const connectSocket = (roomId, onMessage) => {
  stompClient = new Client({
    webSocketFactory: () => new SockJS('/ws'),
    reconnectDelay: 5000,
    onConnect: () => {
      stompClient.subscribe(`/topic/${roomId}`, (frame) => {
        const msg = JSON.parse(frame.body)
        onMessage(msg)
      })
    },
  })
  stompClient.activate()
}

export const sendMessage = (roomId, sender, message) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: '/app/chat.send',
      body: JSON.stringify({ roomId, sender, message }),
    })
  }
}

export const disconnectSocket = () => {
  if (stompClient) {
    stompClient.deactivate()
    stompClient = null
  }
}
