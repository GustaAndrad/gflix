package com.glix.gflixwebservice.dtos;

import com.glix.gflixwebservice.enums.Tipo;

import java.util.UUID;

public class MyListDTO {

    private UUID tokenList;

    private Long movieId;

    private Long tvShowId;

    private String userId;

    private Tipo tipo;

    public MyListDTO() {
    }

    public UUID getTokenList() {
        return tokenList;
    }

    public void setTokenList(UUID tokenList) {
        this.tokenList = tokenList;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public Long getTvShowId() {
        return tvShowId;
    }

    public void setTvShowId(Long tvShowId) {
        this.tvShowId = tvShowId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Tipo getTipo() {
        return tipo;
    }

    public void setTipo(Tipo tipo) {
        this.tipo = tipo;
    }
}
