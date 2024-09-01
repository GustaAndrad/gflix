package com.glix.gflixwebservice.services;

import com.glix.gflixwebservice.models.MyList;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MyListService {

    void delete(MyList myList);

    MyList save(MyList myList);

    List<MyList> findAllByUserId(String userId);

    List<MyList> findAllByTokenListOrUserId(UUID tokenList, String userId);

    void deleteItemList(UUID tokenList, Long movieId, Long tvShowId);

    boolean existsFavoriteByUserIdAndMovieId(String userId, long movieId);

    boolean existsFavoriteByUserIdAndTvId(String userId, long tvShowId);

    Optional<UUID> findTokenListByUserId(String userId);
}
