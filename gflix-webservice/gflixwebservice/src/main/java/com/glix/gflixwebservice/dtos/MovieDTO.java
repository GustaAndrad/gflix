package com.glix.gflixwebservice.dtos;

import com.glix.gflixwebservice.enums.Tipo;

import java.util.List;

public class MovieDTO {

    private Long id;
    private String titulo;
    private String descricao;
    private String posterPath;
    private String backdropPath;
    private List<String> generos;
    private boolean favorite;
    private Tipo tipo;


    public MovieDTO() {
    }

    public MovieDTO(Long id, String title, String overview, String posterPath, String backdropPath, List<String> genreNames, boolean favorite, Tipo tipo) {
        this.id = id;
        this.titulo = title;
        this.descricao = overview;
        this.posterPath = posterPath;
        this.backdropPath = backdropPath;
        this.generos = genreNames;
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

    public String getPosterPath() {
        return posterPath;
    }

    public void setPosterPath(String posterPath) {
        this.posterPath = posterPath;
    }

    public String getBackdropPath() {
        return backdropPath;
    }

    public void setBackdropPath(String backdropPath) {
        this.backdropPath = backdropPath;
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

    @Override
    public String toString() {
        return "MovieDTO{" +
                "titulo='" + titulo + '\'' +
                ", descricao='" + descricao + '\'' +
                ", posterPath='" + posterPath + '\'' +
                ", backdropPath='" + backdropPath + '\'' +
                ", generos=" + generos +
                '}';
    }
}

