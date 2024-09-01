package com.glix.gflixwebservice.repositories;

import com.glix.gflixwebservice.models.MyList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MyListRepository extends JpaRepository<MyList, UUID>, JpaSpecificationExecutor<MyList> {
    List<MyList> findAllByUserId(String userId);

    List<MyList> findAllByTokenListOrUserId(UUID tokenList, String userId);

    @Modifying
    @Query(value = "DELETE FROM tb_mylist WHERE token_list= :tokenList and movie_id= :movieId or tv_show_id= :tvShowId", nativeQuery = true)
    void deleteByTokenListAndMovieIdOrTvShowId(@Param("tokenList") UUID tokenList,
                                               @Param("movieId") Long movieId,
                                               @Param("tvShowId") Long tvShowId);

    @Query(value = "SELECT CASE WHEN count(tml) > 0 THEN true ELSE false END " +
            "FROM tb_myList tml  " +
            "WHERE tml.user_id= :userId and tml.movie_id= :movieId", nativeQuery = true)
    boolean existsFavoriteByUserIdAndMovieId(@Param("userId") String userId, @Param("movieId") long movieId);

    @Query(value = "SELECT CASE WHEN count(tml) > 0 THEN true ELSE false END " +
            "FROM tb_myList tml  " +
            "WHERE tml.user_id= :userId and tml.tv_show_id= :tvShowId", nativeQuery = true)
    boolean existsFavoriteByUserIdAndTvShowId(@Param("userId") String userId, @Param("tvShowId") long tvShowId);

    @Query(value = "SELECT token_list FROM tb_myList WHERE user_id= :userId LIMIT 1", nativeQuery = true)
    Optional<UUID> findTokenListByUserId(@Param("userId") String userId);
}
