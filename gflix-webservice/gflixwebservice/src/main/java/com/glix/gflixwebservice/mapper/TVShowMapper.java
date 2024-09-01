package com.glix.gflixwebservice.mapper;

import com.glix.gflixwebservice.dtos.TVShowsDTO;
import com.glix.gflixwebservice.enums.Tipo;
import org.json.JSONObject;

import java.util.List;

public class TVShowMapper {

    public static TVShowsDTO jsonToTVShowsDTO(JSONObject json, List<String> genreList, boolean isFavorite) {

        Long id = json.optLong("id");
        String title = json.optString("name");
        String overview = json.optString("overview");
        String posterPath = json.optString("backdrop_path");
        String backdropPath = json.optString("poster_path");
        Tipo tipo = Tipo.TV;

        return new TVShowsDTO(id, title, overview, posterPath, backdropPath, genreList, isFavorite, tipo);
    }
}
