package com.glix.gflixwebservice.services;

import com.glix.gflixwebservice.dtos.GenreDTO;
import org.json.JSONObject;

import java.io.IOException;
import java.util.List;

public interface TMDBService {

    JSONObject getMovies(int page);

    JSONObject getTVShows(int page);

    List<GenreDTO> getGenres() throws IOException;

    JSONObject getMovieById(Long movieId);

    JSONObject getTvShowById(Long tvShowId);

    JSONObject getMovieBySearch(String searchQuery, int page);

    JSONObject getTvBySearch(String searchQuery, int page);
}
