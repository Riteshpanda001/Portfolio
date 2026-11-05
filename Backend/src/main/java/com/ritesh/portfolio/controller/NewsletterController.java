package com.ritesh.portfolio.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Newsletter subscription endpoint.
 * Currently logs the subscription; wire in an email provider (SendGrid, Mailchimp, etc.)
 * by injecting a service here.
 */
@Slf4j
@RestController
@RequestMapping("/api/newsletter")
public class NewsletterController {

    @PostMapping("/subscribe")
    public ResponseEntity<Map<String, String>> subscribe(@RequestBody Map<String, String> body) {
        String email = body.getOrDefault("email", "").trim();
        if (email.isBlank() || !email.contains("@")) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "A valid email address is required."));
        }
        // TODO: persist subscriber email and/or trigger a welcome email via MailService
        log.info("Newsletter subscription request from: {}", email);
        return ResponseEntity.ok(Map.of("message", "Thank you for subscribing!"));
    }
}
