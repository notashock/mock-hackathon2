package com.amenityManagement.server.dtos;

import com.amenityManagement.server.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class UserDTOs {

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RegisterRequest {
        @NotBlank(message = "name required")
        private String name;

        @NotBlank(message = "email required")
        @Email(message = "Invalid email")
        private String email;

        @NotBlank(message = "password required")
        @Size(min = 6, message = "password should be min 6 characters long")
        private String password;

        @NotBlank(message = "phone number required")
        private String phoneNumber;

        private Role role;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AuthenticationRequest {
        @NotBlank(message = "email required")
        private String email;

        @NotBlank(message = "password required")
        private String password;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AuthenticationResponse {
        private String token;
        private String email;
        private Role role;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserResponse {
        private Long id;
        private String name;
        private String email;
        private String phoneNumber;
        private Role role;
        private LocalDateTime createdAt;
    }
}