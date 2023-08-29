package com.logaengineering.schoolmanagementbackend.repositories;

import com.logaengineering.schoolmanagementbackend.domains.entities.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GradeRepository extends JpaRepository<Grade,Long> {

    List<Grade> findByStudentId(Long studentId);
    List<Grade> findByExamId(Long examId);
    List<Grade> findByValueBetween(Double min, Double max);
    List<Grade> findByOrderByValueAsc();
    List<Grade> findByOrderByValueDesc();

}
