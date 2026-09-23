package com.ritesh.portfolio.seed;

import com.ritesh.portfolio.entity.*;
import com.ritesh.portfolio.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final SkillRepository skillRepository;
    private final ProjectRepository projectRepository;
    private final ExperienceRepository experienceRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            log.info("Initializing admin user...");
            User admin = User.builder()
                    .name("Ritesh Panda")
                    .email("ritesh@example.com")
                    .password(passwordEncoder.encode("Admin@123456"))
                    .role("ROLE_ADMIN")
                    .enabled(true)
                    .build();
            userRepository.save(admin);
        }

        if (profileRepository.count() == 0) {
            log.info("Initializing profile...");
            Profile profile = Profile.builder()
                    .name("Ritesh Panda")
                    .title("Full Stack & AI Engineer")
                    .bio("Specialized in building high-performance web applications and AI-integrated systems using React, Spring Boot, and Python.")
                    .location("India")
                    .email("ritesh@example.com")
                    .githubUrl("https://github.com/riteshpanda")
                    .linkedinUrl("https://linkedin.com/in/riteshpanda")
                    .highlights(List.of("5+ Years Experience", "20+ Web & AI Projects", "Full Stack Specialist"))
                    .build();
            profileRepository.save(profile);
        }

        if (skillRepository.count() == 0) {
            log.info("Initializing sample skills...");
            skillRepository.saveAll(List.of(
                    Skill.builder().name("React.js").category("Frontend").proficiencyLevel(92).featured(true).displayOrder(1).build(),
                    Skill.builder().name("Java / Spring Boot").category("Backend").proficiencyLevel(90).featured(true).displayOrder(2).build(),
                    Skill.builder().name("Python / Fast API").category("AI & Backend").proficiencyLevel(85).featured(true).displayOrder(3).build(),
                    Skill.builder().name("PostgreSQL / MySQL").category("Database").proficiencyLevel(88).featured(true).displayOrder(4).build(),
                    Skill.builder().name("Docker & AWS").category("DevOps").proficiencyLevel(80).featured(true).displayOrder(5).build()
            ));
        }

        if (projectRepository.count() == 0) {
            log.info("Initializing sample projects...");
            projectRepository.saveAll(List.of(
                    Project.builder()
                            .title("PrepNova AI")
                            .summary("AI-powered Interview & Exam Preparation Platform")
                            .description("An interactive AI suite that offers adaptive mock interviews, instant resume grading, and AI skill assessment.")
                            .category("AI / Web App")
                            .technologies(List.of("React", "Spring Boot", "Python", "OpenAI", "PostgreSQL"))
                            .githubUrl("https://github.com/riteshpanda/prepnova-ai")
                            .featured(true)
                            .displayOrder(1)
                            .build(),
                    Project.builder()
                            .title("AI Recruitment Suite")
                            .summary("Automated candidate screening & resume parsing")
                            .description("Streamlines HR workflows with automated semantic resume matching and automated candidate evaluations.")
                            .category("AI")
                            .technologies(List.of("React", "FastAPI", "PyTorch", "Docker"))
                            .githubUrl("https://github.com/riteshpanda/ai-recruitment")
                            .featured(true)
                            .displayOrder(2)
                            .build()
            ));
        }
    }
}
