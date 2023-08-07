package com.logaengineering.schoolmanagementbackend.services;

import com.logaengineering.schoolmanagementbackend.domains.entities.AnneeScolaire;
import com.logaengineering.schoolmanagementbackend.repositories.AnneeScolaireRepository;
import javax.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AnneeScolaireService {
    private final AnneeScolaireRepository anneeScolaireRepository;

    public AnneeScolaireService(AnneeScolaireRepository anneeScolaireRepository) {
        this.anneeScolaireRepository = anneeScolaireRepository;
    }

    public AnneeScolaire createAnneeScolaire(AnneeScolaire anneeScolaire) {
        return anneeScolaireRepository.save(anneeScolaire);
    }

    public List<AnneeScolaire> getAllAnneesScolaires() {
        return anneeScolaireRepository.findAll();
    }

    public AnneeScolaire getAnneeScolaireById(Long id) {
        return anneeScolaireRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Annee scolaire introuvable !"));
    }

    public AnneeScolaire updateAnneeScolaire(Long id, AnneeScolaire anneeScolaire) {
        AnneeScolaire anneeScolaireToUpdate = anneeScolaireRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Annee scolaire introuvable !"));
        anneeScolaireToUpdate.setAnnee(anneeScolaire.getAnnee());
        anneeScolaireToUpdate.setDateDebut(anneeScolaire.getDateDebut());
        anneeScolaireToUpdate.setDateFin(anneeScolaire.getDateFin());
        return anneeScolaireRepository.save(anneeScolaireToUpdate);
    }

    public boolean deleteAnneeScolaire(Long id) {
        try {
            anneeScolaireRepository.deleteById(id);
            return true;
        }catch (Exception e){
            System.out.println("Erreur lors de la suppression de l'annee scolaire : "+e.getMessage());
            return false;
        }
    }

    public List<AnneeScolaire> getAnneesScolairesByAnnee(String annee) {
        return anneeScolaireRepository.findByAnnee(annee);
    }

}
