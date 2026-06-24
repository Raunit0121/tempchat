package com.chatroom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateRoomResponse {
    private String roomId;
    private String accessToken;
}
