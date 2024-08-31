package com.glix.gflixwebservice.specification;

import com.glix.gflixwebservice.models.MyList;
import org.springframework.data.jpa.domain.Specification;

public class SpecificationTemplate {
    
    public interface MyListSpec extends Specification<MyList>{}
}
