package com.logaengineering.schoolmanagementbackend.services;

import com.logaengineering.schoolmanagementbackend.domains.entities.Devoir;
import com.logaengineering.schoolmanagementbackend.repositories.DevoirRepository;
import javax.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class DevoirService {
    private final DevoirRepository devoirRepository;

    public DevoirService(DevoirRepository devoirRepository) {
        this.devoirRepository = devoirRepository;
    }

    public Devoir createDevoir(Devoir devoir) {
        return devoirRepository.save(devoir);
    }

    public List<Devoir> getAllDevoirs() {
        return devoirRepository.findAll();
    }

    public Devoir getDevoirById(Long id) {
        return devoirRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Devoir introuvable !"));
    }

    public Devoir updateDevoir(Long id, Devoir devoir) {
        Devoir devoirToUpdate = devoirRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Devoir introuvable !"));
        devoirToUpdate.setDateDevoir(devoir.getDateDevoir());
        devoirToUpdate.setMatiere(devoir.getMatiere());
        devoirToUpdate.setNomProf(devoir.getNomProf());
        return devoirRepository.save(devoirToUpdate);
    }

    public boolean deleteDevoir(Long id) {

        try{
            devoirRepository.deleteById(id);
            return true;
        }catch (Exception e){
            System.out.println("Erreur lors de la suppression du devoir : "+e.getMessage());
            return false;
        }
    }

    public List<Devoir> getDevoirsByDate(LocalDate date) {
        return devoirRepository.findByDateDevoir(date);
    }

    public List<Devoir> getDevoirsByMatiere(String matiere) {
        return devoirRepository.findByMatiere(matiere);
    }

    public List<Devoir> getDevoirsByNomProf(String nomProf) {
        return devoirRepository.findByNomProf(nomProf);
    }
}
