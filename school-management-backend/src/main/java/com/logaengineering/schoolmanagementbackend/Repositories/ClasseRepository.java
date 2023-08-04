package com.logaengineering.schoolmanagementbackend.Repositories;

import com.logaengineering.schoolmanagementbackend.Models.Entities.Classe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClasseRepository extends JpaRepository<Classe,Long> {
    List<Classe> findByAnneeScolaireAnnee(String annee);

    Optional<Classe> findClasseByNom(String nom);
}
