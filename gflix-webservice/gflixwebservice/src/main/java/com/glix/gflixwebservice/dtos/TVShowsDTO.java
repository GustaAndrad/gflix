package com.glix.gflixwebservice.dtos;

import com.glix.gflixwebservice.enums.Tipo;

import java.util.List;
import java.util.UUID;

public class TVShowsDTO {

    private Long id;
    private String titulo;
    private String descricao;
    private String backdropPath;
    private String posterPath;
    private List<String> generos;

    private boolean favorite;
    Tipo tipo;

    private UUID tokenList;

    public TVShowsDTO() {
    }

    public TVShowsDTO(Long id, String titulo, String descricao, String backdropPath, String posterPath, List<String> generos, boolean favorite, Tipo tipo) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.backdropPath = backdropPath;
        this.posterPath = posterPath;
        this.generos = generos;
        this.favorite = favorite;
        this.tipo = tipo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getBackdropPath() {
        return backdropPath;
    }

    public void setBackdropPath(String backdropPath) {
        this.backdropPath = backdropPath;
    }

    public String getPosterPath() {
        return posterPath;
    }

    public void setPosterPath(String posterPath) {
        this.posterPath = posterPath;
    }

    public List<String> getGeneros() {
        return generos;
    }

    public void setGeneros(List<String> generos) {
        this.generos = generos;
    }

    public boolean isFavorite() {
        return favorite;
    }

    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
    }

    public Tipo getTipo() {
        return tipo;
    }

    public void setTipo(Tipo tipo) {
        this.tipo = tipo;
    }

    public UUID getTokenList() {
        return tokenList;
    }

    public void setTokenList(UUID tokenList) {
        this.tokenList = tokenList;
    }

    @Override
    public String toString() {
        return "TVShowsDTO{" + "id=" + id + ", titulo='" + titulo + '\'' + ", descricao='" + descricao + '\'' + ", backdropPath='" + backdropPath + '\'' + ", posterPath='" + posterPath + '\'' + ", generos=" + generos + '}';
    }
}
