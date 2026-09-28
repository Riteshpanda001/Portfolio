package com.ritesh.portfolio.service;

import com.ritesh.portfolio.entity.Visitor;
import com.ritesh.portfolio.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final VisitorRepository visitorRepository;
    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final ContactRepository contactRepository;

    @Transactional
    public void recordVisit(String ipAddress, String userAgent, String pageVisited) {
        Visitor visitor = Visitor.builder()
                .ipAddress(ipAddress)
                .userAgent(userAgent)
                .pageVisited(pageVisited)
                .build();
        visitorRepository.save(visitor);
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalProjects", projectRepository.count());
        stats.put("totalSkills", skillRepository.count());
        stats.put("totalMessages", contactRepository.count());
        stats.put("unreadMessages", contactRepository.countByIsReadFalse());
        stats.put("totalVisitors", visitorRepository.count());

        LocalDateTime last24h = LocalDateTime.now().minusHours(24);
        stats.put("visitorsLast24h", visitorRepository.countByVisitedAtAfter(last24h));

        return stats;
    }
}
