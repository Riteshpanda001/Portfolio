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
                    .role(User.Role.ADMIN)
                    .build();
            userRepository.save(admin);
        }

        if (profileRepository.count() == 0) {
            log.info("Initializing profile...");
            Profile profile = Profile.builder()
                    .name("Ritesh Panda")
                    .title("AI/ML Engineer | Data Analyst | Web Developer")
                    .bio("Specializing in AI/ML model development, Data Analytics, and Web Development using React, Node.js, and Python.")
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
            log.info("Initializing portfolio projects...");
            projectRepository.saveAll(List.of(
                    Project.builder()
                            .title("AI HR & Recruitment Platform")
                            .description("Recruiters often spend significant time manually screening resumes, comparing candidates, conducting interviews, and identifying skill gaps.")
                            .longDescription("Building an AI-powered recruitment platform that supports resume screening, candidate ranking, candidate matching, AI-assisted interviews, voice interviews, recruiter workflows, and skill-gap analysis.")
                            .category("AI / Backend / Full-Stack")
                            .technologies(List.of("Python", "FastAPI", "AI/ML", "REST APIs", "MongoDB"))
                            .githubUrl("https://github.com/Riteshpanda001")
                            .featured(true)
                            .displayOrder(1)
                            .build(),
                    Project.builder()
                            .title("AI Risk Manager")
                            .description("Identifying and managing potential risks across complex information and decision-making processes can require significant manual analysis and consistent evaluation.")
                            .longDescription("Developing an AI-powered risk management system that analyzes relevant data, identifies potential risks, supports risk assessment, and presents actionable insights through an intuitive application interface.")
                            .category("AI / Machine Learning / Risk Management")
                            .technologies(List.of("Python", "Machine Learning", "AI", "Data Analysis"))
                            .githubUrl("https://github.com/Riteshpanda001")
                            .featured(true)
                            .displayOrder(2)
                            .build(),
                    Project.builder()
                            .title("College AI Assistant")
                            .description("Students often need to search through different sources to find information about college resources, academic activities, procedures, and frequently asked questions.")
                            .longDescription("Developing an AI-powered college assistant that can help students access relevant college information, answer common questions, and provide a conversational interface for interacting with academic and campus-related information.")
                            .category("AI / Generative AI / Education")
                            .technologies(List.of("Python", "AI", "Generative AI", "React"))
                            .githubUrl("https://github.com/Riteshpanda001")
                            .featured(true)
                            .displayOrder(3)
                            .build(),
                    Project.builder()
                            .title("E-Commerce Business Intelligence & Customer Analytics")
                            .description("E-commerce businesses generate large volumes of customer, order, and product data, but extracting meaningful business insights from this data can be difficult without structured analysis and visualization.")
                            .longDescription("Built an end-to-end business intelligence solution using SQL, Python, Power BI, and Excel to analyze sales performance, customer behavior, product trends, and key business metrics.")
                            .category("DATA SCIENCE / BUSINESS INTELLIGENCE")
                            .technologies(List.of("SQL", "Python", "Power BI", "Excel", "Pandas"))
                            .githubUrl("https://github.com/Riteshpanda001")
                            .featured(false)
                            .displayOrder(4)
                            .build(),
                    Project.builder()
                            .title("Customer Churn Prediction & Retention Analytics")
                            .description("Customer churn can negatively affect business growth, while identifying customers at risk of leaving is difficult using manual analysis alone.")
                            .longDescription("Developed a machine learning pipeline to analyze customer behavior, identify churn patterns, predict customers at risk of leaving, and visualize retention insights through Power BI.")
                            .category("MACHINE LEARNING / DATA ANALYTICS")
                            .technologies(List.of("Python", "SQL", "Machine Learning", "Scikit-learn", "Power BI", "Pandas"))
                            .githubUrl("https://github.com/Riteshpanda001")
                            .featured(false)
                            .displayOrder(5)
                            .build(),
                    Project.builder()
                            .title("Data Analyst Job Market Intelligence")
                            .description("Job seekers often lack a clear understanding of which skills, technologies, locations, and qualifications are most commonly requested in Data Analyst job postings.")
                            .longDescription("Built a data analytics project that analyzes Data Analyst job market information to identify in-demand skills, technologies, job locations, experience requirements, salary patterns, and market trends.")
                            .category("DATA ANALYTICS / MARKET INTELLIGENCE")
                            .technologies(List.of("Python", "SQL", "Pandas", "Power BI", "Excel", "Data Visualization"))
                            .githubUrl("https://github.com/Riteshpanda001")
                            .featured(false)
                            .displayOrder(6)
                            .build(),
                    Project.builder()
                            .title("Myshope E-Commerce Website")
                            .description("Users need a simple and responsive interface for browsing, searching, and exploring products through an e-commerce website.")
                            .longDescription("Built a responsive e-commerce frontend with product listings, navigation, search and filtering functionality, authentication-related pages, and an organized shopping interface.")
                            .category("Frontend / E-Commerce")
                            .technologies(List.of("HTML", "CSS", "JavaScript"))
                            .githubUrl("https://github.com/Riteshpanda001")
                            .featured(false)
                            .displayOrder(7)
                            .build()
            ));
        }
    }
}
