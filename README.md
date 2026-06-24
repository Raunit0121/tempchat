Secure Token-Based Chat Room

Overview

Secure Token-Based Chat Room is a lightweight real-time messaging application built using React, Spring Boot, WebSocket, and MySQL.

The application allows users to create temporary chat rooms and share a unique room ID and access token with participants. No registration or login is required. Anyone with the correct room credentials can join the room and start chatting instantly.

The project focuses on simplicity, real-time communication, and secure room access using token verification.

---

Features

- Create Temporary Chat Rooms
- Unique Room ID Generation
- Secure Access Token Generation
- Token-Based Room Joining
- Anonymous User Nicknames
- No Registration Required
- No Login Required
- Real-Time Messaging
- WebSocket Communication
- MySQL Database Integration
- Simple and Lightweight Architecture

---

Technology Stack

Frontend

- React.js
- React Router
- Axios
- SockJS
- STOMP.js

Backend

- Java
- Spring Boot
- Spring WebSocket
- Spring Data JPA
- Maven

Database

- MySQL

---

System Architecture

React Frontend
       |
       |
 REST API + WebSocket
       |
       |
 Spring Boot Backend
       |
       |
      MySQL

---

Application Workflow

Step 1: Create a Room

A user creates a new chat room.

API

POST /api/rooms/create

Response

{
  "roomId": "ROOM123",
  "accessToken": "ABC123XYZ"
}

The generated Room ID and Access Token are shared with other participants.

---

Step 2: Join a Room

A participant enters:

- Room ID
- Access Token
- Nickname

API

POST /api/rooms/join

Request

{
  "roomId": "ROOM123",
  "accessToken": "ABC123XYZ",
  "nickname": "Guest001"
}

Response

{
  "status": "SUCCESS",
  "message": "Room joined successfully"
}

---

Step 3: Connect to WebSocket

After successful token verification, the user establishes a WebSocket connection.

Endpoint

/ws

The user subscribes to the room topic and starts receiving messages in real time.

---

Step 4: Send Messages

WebSocket Destination

/app/chat.send

Payload

{
  "roomId": "ROOM123",
  "sender": "Guest001",
  "message": "Hello Everyone"
}

---

Step 5: Receive Messages

Subscription

/topic/ROOM123

Response

{
  "sender": "Guest001",
  "message": "Hello Everyone",
  "timestamp": "2026-06-23T20:00:00"
}

All connected participants receive the message instantly.

---

Database Design

Chat Room Table

CREATE TABLE chat_room (
    room_id VARCHAR(50) PRIMARY KEY,
    access_token VARCHAR(100),
    created_at TIMESTAMP
);

Column| Description
room_id| Unique Room Identifier
access_token| Secret Room Token
created_at| Room Creation Time

---

Messages Table

CREATE TABLE messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_id VARCHAR(50),
    sender VARCHAR(100),
    message TEXT,
    created_at TIMESTAMP
);

Column| Description
id| Message Identifier
room_id| Associated Chat Room
sender| Message Sender
message| Chat Content
created_at| Message Timestamp

---

REST APIs

Create Room

POST /api/rooms/create

Join Room

POST /api/rooms/join

Get Room Information

GET /api/rooms/{roomId}

Get Room Messages

GET /api/messages/{roomId}

---

WebSocket Endpoints

Connection Endpoint

/ws

Send Message

/app/chat.send

Subscribe to Room

/ topic/{roomId}

---

Project Structure

Backend

src/main/java/com/chatroom

├── controller
├── service
├── repository
├── entity
├── websocket
├── config
└── ChatRoomApplication

Frontend

src

├── pages
├── components
├── services
├── App.jsx
└── main.jsx

---

Advantages

- No User Registration
- No Authentication Complexity
- Fast Room Creation
- Secure Token-Based Access
- Real-Time Communication
- Easy to Understand
- Beginner Friendly
- Lightweight Architecture
- Suitable for Learning WebSockets

---

Future Enhancements

- QR Code Room Joining
- File Sharing
- Message Reactions
- Read Receipts
- Room Expiration
- End-to-End Encryption
- Typing Indicators
- Online User Tracking

---

Project Summary

Secure Token-Based Chat Room is a real-time messaging application where users create temporary chat rooms and share a unique room ID and access token with participants. Users can join rooms without registration, connect through WebSocket, and exchange messages instantly. The project demonstrates full-stack development using React, Spring Boot, WebSocket, and MySQL while maintaining a simple and scalable architecture.
