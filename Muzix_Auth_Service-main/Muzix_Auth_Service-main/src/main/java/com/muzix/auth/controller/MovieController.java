package com.muzix.auth.controller;

import com.muzix.auth.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @GetMapping("/popular")
    public ResponseEntity<?> getPopularMovies(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestHeader("Authorization") String token
    ) {
        return ResponseEntity.ok(movieService.getPopularMovies(userDetails.getUsername(), token));
    }

    @GetMapping("/trending")
    public ResponseEntity<?> getTrendingMovies(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestHeader("Authorization") String token
    ) {
        return ResponseEntity.ok(movieService.getTrendingMovies(userDetails.getUsername(), token));
    }

    @GetMapping("/top-rated")
    public ResponseEntity<?> getTopRatedMovies(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestHeader("Authorization") String token
    ) {
        return ResponseEntity.ok(movieService.getTopRatedMovies(userDetails.getUsername(), token));
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchMovies(
            @RequestParam String query,
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestHeader("Authorization") String token
    ) {
        return ResponseEntity.ok(movieService.searchMovies(query, userDetails.getUsername(), token));
    }
}