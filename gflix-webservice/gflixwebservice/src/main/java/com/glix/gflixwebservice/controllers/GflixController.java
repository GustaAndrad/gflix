package com.glix.gflixwebservice.controllers;

import com.glix.gflixwebservice.dtos.MovieDTO;
import com.glix.gflixwebservice.dtos.MyListDTO;
import com.glix.gflixwebservice.dtos.TVShowsDTO;
import com.glix.gflixwebservice.enums.Tipo;
import com.glix.gflixwebservice.mapper.MovieMapper;
import com.glix.gflixwebservice.mapper.TVShowMapper;
import com.glix.gflixwebservice.models.MyList;
import com.glix.gflixwebservice.services.MyListService;
import com.glix.gflixwebservice.services.TMDBService;
import org.json.JSONObject;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/gflix")
@CrossOrigin(origins = "*")
public class GflixController {

    @Autowired
    MyListService listService;

    @Autowired
    TMDBService tmdbService;

    @GetMapping("/myList")
    public ResponseEntity<Object> getMyList(@RequestParam(required = false) UUID tokenList, @RequestParam(required = false) String userId) {
        try {
            List<Object> favoritos = new ArrayList<>();
            if (tokenList != null) {
                List<MyList> myLists = listService.findAllByTokenListOrUserId(tokenList, userId);
                for (MyList myList : myLists) {
                    Long movieId = myList.getMovieId();
                    Long tvShowId = myList.getTVShowId();
                    if (movieId != null) {
                        JSONObject movieJson = tmdbService.getMovieById(movieId);
                        MovieDTO movieDTO = MovieMapper.jsonToMovieDTO(movieJson, null, true);
                        favoritos.add(movieDTO);
                    } else {
                        JSONObject tvJson = tmdbService.getTvShowById(tvShowId);
                        TVShowsDTO tvShowsDTO = TVShowMapper.jsonToTVShowsDTO(tvJson, null, true);
                        favoritos.add(tvShowsDTO);
                    }

                }
                return ResponseEntity.status(HttpStatus.OK).body(favoritos);
            } else if (userId != null) {
                return ResponseEntity.status(HttpStatus.OK).body(listService.findAllByUserId(userId));
            }

            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Nenhum parametro informado");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Erro ao buscar sua lista");
        }
    }

    @PostMapping("/setItemList")
    public ResponseEntity<Object> setItemList(@RequestBody() MyListDTO myListDTO) {
        try {
            var myListModel = new MyList();
            BeanUtils.copyProperties(myListDTO, myListModel);
            myListModel.setDate(LocalDateTime.now(ZoneId.of("UTC")));

            if (myListDTO.getTipo() == Tipo.MOVIE) {
                myListModel.setTVShowId(null);
            } else {
                myListModel.setMovieId(null);
                myListModel.setTVShowId(myListDTO.getTvShowId());
            }

            Optional<UUID> tokenList = listService.findTokenListByUserId(myListDTO.getUserId());

            if (tokenList.isEmpty()) {
                myListModel.setTokenList(UUID.randomUUID());
            } else {
                myListModel.setTokenList(tokenList.get());
            }

            return ResponseEntity.status(HttpStatus.CREATED).body(listService.save(myListModel));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Erro ao salvar item");
        }
    }

    @DeleteMapping("/deleteItemList")
    public ResponseEntity<Object> deleteItemList(@RequestBody() MyListDTO myList) {
        try {
            UUID tokenList = myList.getTokenList();
            Long movieId = myList.getMovieId();
            Long tvShowId = myList.getTvShowId();
            try {
                listService.deleteItemList(tokenList, movieId, tvShowId);
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
            return ResponseEntity.status(HttpStatus.OK).body("Item removido");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Erro ao deletar item");
        }
    }


}
