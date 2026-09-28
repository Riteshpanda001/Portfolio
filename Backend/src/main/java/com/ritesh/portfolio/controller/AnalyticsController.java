package com.ritesh.portfolio.controller;

import com.ritesh.portfolio.service.AnalyticsService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @PostMapping("/visit")
    public ResponseEntity<Void> recordVisit(@RequestBody Map<String, String> body, HttpServletRequest request) {
        String pageVisited = body.getOrDefault("page", "/");
        String ipAddress = request.getRemoteAddr();
        String userAgent = request.getHeader("User-Agent");

        analyticsService.recordVisit(ipAddress, userAgent, pageVisited);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getStats() {
        return ResponseEntity.ok(analyticsService.getDashboardStats());
    }
}
