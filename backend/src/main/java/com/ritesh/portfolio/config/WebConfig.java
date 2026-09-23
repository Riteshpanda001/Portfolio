package com.ritesh.portfolio.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * MVC configuration — static resource serving and any
 * additional handler/converter overrides.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * Serve uploaded media files from the local filesystem.
     * Override {@code uploads.dir} in application.yml for your environment.
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/media/**")
                .addResourceLocations("file:uploads/")
                .setCachePeriod(3600);
    }
}
