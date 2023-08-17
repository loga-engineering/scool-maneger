package com.logaengineering.schoolmanagementbackend.repositories;

import com.logaengineering.schoolmanagementbackend.domains.entities.Classroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassroomRepository extends JpaRepository<Classroom,Long> {
    List<Classroom> findBySchoolYearYear(String annee);
    List<Classroom> findByNameContaining(String nom);
}
