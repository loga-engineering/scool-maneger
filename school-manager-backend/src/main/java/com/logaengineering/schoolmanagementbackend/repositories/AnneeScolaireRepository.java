package com.logaengineering.schoolmanagementbackend.repositories;

import com.logaengineering.schoolmanagementbackend.domains.entities.AnneeScolaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnneeScolaireRepository extends JpaRepository<AnneeScolaire,Long> {
    List<AnneeScolaire> findByAnnee(String annee);

}
