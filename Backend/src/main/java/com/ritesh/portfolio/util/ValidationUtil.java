package com.ritesh.portfolio.util;

import com.ritesh.portfolio.exception.BadRequestException;
import org.springframework.util.StringUtils;

import java.util.regex.Pattern;

/**
 * Stateless utility methods for common validation logic used across services.
 */
public final class ValidationUtil {

    private static final Pattern EMAIL_PATTERN =
            Pattern.compile("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");

    private static final Pattern URL_PATTERN =
            Pattern.compile("^(https?://)[^\\s/$.?#].[^\\s]*$");

    private ValidationUtil() {}

    // ── Require helpers ───────────────────────────────────────

    /**
     * Throw {@link BadRequestException} if the value is blank.
     */
    public static void requireNonBlank(String value, String fieldName) {
        if (!StringUtils.hasText(value)) {
            throw new BadRequestException(fieldName + " must not be blank.");
        }
    }

    /**
     * Throw if value exceeds the given maximum length.
     */
    public static void requireMaxLength(String value, int max, String fieldName) {
        if (value != null && value.length() > max) {
            throw new BadRequestException(
                    fieldName + " must not exceed " + max + " characters.");
        }
    }

    // ── Format checks ─────────────────────────────────────────

    public static boolean isValidEmail(String email) {
        return StringUtils.hasText(email) && EMAIL_PATTERN.matcher(email).matches();
    }

    public static boolean isValidUrl(String url) {
        return StringUtils.hasText(url) && URL_PATTERN.matcher(url).matches();
    }

    /**
     * Assert email format or throw.
     */
    public static void requireValidEmail(String email, String fieldName) {
        if (!isValidEmail(email)) {
            throw new BadRequestException(fieldName + " is not a valid email address.");
        }
    }

    /**
     * Assert that {@code level} is in the range {@code [0, 100]}.
     */
    public static void requireValidSkillLevel(int level) {
        if (level < 0 || level > 100) {
            throw new BadRequestException("Skill level must be between 0 and 100.");
        }
    }
}
