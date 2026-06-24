package com.chatroom.dto;

import lombok.Data;

@Data
public class ChatMessagePayload {
    private String roomId;
    private String sender;
    private String message;
}
