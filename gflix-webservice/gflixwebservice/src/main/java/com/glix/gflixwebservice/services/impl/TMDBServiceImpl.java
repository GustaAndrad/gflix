package com.glix.gflixwebservice.services.impl;

import com.glix.gflixwebservice.dtos.GenreDTO;
import com.glix.gflixwebservice.mapper.GenreMapper;
import com.glix.gflixwebservice.services.TMDBService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class TMDBServiceImpl implements TMDBService {

    private final RestTemplate restTemplate;

    @Value("${tmdb.api.key}")
    private String apiKey;

    @Value("${tmdb.api.url}")
    private String apiUrl;

    public TMDBServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "application/json");
        headers.set("Authorization", "Bearer " + apiKey);
        return headers;
    }

    @Override
    public JSONObject getMovies(int page) {
        String url = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .path("/discover/movie")
                .queryParam("include_adult", "false")
                .queryParam("include_video", "false")
                .queryParam("language", "pt-BR")
                .queryParam("page", page)
                .queryParam("sort_by", "popularity.desc")
                .toUriString();

        HttpEntity<String> entity = new HttpEntity<>(createHeaders());
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        return new JSONObject(response.getBody());
    }

    @Override
    public JSONObject getTVShows(int page) {
        String url = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .path("/discover/tv")
                .queryParam("include_adult", "false")
                .queryParam("language", "pt-BR")
                .queryParam("page", page)
                .queryParam("sort_by", "popularity.desc")
                .toUriString();

        HttpEntity<String> entity = new HttpEntity<>(createHeaders());
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        return new JSONObject(response.getBody());
    }

    @Override
    public List<GenreDTO> getGenres() throws IOException {
        String url = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .path("/genre/movie/list")
                .queryParam("language", "pt-BR")
                .toUriString();

        HttpEntity<String> entity = new HttpEntity<>(createHeaders());
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        List<GenreDTO> genreDTOList = new ArrayList<>();
        JSONArray res = new JSONObject(response.getBody()).optJSONArray("genres");
        for (int i = 0; i < res.length(); i++) {
            GenreDTO genre = GenreMapper.jsonToGenreDTO(res.optJSONObject(i));
            genreDTOList.add(genre);
        }
        return genreDTOList;
    }
}
