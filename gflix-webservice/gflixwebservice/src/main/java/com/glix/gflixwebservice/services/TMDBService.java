package com.glix.gflixwebservice.services;

import org.json.JSONObject;

public interface TMDBService {

    JSONObject getMovies(int page);

    JSONObject getTVShows(int page);
}
