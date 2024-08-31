package com.glix.gflixwebservice.models;

import jakarta.persistence.*;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "TB_MYLIST")
public class MyList implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private UUID tokenList;

    @Column(name = "user_id")
    private String userId;


    @Column(name = "movie_id")
    private Long movieId;

    @Column(name = "tv_show_id")
    private Long tvShowId;

    @Column()
    private LocalDateTime date;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getTokenList() {
        return tokenList;
    }

    public void setTokenList(UUID tokenList) {
        this.tokenList = tokenList;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public Long getTVShowId() {
        return tvShowId;
    }

    public void setTVShowId(Long tvShowId) {
        this.tvShowId = tvShowId;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
}
