package com.chatroom.service;

import com.chatroom.dto.ChatMessagePayload;
import com.chatroom.dto.ChatMessageResponse;
import com.chatroom.entity.Message;
import com.chatroom.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;

    public ChatMessageResponse saveAndBuildResponse(ChatMessagePayload payload) {
        Message message = Message.builder()
                .roomId(payload.getRoomId())
                .sender(payload.getSender())
                .message(payload.getMessage())
                .build();

        Message saved = messageRepository.save(message);

        return new ChatMessageResponse(saved.getSender(), saved.getMessage(), saved.getCreatedAt());
    }

    public List<ChatMessageResponse> getMessages(String roomId) {
        return messageRepository.findByRoomIdOrderByCreatedAtAsc(roomId)
                .stream()
                .map(m -> new ChatMessageResponse(m.getSender(), m.getMessage(), m.getCreatedAt()))
                .collect(Collectors.toList());
    }
}
