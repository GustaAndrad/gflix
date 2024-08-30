package com.glix.gflixwebservice.models;

import jakarta.persistence.*;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "TB_MYLIST")
public class MyList  implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    private UUID listId;

    @Column(nullable = false)
    private UUID tokenList;

    @Column()
    private Integer movieId;

    @Column()
    private Integer TVShowsId;

    @Column()
    private Date date;

}
