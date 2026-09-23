package com.ritesh.portfolio.dto;

import com.ritesh.portfolio.entity.ContactMessage;
import java.time.LocalDateTime;

public record ContactResponse(
        Long id,
        String name,
        String email,
        String subject,
        String message,
        Boolean isRead,
        LocalDateTime createdAt
) {
    public static ContactResponse fromEntity(ContactMessage msg) {
        if (msg == null) return null;
        return new ContactResponse(
                msg.getId(),
                msg.getName(),
                msg.getEmail(),
                msg.getSubject(),
                msg.getMessage(),
                msg.getRead(),
                msg.getCreatedAt()
        );
    }
}
