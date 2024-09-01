package com.glix.gflixwebservice.mapper;

import com.glix.gflixwebservice.dtos.MovieDTO;
import com.glix.gflixwebservice.enums.Tipo;
import org.json.JSONObject;

import java.util.List;

public class MovieMapper {

    public static MovieDTO jsonToMovieDTO(JSONObject json, List<String> genreList, boolean isFavorite) {

        Long id = json.optLong("id");
        String title = json.optString("title");
        String overview = json.optString("overview");
        String posterPath = json.optString("poster_path");
        String backdropPath = json.optString("backdrop_path");
        Tipo tipo = Tipo.MOVIE;

        return new MovieDTO(id, title, overview, posterPath, backdropPath, genreList, isFavorite, tipo);
    }
}