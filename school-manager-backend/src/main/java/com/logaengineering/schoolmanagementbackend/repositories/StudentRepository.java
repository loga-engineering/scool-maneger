package com.logaengineering.schoolmanagementbackend.repositories;

import com.logaengineering.schoolmanagementbackend.domains.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student,Long> {
    List<Student> findByClassroomId(Long id);
    List<Student> findByRegistrationNumberContaining(String registrationNumber);

    @Query("SELECT COUNT(s) FROM Student s WHERE s.classroom.id = :classroomId")
    int countStudentByClassroomId(@Param("classroomId") Long classroomId);

}
