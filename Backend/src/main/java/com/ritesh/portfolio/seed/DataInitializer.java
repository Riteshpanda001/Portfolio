package com.ritesh.portfolio.seed;

import com.ritesh.portfolio.entity.*;
import com.ritesh.portfolio.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
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
    private final EducationRepository educationRepository;
    private final CertificationRepository certificationRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.default-email:riteshkumarpanda001@gmail.com}")
    private String adminEmail;

    @Value("${admin.default-password:Admin@123456}")
    private String adminPassword;

    @Value("${admin.default-name:Ritesh Kumar Panda}")
    private String adminName;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            log.info("Initializing primary admin account...");
            User admin = User.builder()
                    .name(adminName)
                    .email(adminEmail)
                    .password(passwordEncoder.encode(adminPassword))
                    .role(User.Role.ADMIN)
                    .build();
            userRepository.save(admin);
            log.info("Admin account successfully initialized for: {}", adminEmail);
        }

        if (profileRepository.count() == 0) {
            log.info("Initializing profile...");
            Profile profile = Profile.builder()
                    .name("Ritesh Kumar Panda")
                    .title("AI/ML Engineer & Full-Stack Developer")
                    .bio("Computer Science Engineering student and software engineer passionate about building modern web applications, intelligent AI/ML systems, and data-driven solutions.")
                    .location("Berhampur, Odisha, India")
                    .email("riteshkumarpanda001@gmail.com")
                    .phoneNumber("+91 9692229676")
                    .githubUrl("https://github.com/Riteshpanda001")
                    .linkedinUrl("https://www.linkedin.com/in/ritesh-kumar-panda-9b55b135a")
                    .twitterUrl("https://twitter.com/riteshpanda")
                    .highlights(List.of("AI/ML & Generative AI", "B.Tech CSE @ NIST University (2023-2027)", "Full-Stack Development"))
                    .build();
            profileRepository.save(profile);
        }

        if (skillRepository.count() == 0) {
            log.info("Initializing skills...");
            skillRepository.saveAll(List.of(
                    // Machine Learning
                    Skill.builder().name("Python").category("Machine Learning").proficiencyLevel(95).featured(true).displayOrder(1).build(),
                    Skill.builder().name("PyTorch").category("Machine Learning").proficiencyLevel(85).featured(true).displayOrder(2).build(),
                    Skill.builder().name("TensorFlow").category("Machine Learning").proficiencyLevel(82).featured(true).displayOrder(3).build(),
                    Skill.builder().name("Scikit-Learn").category("Machine Learning").proficiencyLevel(90).featured(true).displayOrder(4).build(),
                    Skill.builder().name("Pandas & NumPy").category("Machine Learning").proficiencyLevel(92).featured(true).displayOrder(5).build(),
                    Skill.builder().name("LLMs / LangChain / RAG").category("Machine Learning").proficiencyLevel(88).featured(true).displayOrder(6).build(),

                    // Data Analytics
                    Skill.builder().name("SQL").category("Data Analytics").proficiencyLevel(90).featured(true).displayOrder(7).build(),
                    Skill.builder().name("Power BI").category("Data Analytics").proficiencyLevel(88).featured(true).displayOrder(8).build(),
                    Skill.builder().name("Tableau").category("Data Analytics").proficiencyLevel(80).featured(false).displayOrder(9).build(),
                    Skill.builder().name("Data Visualization").category("Data Analytics").proficiencyLevel(86).featured(true).displayOrder(10).build(),
                    Skill.builder().name("Exploratory Data Analysis").category("Data Analytics").proficiencyLevel(90).featured(false).displayOrder(11).build(),

                    // Java & Backend
                    Skill.builder().name("Java (Core & Advanced)").category("Java & Backend").proficiencyLevel(90).featured(true).displayOrder(12).build(),
                    Skill.builder().name("Spring Boot").category("Java & Backend").proficiencyLevel(88).featured(true).displayOrder(13).build(),
                    Skill.builder().name("Spring Security & JWT").category("Java & Backend").proficiencyLevel(85).featured(true).displayOrder(14).build(),
                    Skill.builder().name("REST APIs").category("Java & Backend").proficiencyLevel(92).featured(true).displayOrder(15).build(),
                    Skill.builder().name("Hibernate / JPA").category("Java & Backend").proficiencyLevel(86).featured(false).displayOrder(16).build(),

                    // Frontend
                    Skill.builder().name("React.js").category("Frontend").proficiencyLevel(90).featured(true).displayOrder(17).build(),
                    Skill.builder().name("JavaScript (ES6+)").category("Frontend").proficiencyLevel(90).featured(true).displayOrder(18).build(),
                    Skill.builder().name("HTML5 & CSS3").category("Frontend").proficiencyLevel(95).featured(true).displayOrder(19).build(),
                    Skill.builder().name("Responsive Web Design").category("Frontend").proficiencyLevel(92).featured(false).displayOrder(20).build(),

                    // DevOps & Tools
                    Skill.builder().name("Git & GitHub").category("DevOps & Tools").proficiencyLevel(90).featured(true).displayOrder(21).build(),
                    Skill.builder().name("Docker").category("DevOps & Tools").proficiencyLevel(78).featured(false).displayOrder(22).build(),
                    Skill.builder().name("Maven").category("DevOps & Tools").proficiencyLevel(85).featured(false).displayOrder(23).build()
            ));
        }

        if (experienceRepository.count() == 0) {
            log.info("Initializing experience data...");
            experienceRepository.saveAll(List.of(
                    Experience.builder()
                            .role("Generative AI Intern")
                            .company("Asirudh Software Private Limited")
                            .location("Remote / India")
                            .employmentType("Industry-Oriented Internship")
                            .startDate(LocalDate.of(2026, 5, 1))
                            .endDate(LocalDate.of(2026, 7, 15))
                            .current(false)
                            .description("Completed an industry-oriented Generative AI internship, working on real-world Generative AI projects and gaining practical experience in LLMs, prompt engineering, LangChain, RAG, vector databases, and Python.")
                            .technologies(List.of("Python", "Generative AI", "LLMs", "Prompt Engineering", "LangChain", "RAG", "Vector Databases"))
                            .displayOrder(1)
                            .build(),
                    Experience.builder()
                            .role("Data Science & Data Analysis Using Python")
                            .company("NIST University")
                            .location("Berhampur, Odisha")
                            .employmentType("Summer Course")
                            .startDate(LocalDate.of(2025, 5, 20))
                            .endDate(LocalDate.of(2025, 6, 11))
                            .current(false)
                            .description("Successfully completed a summer course focused on Data Science and Data Analysis using Python, building a foundation in Python-based data analysis and data science concepts.")
                            .technologies(List.of("Python", "Data Science", "Data Analysis", "Data Processing"))
                            .displayOrder(2)
                            .build(),
                    Experience.builder()
                            .role("Agentic AI Certified Foundations Associate")
                            .company("Oracle University")
                            .location("Online")
                            .employmentType("Certification")
                            .startDate(LocalDate.of(2026, 8, 11))
                            .endDate(LocalDate.of(2028, 8, 11))
                            .current(false)
                            .description("Demonstrated foundational knowledge and practical skills in Agentic AI, Autonomous AI agents, LLM orchestration, and Oracle Cloud AI infrastructure.")
                            .technologies(List.of("Agentic AI", "Oracle Cloud (OCI)", "LLMs", "Autonomous Agents", "AI Infrastructure"))
                            .displayOrder(3)
                            .build()
            ));
        }

        if (educationRepository.count() == 0) {
            log.info("Initializing education data...");
            educationRepository.saveAll(List.of(
                    Education.builder()
                            .degree("B.Tech in Computer Science & Engineering")
                            .institution("NIST University")
                            .location("Berhampur, Odisha, India")
                            .grade("CGPA: 8.0 / 10")
                            .startDate(LocalDate.of(2023, 8, 1))
                            .endDate(LocalDate.of(2027, 6, 30))
                            .current(true)
                            .description("Focusing on Data Structures & Algorithms, Artificial Intelligence, Machine Learning, Web Technologies, Database Systems, and Software Engineering.")
                            .displayOrder(1)
                            .build(),
                    Education.builder()
                            .degree("Higher Secondary Education (Science - PCM)")
                            .institution("Council of Higher Secondary Education")
                            .location("Odisha, India")
                            .grade("First Division")
                            .startDate(LocalDate.of(2021, 6, 1))
                            .endDate(LocalDate.of(2023, 5, 31))
                            .current(false)
                            .description("Major coursework in Physics, Chemistry, Mathematics, and Computer Science.")
                            .displayOrder(2)
                            .build()
            ));
        }

        if (certificationRepository.count() == 0) {
            log.info("Initializing certification data...");
            certificationRepository.saveAll(List.of(
                    Certification.builder()
                            .name("Data Science & Data Analysis Using Python")
                            .issuingOrganization("NIST University")
                            .issueDate(LocalDate.of(2025, 6, 11))
                            .credentialUrl("https://nist.edu")
                            .displayOrder(1)
                            .build(),
                    Certification.builder()
                            .name("Oracle Cloud Infrastructure 2026 Certified Agentic AI Foundations Associate")
                            .issuingOrganization("Oracle University")
                            .issueDate(LocalDate.of(2026, 8, 11))
                            .credentialUrl("https://education.oracle.com")
                            .displayOrder(2)
                            .build()
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
                            .title("Hotel AI Assistant")
                            .description("An AI-powered hotel assistance platform that helps users explore hotel services, get instant answers to hotel-related queries, and receive personalized assistance through an intelligent conversational interface.")
                            .longDescription("An AI-powered hotel assistance platform that helps users explore hotel services, get instant answers to hotel-related queries, and receive personalized assistance through an intelligent conversational interface.")
                            .category("Artificial Intelligence / Generative AI / Full-Stack Development")
                            .technologies(List.of("Python", "FastAPI", "React.js", "Generative AI", "Large Language Models (LLMs)", "REST APIs", "MongoDB"))
                            .githubUrl("https://github.com/Riteshpanda001")
                            .featured(true)
                            .displayOrder(3)
                            .build(),
                    Project.builder()
                            .title("Handwritten Digit Recognition System")
                            .description("An interactive handwritten digit recognition system using the MNIST dataset, comparing KNN, SVM, Random Forest, and CNN models to classify handwritten digits from 0 to 9.")
                            .longDescription("An interactive machine learning application that recognizes handwritten digits (0–9) using the MNIST dataset. It implements and compares multiple machine learning algorithms, including K-Nearest Neighbors (KNN), Support Vector Machine (SVM), Random Forest, and Convolutional Neural Networks (CNN), to evaluate their classification performance.")
                            .category("Artificial Intelligence / Machine Learning")
                            .technologies(List.of("Python", "Machine Learning", "Scikit-learn", "Convolutional Neural Networks (CNN)", "FastAPI", "React.js", "Docker", "MNIST Dataset"))
                            .githubUrl("https://github.com/Riteshpanda001/Handwritten-Digit")
                            .featured(false)
                            .displayOrder(4)
                            .build(),
                    Project.builder()
                            .title("E-Commerce Business Intelligence & Customer Analytics")
                            .description("E-commerce businesses generate large volumes of customer, order, and product data, but extracting meaningful business insights from this data can be difficult without structured analysis and visualization.")
                            .longDescription("Built an end-to-end business intelligence solution using SQL, Python, Power BI, and Excel to analyze sales performance, customer behavior, product trends, and key business metrics.")
                            .category("DATA SCIENCE / BUSINESS INTELLIGENCE")
                            .technologies(List.of("SQL", "Python", "Power BI", "Excel", "Pandas"))
                            .githubUrl("https://github.com/Riteshpanda001")
                            .featured(false)
                            .displayOrder(5)
                            .build(),
                    Project.builder()
                            .title("Customer Churn Prediction & Retention Analytics")
                            .description("Customer churn can negatively affect business growth, while identifying customers at risk of leaving is difficult using manual analysis alone.")
                            .longDescription("Developed a machine learning pipeline to analyze customer behavior, identify churn patterns, predict customers at risk of leaving, and visualize retention insights through Power BI.")
                            .category("MACHINE LEARNING / DATA ANALYTICS")
                            .technologies(List.of("Python", "SQL", "Machine Learning", "Scikit-learn", "Power BI", "Pandas"))
                            .githubUrl("https://github.com/Riteshpanda001")
                            .featured(false)
                            .displayOrder(6)
                            .build(),
                    Project.builder()
                            .title("Data Analyst Job Market Intelligence")
                            .description("Job seekers often lack a clear understanding of which skills, technologies, locations, and qualifications are most commonly requested in Data Analyst job postings.")
                            .longDescription("Built a data analytics project that analyzes Data Analyst job market information to identify in-demand skills, technologies, job locations, experience requirements, salary patterns, and market trends.")
                            .category("DATA ANALYTICS / MARKET INTELLIGENCE")
                            .technologies(List.of("Python", "SQL", "Pandas", "Power BI", "Excel", "Data Visualization"))
                            .githubUrl("https://github.com/Riteshpanda001")
                            .featured(false)
                            .displayOrder(7)
                            .build(),
                    Project.builder()
                            .title("Myshope E-Commerce Website")
                            .description("Users need a simple and responsive interface for browsing, searching, and exploring products through an e-commerce website.")
                            .longDescription("Built a responsive e-commerce frontend with product listings, navigation, search and filtering functionality, authentication-related pages, and an organized shopping interface.")
                            .category("Frontend / E-Commerce")
                            .technologies(List.of("HTML", "CSS", "JavaScript"))
                            .githubUrl("https://github.com/Riteshpanda001")
                            .featured(false)
                            .displayOrder(8)
                            .build()
            ));
        }

        projectRepository.findByTitle("College AI Assistant").ifPresent(p -> {
            log.info("Removing College AI Assistant from database...");
            projectRepository.delete(p);
        });

        if (!projectRepository.existsByTitle("Hotel AI Assistant")) {
            log.info("Seeding Hotel AI Assistant...");
            projectRepository.save(Project.builder()
                    .title("Hotel AI Assistant")
                    .description("An AI-powered hotel assistance platform that helps users explore hotel services, get instant answers to hotel-related queries, and receive personalized assistance through an intelligent conversational interface.")
                    .longDescription("An AI-powered hotel assistance platform that helps users explore hotel services, get instant answers to hotel-related queries, and receive personalized assistance through an intelligent conversational interface.")
                    .category("Artificial Intelligence / Generative AI / Full-Stack Development")
                    .technologies(List.of("Python", "FastAPI", "React.js", "Generative AI", "Large Language Models (LLMs)", "REST APIs", "MongoDB"))
                    .githubUrl("https://github.com/Riteshpanda001")
                    .featured(true)
                    .displayOrder(3)
                    .build());
        }

        if (!projectRepository.existsByTitle("Handwritten Digit Recognition System")) {
            log.info("Seeding Handwritten Digit Recognition System...");
            projectRepository.save(Project.builder()
                    .title("Handwritten Digit Recognition System")
                    .description("An interactive handwritten digit recognition system using the MNIST dataset, comparing KNN, SVM, Random Forest, and CNN models to classify handwritten digits from 0 to 9.")
                    .longDescription("An interactive machine learning application that recognizes handwritten digits (0–9) using the MNIST dataset. It implements and compares multiple machine learning algorithms, including K-Nearest Neighbors (KNN), Support Vector Machine (SVM), Random Forest, and Convolutional Neural Networks (CNN), to evaluate their classification performance.")
                    .category("Artificial Intelligence / Machine Learning")
                    .technologies(List.of("Python", "Machine Learning", "Scikit-learn", "Convolutional Neural Networks (CNN)", "FastAPI", "React.js", "Docker", "MNIST Dataset"))
                    .githubUrl("https://github.com/Riteshpanda001/Handwritten-Digit")
                    .featured(false)
                    .displayOrder(4)
                    .build());
        }
    }
}
