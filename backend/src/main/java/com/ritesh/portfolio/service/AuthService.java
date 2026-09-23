package com.ritesh.portfolio.service;

import com.ritesh.portfolio.dto.LoginRequest;
import com.ritesh.portfolio.dto.LoginResponse;
import com.ritesh.portfolio.entity.User;
import com.ritesh.portfolio.exception.BadRequestException;
import com.ritesh.portfolio.repository.UserRepository;
import com.ritesh.portfolio.security.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Authentication service — login, token refresh, password change.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository      userRepository;
    private final JwtService          jwtService;
    private final AuthenticationManager authManager;
    private final PasswordEncoder     passwordEncoder;

    /**
     * Authenticate with email + password and return a JWT pair.
     */
    public LoginResponse login(LoginRequest request) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(), request.password()));

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new BadRequestException("User not found."));

        String accessToken  = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        log.info("User '{}' logged in successfully.", user.getEmail());

        return LoginResponse.of(accessToken, refreshToken,
                                user.getId(), user.getName(),
                                user.getEmail(), user.getRole().name());
    }

    /**
     * Refresh the access token using a valid refresh token.
     */
    public LoginResponse refresh(String refreshToken) {
        String email = jwtService.extractUsername(refreshToken);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User not found."));

        if (!jwtService.isTokenValid(refreshToken, user)) {
            throw new BadRequestException("Refresh token is invalid or expired.");
        }

        String newAccess  = jwtService.generateToken(user);
        String newRefresh = jwtService.generateRefreshToken(user);

        return LoginResponse.of(newAccess, newRefresh,
                                user.getId(), user.getName(),
                                user.getEmail(), user.getRole().name());
    }

    /**
     * Change the authenticated user's password.
     */
    @Transactional
    public void changePassword(String email, String currentPassword, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User not found."));

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new BadRequestException("Current password is incorrect.");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        log.info("Password updated for '{}'.", email);
    }

    /**
     * Update the admin user's name.
     */
    @Transactional
    public User updateProfile(String email, String name) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User not found."));
        user.setName(name);
        return userRepository.save(user);
    }
}
