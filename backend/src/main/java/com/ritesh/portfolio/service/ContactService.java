package com.ritesh.portfolio.service;

import com.ritesh.portfolio.dto.ContactRequest;
import com.ritesh.portfolio.dto.ContactResponse;
import com.ritesh.portfolio.entity.ContactMessage;
import com.ritesh.portfolio.exception.ResourceNotFoundException;
import com.ritesh.portfolio.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactRepository contactRepository;

    @Transactional
    public ContactResponse submitContactMessage(ContactRequest request) {
        ContactMessage msg = ContactMessage.builder()
                .name(request.name())
                .email(request.email())
                .subject(request.subject())
                .message(request.message())
                .isRead(false)
                .build();

        return ContactResponse.fromEntity(contactRepository.save(msg));
    }

    @Transactional(readOnly = true)
    public Page<ContactResponse> getMessages(int page, int size, Boolean unreadOnly) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ContactMessage> messages;
        if (Boolean.TRUE.equals(unreadOnly)) {
            messages = contactRepository.findByIsReadFalseOrderByCreatedAtDesc(pageable);
        } else {
            messages = contactRepository.findAllByOrderByCreatedAtDesc(pageable);
        }
        return messages.map(ContactResponse::fromEntity);
    }

    @Transactional
    public ContactResponse markAsRead(Long id) {
        ContactMessage msg = contactRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ContactMessage", "id", id));
        msg.setRead(true);
        return ContactResponse.fromEntity(contactRepository.save(msg));
    }

    @Transactional
    public void deleteMessage(Long id) {
        if (!contactRepository.existsById(id)) {
            throw new ResourceNotFoundException("ContactMessage", "id", id);
        }
        contactRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public long countUnreadMessages() {
        return contactRepository.countByIsReadFalse();
    }
}
