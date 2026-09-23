package com.ritesh.portfolio.dto;

/**
 * Response for POST /api/auth/login — carries the JWT.
 */
public record LoginResponse(
        String token,
        String refreshToken,
        String type,
        Long userId,
        String name,
        String email,
        String role
) {
    /** Convenience factory. */
    public static LoginResponse of(String token, String refreshToken,
                                   Long userId, String name,
                                   String email, String role) {
        return new LoginResponse(token, refreshToken, "Bearer",
                                 userId, name, email, role);
    }
}
