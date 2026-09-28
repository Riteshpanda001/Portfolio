package com.ritesh.portfolio.controller;

import com.ritesh.portfolio.service.AnalyticsService;
import com.ritesh.portfolio.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final AnalyticsService analyticsService;
    private final ContactService contactService;

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboardData() {
        Map<String, Object> data = new HashMap<>(analyticsService.getDashboardStats());
        data.put("unreadMessagesCount", contactService.countUnreadMessages());
        return ResponseEntity.ok(data);
    }
}
