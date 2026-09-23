package com.ritesh.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Payload for POST /api/contact
 */
public record ContactRequest(

        @NotBlank(message = "Name is required")
        @Size(min = 2, max = 150, message = "Name must be between 2 and 150 characters")
        String name,

        @NotBlank(message = "Email is required")
        @Email(message = "Must be a valid email address")
        String email,

        @Size(max = 300, message = "Subject must not exceed 300 characters")
        String subject,

        @NotBlank(message = "Message is required")
        @Size(min = 10, max = 5000, message = "Message must be between 10 and 5000 characters")
        String message
) {}
