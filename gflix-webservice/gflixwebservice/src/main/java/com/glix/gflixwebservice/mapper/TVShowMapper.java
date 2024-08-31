package com.glix.gflixwebservice.mapper;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.glix.gflixwebservice.dtos.TVShowsDTO;
import org.json.JSONObject;

import java.io.IOException;
import java.util.List;

public class TVShowMapper {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static TVShowsDTO jsonToTVShowsDTO(JSONObject json, List<String> genreList) throws IOException {

        Long id = json.optLong("id");
        String title = json.optString("name");
        String overview = json.optString("overview");
        String posterPath = json.optString("backdrop_path");
        String backdropPath = json.optString("poster_path");

        return new TVShowsDTO(id, title, overview, posterPath, backdropPath, genreList);
    }
}
