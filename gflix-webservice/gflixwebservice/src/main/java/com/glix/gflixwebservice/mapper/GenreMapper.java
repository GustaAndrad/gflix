package com.glix.gflixwebservice.mapper;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.glix.gflixwebservice.dtos.GenreDTO;
import org.json.JSONObject;

import java.io.IOException;

public class GenreMapper {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static GenreDTO jsonToGenreDTO(JSONObject json) throws IOException {

        Long id = json.optLong("id");
        String title = json.optString("name");

        return new GenreDTO(id, title);
    }
}
