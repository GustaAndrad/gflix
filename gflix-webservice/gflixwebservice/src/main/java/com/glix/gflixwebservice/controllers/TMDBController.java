package com.glix.gflixwebservice.controllers;

import com.glix.gflixwebservice.dtos.MovieDTO;
import com.glix.gflixwebservice.dtos.TVShowsDTO;
import com.glix.gflixwebservice.mapper.MovieMapper;
import com.glix.gflixwebservice.mapper.TVShowMapper;
import com.glix.gflixwebservice.services.TMDBService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TMDBController {

    private final TMDBService tmdbService;

    public TMDBController(TMDBService tmdbService) {
        this.tmdbService = tmdbService;
    }

    @GetMapping("/movies")
    public ResponseEntity<Object> getPopularMovies(@RequestParam(defaultValue = "1") int page) throws IOException {
        try {
            JSONObject movies = tmdbService.getMovies(page);
            JSONArray listMovies = movies.optJSONArray("results");
            List<MovieDTO> movieDTOS = new ArrayList<>();

            for (int i = 0; i < listMovies.length(); i++) {
                JSONObject movie = listMovies.optJSONObject(i);
                List<String> genreTeste = List.of("Action", "Comedy", "Drama"); //trocar dps
                movieDTOS.add(MovieMapper.jsonToMovieDTO(movie, genreTeste));
            }

            return ResponseEntity.status(HttpStatus.OK).body(movieDTOS);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Erro ao buscar filmes");
        }
    }

    @GetMapping("/tvshows")
    public ResponseEntity<Object> getPopularTVShows(@RequestParam(defaultValue = "1") int page) throws IOException {
        try {
            JSONObject tvs = tmdbService.getTVShows(page);
            JSONArray listTvs = tvs.optJSONArray("results");
            List<TVShowsDTO> tvShowsDTOS = new ArrayList<>();

            for (int i = 0; i < listTvs.length(); i++) {
                JSONObject tv = listTvs.getJSONObject(i);
                List<String> genreTeste = List.of("Action", "Comedy", "Drama"); //trocar dps
                tvShowsDTOS.add(TVShowMapper.jsonToTVShowsDTO(tv, genreTeste));
            }

            return ResponseEntity.status(HttpStatus.OK).body(tvShowsDTOS);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Erro ao buscar series");
        }
    }
}
