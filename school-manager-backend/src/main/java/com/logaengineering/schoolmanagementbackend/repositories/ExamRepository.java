package com.logaengineering.schoolmanagementbackend.repositories;

import com.logaengineering.schoolmanagementbackend.domains.entities.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<Exam,Long> {

    List<Exam> findByExamDate(LocalDate examDate);
    List<Exam> findBySubject(String subject);
    List<Exam> findByTeacherName(String teacherName);

}
