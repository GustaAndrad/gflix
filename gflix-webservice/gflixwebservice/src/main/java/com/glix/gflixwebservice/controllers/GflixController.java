package com.glix.gflixwebservice.controllers;

import com.glix.gflixwebservice.dtos.MyListDTO;
import com.glix.gflixwebservice.models.MyList;
import com.glix.gflixwebservice.services.MyListService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.UUID;

@RestController
@RequestMapping("/gflix")
@CrossOrigin(origins = "*")
public class GflixController {

    @Autowired
    MyListService listService;

    @GetMapping("/myList")
    public ResponseEntity<Object> getMyList(@RequestParam(required = false) UUID tokenList, @RequestParam(required = false) String userId) {
        try {
            if (tokenList != null) {
                return ResponseEntity.status(HttpStatus.OK).body(listService.findByTokenList(tokenList));
            } else if (userId != null) {
                return ResponseEntity.status(HttpStatus.OK).body(listService.findByUserId(userId));
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
            myListModel.setTVShowId(myListDTO.getTvShowId());
            myListModel.setDate(LocalDateTime.now(ZoneId.of("UTC")));

            if (myListModel.getTokenList() == null) {
                myListModel.setTokenList(UUID.randomUUID());
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
