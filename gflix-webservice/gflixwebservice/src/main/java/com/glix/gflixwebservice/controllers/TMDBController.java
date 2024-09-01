package com.glix.gflixwebservice.controllers;

import com.glix.gflixwebservice.dtos.GenreDTO;
import com.glix.gflixwebservice.dtos.MovieDTO;
import com.glix.gflixwebservice.dtos.TVShowsDTO;
import com.glix.gflixwebservice.mapper.MovieMapper;
import com.glix.gflixwebservice.mapper.TVShowMapper;
import com.glix.gflixwebservice.services.MyListService;
import com.glix.gflixwebservice.services.TMDBService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class TMDBController {

    private final TMDBService tmdbService;

    private final MyListService myListService;

    public TMDBController(TMDBService tmdbService, MyListService myListService) {
        this.tmdbService = tmdbService;
        this.myListService = myListService;
    }

    @GetMapping("/movies")
    public ResponseEntity<Object> getPopularMovies(@RequestParam(defaultValue = "1") int page, @RequestParam(required = false) String userId) {
        try {
            JSONObject movies = tmdbService.getMovies(page);
            List<GenreDTO> genres = tmdbService.getGenres();
            JSONArray listMovies = movies.optJSONArray("results");
            List<MovieDTO> movieDTOS = new ArrayList<>();

            Map<Long, String> genreMap = genres.stream().collect(Collectors.toMap(GenreDTO::getId, GenreDTO::getNome));

            for (int i = 0; i < listMovies.length(); i++) {
                JSONObject movie = listMovies.optJSONObject(i);
                List<String> genreListNomes = this.getGenreListNomes(movie, genreMap);
                boolean isFavorite = false;

                if (userId != null) {
                    isFavorite = myListService.existsFavoriteByUserIdAndMovieId(userId, movie.optLong("id"));
                }

                movieDTOS.add(MovieMapper.jsonToMovieDTO(movie, genreListNomes, isFavorite));
            }

            return ResponseEntity.status(HttpStatus.OK).body(movieDTOS);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Erro ao buscar filmes");
        }
    }


    @GetMapping("/tvshows")
    public ResponseEntity<Object> getPopularTVShows(@RequestParam(defaultValue = "1") int page, @RequestParam(required = false) String userId) {
        try {
            JSONObject tvs = tmdbService.getTVShows(page);
            List<GenreDTO> genres = tmdbService.getGenres();
            JSONArray listTvs = tvs.optJSONArray("results");
            List<TVShowsDTO> tvShowsDTOS = new ArrayList<>();

            Map<Long, String> genreMap = genres.stream().collect(Collectors.toMap(GenreDTO::getId, GenreDTO::getNome));

            for (int i = 0; i < listTvs.length(); i++) {
                JSONObject tv = listTvs.getJSONObject(i);
                List<String> genreListNomes = this.getGenreListNomes(tv, genreMap);
                boolean isFavorite = false;

                if (userId != null) {
                    isFavorite = myListService.existsFavoriteByUserIdAndTvId(userId, tv.optLong("id"));
                }
                tvShowsDTOS.add(TVShowMapper.jsonToTVShowsDTO(tv, genreListNomes, isFavorite));
            }

            return ResponseEntity.status(HttpStatus.OK).body(tvShowsDTOS);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Erro ao buscar series");
        }
    }

    @GetMapping("/movieById/{id}")
    public ResponseEntity<Object> getMovieById(@PathVariable Long id, @RequestParam(required = false) String userId) {
        try {
            JSONObject movie = tmdbService.getMovieById(id);

            boolean isFavorite = false;

            if (userId != null) {
                isFavorite = myListService.existsFavoriteByUserIdAndMovieId(userId, movie.optLong("id"));
            }

            movie.put("isFavorite", isFavorite);

            return ResponseEntity.status(HttpStatus.OK).body(movie.toMap());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Erro ao buscar o filme");
        }
    }

    @GetMapping("/tvById/{id}")
    public ResponseEntity<Object> getTvById(@PathVariable Long id, @RequestParam(required = false) String userId) {
        try {
            JSONObject tv = tmdbService.getTvShowById(id);

            boolean isFavorite = false;

            if (userId != null) {
                isFavorite = myListService.existsFavoriteByUserIdAndTvId(userId, tv.optLong("id"));
            }

            tv.put("isFavorite", isFavorite);

            return ResponseEntity.status(HttpStatus.OK).body(tv.toMap());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Erro ao buscar o filme");
        }
    }

    @PostMapping("/movieBySearch")
    public ResponseEntity<Object> getMovieBySearch(@RequestParam(defaultValue = "1") int page,
                                                   @RequestParam() String userId,
                                                   @RequestBody() String searchQuery) {
        try {
            JSONObject movies = tmdbService.getMovieBySearch(searchQuery, page);
            List<GenreDTO> genres = tmdbService.getGenres();
            List<MovieDTO> movieDTOS = new ArrayList<>();

            JSONArray listaFilmesEncontrados = movies.optJSONArray("results");
            Map<Long, String> genreMap = genres.stream().collect(Collectors.toMap(GenreDTO::getId, GenreDTO::getNome));

            for (int i = 0; i < listaFilmesEncontrados.length(); i++) {
                JSONObject movie = listaFilmesEncontrados.optJSONObject(i);
                List<String> genreListNomes = this.getGenreListNomes(movie, genreMap);
                boolean isFavorite = false;

                if (userId != null) {
                    isFavorite = myListService.existsFavoriteByUserIdAndMovieId(userId, movie.optLong("id"));
                }

                movieDTOS.add(MovieMapper.jsonToMovieDTO(movie, genreListNomes, isFavorite));
            }

            return ResponseEntity.status(HttpStatus.OK).body(movieDTOS);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Erro ao buscar o filme");
        }
    }

    @PostMapping("/tvBySearch")
    public ResponseEntity<Object> getTvBySearch(@RequestParam(defaultValue = "1") int page,
                                                @RequestParam() String userId,
                                                @RequestBody() String searchQuery) {
        try {
            JSONObject tvs = tmdbService.getTvBySearch(searchQuery, page);

            List<GenreDTO> genres = tmdbService.getGenres();
            JSONArray listTvs = tvs.optJSONArray("results");
            List<TVShowsDTO> tvShowsDTOS = new ArrayList<>();

            Map<Long, String> genreMap = genres.stream().collect(Collectors.toMap(GenreDTO::getId, GenreDTO::getNome));

            for (int i = 0; i < listTvs.length(); i++) {
                JSONObject tv = listTvs.getJSONObject(i);
                List<String> genreListNomes = this.getGenreListNomes(tv, genreMap);
                boolean isFavorite = false;

                if (userId != null) {
                    isFavorite = myListService.existsFavoriteByUserIdAndTvId(userId, tv.optLong("id"));
                }
                tvShowsDTOS.add(TVShowMapper.jsonToTVShowsDTO(tv, genreListNomes, isFavorite));
            }

            return ResponseEntity.status(HttpStatus.OK).body(tvShowsDTOS);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Erro ao buscar o filme");
        }
    }

    private List<String> getGenreListNomes(JSONObject midia, Map<Long, String> genreMap) {

        return Optional.ofNullable(midia.optJSONArray("genre_ids")).map(genreIds -> IntStream.range(0, genreIds.length()).mapToObj(genreIds::optLong).map(genreMap::get).filter(Objects::nonNull).collect(Collectors.toList())).orElse(Collections.emptyList());
    }
}
