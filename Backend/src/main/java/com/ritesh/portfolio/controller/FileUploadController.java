package com.ritesh.portfolio.controller;

import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@Slf4j
@RestController
@RequestMapping("/api/upload")
public class FileUploadController {

    private static final Set<String> ALLOWED_EXTENSIONS = Set.of(
            ".jpg", ".jpeg", ".png", ".webp", ".gif", ".pdf"
    );

    private static final Set<String> ALLOWED_CONTENT_TYPES = Set.of(
            "image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf"
    );

    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    @Value("${upload.dir:./uploads}")
    private String uploadDirProperty;

    @Value("${app.base-url:}")
    private String configuredBaseUrl;

    private Path uploadLocation;

    @PostConstruct
    public void init() {
        try {
            this.uploadLocation = Paths.get(uploadDirProperty).toAbsolutePath().normalize();
            if (!Files.exists(this.uploadLocation)) {
                Files.createDirectories(this.uploadLocation);
            }
            log.info("File upload directory initialized at: {}", this.uploadLocation);
        } catch (IOException e) {
            log.error("Could not initialize upload folder at {}: {}", uploadDirProperty, e.getMessage());
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> uploadFile(
            @RequestParam("file") MultipartFile file,
            HttpServletRequest request
    ) {
        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Cannot upload an empty file"));
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
                    .body(Map.of("error", "File exceeds maximum permitted size of 10MB"));
        }

        String rawFilename = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        if (rawFilename.contains("..") || rawFilename.contains("/") || rawFilename.contains("\\")) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid filename path sequence"));
        }

        String extension = "";
        int dotIdx = rawFilename.lastIndexOf('.');
        if (dotIdx >= 0) {
            extension = rawFilename.substring(dotIdx).toLowerCase(Locale.ROOT);
        }

        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "File extension '" + extension + "' is not permitted. Allowed: " + ALLOWED_EXTENSIONS
            ));
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType.toLowerCase(Locale.ROOT))) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "Content-Type '" + contentType + "' is not permitted. Allowed: " + ALLOWED_CONTENT_TYPES
            ));
        }

        String safeBaseName = rawFilename.substring(0, dotIdx >= 0 ? dotIdx : rawFilename.length())
                .replaceAll("[^a-zA-Z0-9_-]", "_");
        if (safeBaseName.length() > 50) {
            safeBaseName = safeBaseName.substring(0, 50);
        }

        String uniqueFilename = UUID.randomUUID().toString().substring(0, 8) + "_" + safeBaseName + extension;

        try {
            Path destinationFile = this.uploadLocation.resolve(uniqueFilename).normalize().toAbsolutePath();
            if (!destinationFile.startsWith(this.uploadLocation)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "Cannot store file outside target directory"));
            }

            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
            }

            String baseUrl;
            if (configuredBaseUrl != null && !configuredBaseUrl.isBlank()) {
                baseUrl = configuredBaseUrl.replaceAll("/+$", "");
            } else {
                baseUrl = ServletUriComponentsBuilder.fromContextPath(request).build().toUriString();
            }

            String fullUrl = baseUrl + "/media/" + uniqueFilename;
            String relativePath = "/media/" + uniqueFilename;

            Map<String, String> response = new HashMap<>();
            response.put("filename", uniqueFilename);
            response.put("url", fullUrl);
            response.put("path", relativePath);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IOException e) {
            log.error("Failed to store uploaded file {}: {}", uniqueFilename, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to store file: " + e.getMessage()));
        }
    }
}
