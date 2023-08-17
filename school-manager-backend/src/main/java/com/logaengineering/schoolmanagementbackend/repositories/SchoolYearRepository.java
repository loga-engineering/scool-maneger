package com.logaengineering.schoolmanagementbackend.repositories;

import com.logaengineering.schoolmanagementbackend.domains.entities.SchoolYear;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SchoolYearRepository extends JpaRepository<SchoolYear,Long> {
    List<SchoolYear> findByYear(String year);


    @Query("SELECT sy FROM SchoolYear sy WHERE sy.id LIKE CONCAT('%',:query,'%') OR sy.year LIKE CONCAT('%',:query,'%') ")
    Page<SchoolYear> search(@Param("query") String query, Pageable pageable);

    Page<SchoolYear> findAll(Specification<SchoolYear> schoolYearSpecification, Pageable pageable);

}
