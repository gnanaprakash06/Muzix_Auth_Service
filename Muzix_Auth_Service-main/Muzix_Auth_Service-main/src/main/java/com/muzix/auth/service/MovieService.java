package com.muzix.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MovieService {

    @Value("${tmdb.api.key:fdbc479e298584db44a1b74791d3c3f4}")
    private String tmdbApiKey;

    @Value("${tmdb.base.url:https://api.themoviedb.org/3}")
    private String tmdbBaseUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, Object> getPopularMovies(String userEmail, String token) {
        String url = tmdbBaseUrl + "/movie/popular?api_key=" + tmdbApiKey;
        return fetchMoviesWithUserInfo(url, userEmail, token);
    }

    public Map<String, Object> getTrendingMovies(String userEmail, String token) {
        String url = tmdbBaseUrl + "/trending/movie/week?api_key=" + tmdbApiKey;
        return fetchMoviesWithUserInfo(url, userEmail, token);
    }

    public Map<String, Object> getTopRatedMovies(String userEmail, String token) {
        String url = tmdbBaseUrl + "/movie/top_rated?api_key=" + tmdbApiKey;
        return fetchMoviesWithUserInfo(url, userEmail, token);
    }

    public Map<String, Object> searchMovies(String query, String userEmail, String token) {
        String url = tmdbBaseUrl + "/search/movie?api_key=" + tmdbApiKey + "&query=" + query;
        return fetchMoviesWithUserInfo(url, userEmail, token);
    }

    private Map<String, Object> fetchMoviesWithUserInfo(String url, String userEmail, String token) {
        try {
            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);

            Map<String, Object> result = new HashMap<>();
            result.put("movies", response.getBody());
            result.put("userEmail", userEmail);
            result.put("timestamp", System.currentTimeMillis());

            return result;
        } catch (Exception e) {
            Map<String, Object> errorResult = new HashMap<>();
            errorResult.put("error", "Failed to fetch movies: " + e.getMessage());
            errorResult.put("userEmail", userEmail);
            return errorResult;
        }
    }
}