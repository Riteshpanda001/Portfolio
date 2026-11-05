package com.ritesh.portfolio.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:riteshkumarpanda001@gmail.com}")
    private String toEmail;

    /**
     * Sends a contact-form notification email to the portfolio owner.
     */
    public void sendContactNotification(
            String fromName,
            String fromEmail,
            String subject,
            String messageContent
    ) {
        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setTo(toEmail);
            mail.setSubject("Portfolio Contact: " + subject);
            mail.setText(
                "New message from your portfolio contact form.\n\n"
                + "Name:    " + fromName    + "\n"
                + "Email:   " + fromEmail   + "\n"
                + "Subject: " + subject     + "\n\n"
                + "Message:\n" + messageContent
                + "\n\n---\nSent via Portfolio Contact Form"
            );
            mail.setReplyTo(fromEmail);
            mailSender.send(mail);
            log.info("Contact email sent successfully from {} <{}>", fromName, fromEmail);
        } catch (Exception e) {
            // Don't crash the request if email fails — just log it
            log.warn("Email notification failed (check MAIL_PASSWORD env var): {}", e.getMessage());
        }
    }
}
