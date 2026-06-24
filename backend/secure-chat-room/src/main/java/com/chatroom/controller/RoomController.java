package com.chatroom.controller;

import com.chatroom.dto.*;
import com.chatroom.service.ChatRoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final ChatRoomService chatRoomService;

    @PostMapping("/create")
    public ResponseEntity<CreateRoomResponse> createRoom() {
        return ResponseEntity.ok(chatRoomService.createRoom());
    }

    @PostMapping("/join")
    public ResponseEntity<JoinRoomResponse> joinRoom(@Valid @RequestBody JoinRoomRequest request) {
        return ResponseEntity.ok(chatRoomService.joinRoom(request));
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<RoomInfoResponse> getRoomInfo(@PathVariable String roomId) {
        return ResponseEntity.ok(chatRoomService.getRoomInfo(roomId));
    }
}
