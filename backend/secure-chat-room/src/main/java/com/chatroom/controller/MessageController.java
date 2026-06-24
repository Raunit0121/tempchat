package com.chatroom.controller;

import com.chatroom.dto.ChatMessageResponse;
import com.chatroom.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @GetMapping("/{roomId}")
    public ResponseEntity<List<ChatMessageResponse>> getMessages(@PathVariable String roomId) {
        return ResponseEntity.ok(messageService.getMessages(roomId));
    }
}
