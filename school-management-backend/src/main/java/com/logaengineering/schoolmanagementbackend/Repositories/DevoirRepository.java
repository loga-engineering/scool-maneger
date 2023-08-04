package com.logaengineering.schoolmanagementbackend.Repositories;

import com.logaengineering.schoolmanagementbackend.Models.Entities.Devoir;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DevoirRepository extends JpaRepository<Devoir,Long> {

    List<Devoir> findByDateDevoir(LocalDate date);
    List<Devoir> findByMatiere(String matiere);
    List<Devoir> findByNomProf(String nomProf);

}
