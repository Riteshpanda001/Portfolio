package com.ritesh.portfolio.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailService {

    public void sendContactNotification(String fromName, String fromEmail, String subject, String messageContent) {
        log.info("Simulating contact email notification from {} <{}>: {}", fromName, fromEmail, subject);
        // MailSender / JavaMailSender integration point
    }
}
