package com.glix.gflixwebservice.mapper;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.glix.gflixwebservice.dtos.MovieDTO;
import org.json.JSONObject;

import java.io.IOException;
import java.util.List;

public class MovieMapper {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static MovieDTO jsonToMovieDTO(JSONObject json, List<String> genreList) throws IOException {

        Long id = json.optLong("id");
        String title = json.optString("title");
        String overview = json.optString("overview");
        String posterPath = json.optString("poster_path");
        String backdropPath = json.optString("backdrop_path");

        return new MovieDTO(id, title, overview, posterPath, backdropPath, genreList, false);
    }
}