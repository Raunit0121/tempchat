package com.chatroom.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class JoinRoomRequest {

    @NotBlank(message = "roomId is required")
    private String roomId;

    @NotBlank(message = "accessToken is required")
    private String accessToken;

    @NotBlank(message = "nickname is required")
    private String nickname;
}
