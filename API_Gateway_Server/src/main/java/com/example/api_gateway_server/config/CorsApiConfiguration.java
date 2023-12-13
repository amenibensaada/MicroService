package com.example.api_gateway_server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;
@Configuration

public class CorsApiConfiguration extends org.springframework.web.cors.CorsConfiguration {

        @Bean
        public CorsWebFilter corsWebFilter() {

            final CorsConfiguration corsConfig = new CorsConfiguration();
            corsConfig.setAllowedOrigins(Collections.singletonList("*"));
            corsConfig.setMaxAge(3600L);
            corsConfig.setAllowedMethods(Arrays.asList("GET", "POST","PUT", "DELETE"));
            corsConfig.addAllowedHeader("Content-Type");

            final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            source.registerCorsConfiguration("/**", corsConfig);
// org.springframework.web.cors.reactive.CorsConfigurationSource
            return new CorsWebFilter(source);
        }}
