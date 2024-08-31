package com.glix.gflixwebservice.mapper;

import com.glix.gflixwebservice.dtos.GenreDTO;
import org.json.JSONObject;

public class GenreMapper {

    public static GenreDTO jsonToGenreDTO(JSONObject json) {

        Long id = json.optLong("id");
        String title = json.optString("name");

        return new GenreDTO(id, title);
    }
}
