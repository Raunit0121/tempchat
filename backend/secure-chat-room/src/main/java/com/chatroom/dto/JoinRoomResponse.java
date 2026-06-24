package com.chatroom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JoinRoomResponse {
    private String status;
    private String message;
}
