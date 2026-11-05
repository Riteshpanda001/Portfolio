package com.ritesh.portfolio.seed;

import com.ritesh.portfolio.entity.User;
import com.ritesh.portfolio.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Seeds the database with a default admin user on first startup.
 * Run once: if the users table is empty, the admin account is created.
 *
 * Default credentials (change after first login!):
 *   Email:    riteshkumarpanda001@gmail.com
 *   Password: Admin@123456
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements ApplicationRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        if (userRepository.count() == 0) {
            User admin = User.builder()
                    .name("Ritesh Kumar Panda")
                    .email("riteshkumarpanda001@gmail.com")
                    .password(passwordEncoder.encode("Admin@123456"))
                    .role(User.Role.ADMIN)
                    .build();
            userRepository.save(admin);
            log.info("=== Default admin user created. Email: {} — Please change the password after first login! ===",
                    admin.getEmail());
        } else {
            log.debug("DataSeeder: users already exist, skipping seed.");
        }
    }
}
