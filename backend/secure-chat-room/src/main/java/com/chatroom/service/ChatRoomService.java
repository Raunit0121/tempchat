package com.chatroom.service;

import com.chatroom.dto.*;
import com.chatroom.entity.ChatRoom;
import com.chatroom.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;

    public CreateRoomResponse createRoom() {
        String roomId = generateRoomId();
        String accessToken = generateAccessToken();

        ChatRoom room = ChatRoom.builder()
                .roomId(roomId)
                .accessToken(accessToken)
                .build();

        chatRoomRepository.save(room);

        return new CreateRoomResponse(roomId, accessToken);
    }

    public JoinRoomResponse joinRoom(JoinRoomRequest request) {
        ChatRoom room = chatRoomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new IllegalArgumentException("Room not found"));

        if (!room.getAccessToken().equals(request.getAccessToken())) {
            throw new IllegalArgumentException("Invalid access token");
        }

        return new JoinRoomResponse("SUCCESS", "Room joined successfully");
    }

    public RoomInfoResponse getRoomInfo(String roomId) {
        ChatRoom room = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room not found"));

        return new RoomInfoResponse(room.getRoomId(), room.getCreatedAt());
    }

    private String generateRoomId() {
        return "ROOM" + UUID.randomUUID().toString().replace("-", "").substring(0, 8).toUpperCase();
    }

    private String generateAccessToken() {
        return UUID.randomUUID().toString().replace("-", "").substring(0, 16).toUpperCase();
    }
}
