package com.glix.gflixwebservice.dtos;

import java.util.List;

public class TVShowsDTO {

    private Long id;
    private String titulo;
    private String descricao;
    private String backdropPath;
    private String posterPath;
    private List<String> generos;

    public TVShowsDTO() {
    }

    public TVShowsDTO(Long id, String titulo, String descricao, String backdropPath, String posterPath, List<String> generos) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.backdropPath = backdropPath;
        this.posterPath = posterPath;
        this.generos = generos;
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

    @Override
    public String toString() {
        return "TVShowsDTO{" + "id=" + id + ", titulo='" + titulo + '\'' + ", descricao='" + descricao + '\'' + ", backdropPath='" + backdropPath + '\'' + ", posterPath='" + posterPath + '\'' + ", generos=" + generos + '}';
    }
}
