package com.logaengineering.schoolmanagementbackend.Repositories;

import com.logaengineering.schoolmanagementbackend.Models.Entities.AnneeScolaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AnneeScolaireRepository extends JpaRepository<AnneeScolaire,Long> {
    List<AnneeScolaire> findByAnnee(String annee);

}
