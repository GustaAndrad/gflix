package com.glix.gflixwebservice.services.impl;

import com.glix.gflixwebservice.models.MyList;
import com.glix.gflixwebservice.repositories.MyListRepository;
import com.glix.gflixwebservice.services.MyListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
public class MyListServiceImpl implements MyListService {


    @Autowired
    MyListRepository myListRepository;

    @Transactional
    @Override
    public void delete(MyList myList) {
        myListRepository.delete(myList);
    }

    @Override
    public MyList save(MyList myList) {
        return myListRepository.save(myList);
    }

    @Override
    public Optional<MyList> findByUserId(String userId) {
        return myListRepository.findByUserId(userId);
    }

    @Override
    public Optional<MyList> findByTokenList(UUID tokenList) {
        return myListRepository.findByTokenList(tokenList);
    }

    @Transactional
    @Override
    public void deleteItemList(UUID tokenList, Long movieId, Long tvShowId) {
        myListRepository.deleteByTokenListAndMovieIdOrTvShowId(tokenList, movieId, tvShowId);
    }

    @Override
    public boolean existsFavoriteByUserIdAndMovieId(String userId, long movieId) {
        return myListRepository.existsFavoriteByUserIdAndMovieId(userId, movieId);
    }

    @Override
    public boolean existsFavoriteByUserIdAndTvId(String userId, long tvShowId) {
        return myListRepository.existsFavoriteByUserIdAndTvShowId(userId, tvShowId);
    }
}
