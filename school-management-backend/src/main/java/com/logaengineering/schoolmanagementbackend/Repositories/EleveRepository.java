package com.logaengineering.schoolmanagementbackend.Repositories;

import com.logaengineering.schoolmanagementbackend.Models.Entities.Eleve;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EleveRepository extends JpaRepository<Eleve,Long> {
    List<Eleve> findByClasseId(Long classeId);
    Optional<Eleve> findByMatricule(String matricule);
}
