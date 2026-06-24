package com.chatroom.websocket;

import com.chatroom.dto.ChatMessagePayload;
import com.chatroom.dto.ChatMessageResponse;
import com.chatroom.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final MessageService messageService;
    private final SimpMessagingTemplate messagingTemplate;

    /**
     * Client sends to /app/chat.send
     * Message is broadcast to /topic/{roomId}
     */
    @MessageMapping("/chat.send")
    public void sendMessage(ChatMessagePayload payload) {
        ChatMessageResponse response = messageService.saveAndBuildResponse(payload);
        messagingTemplate.convertAndSend("/topic/" + payload.getRoomId(), response);
    }
}
