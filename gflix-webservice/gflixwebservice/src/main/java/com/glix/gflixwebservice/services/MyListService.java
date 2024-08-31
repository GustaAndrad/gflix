package com.glix.gflixwebservice.services;

import com.glix.gflixwebservice.models.MyList;

import java.util.Optional;
import java.util.UUID;

public interface MyListService {

    void delete(MyList myList);

    MyList save(MyList myList);

    Optional<MyList> findByUserId(String userId);

    Optional<MyList> findByTokenList(UUID tokenList);

    void deleteItemList(UUID tokenList, Long movieId, Long tvShowId);

    boolean existsFavoriteByUserIdAndMovieId(String userId, long movieId);

    boolean existsFavoriteByUserIdAndTvId(String userId, long tvShowId);
}
