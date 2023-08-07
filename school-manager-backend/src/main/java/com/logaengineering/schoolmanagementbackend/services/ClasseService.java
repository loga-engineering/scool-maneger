package com.logaengineering.schoolmanagementbackend.services;

import com.logaengineering.schoolmanagementbackend.domains.dto.EleveDTO;
import com.logaengineering.schoolmanagementbackend.domains.entities.Classe;
import com.logaengineering.schoolmanagementbackend.domains.entities.Eleve;
import com.logaengineering.schoolmanagementbackend.repositories.ClasseRepository;
import com.logaengineering.schoolmanagementbackend.repositories.EleveRepository;
import javax.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ClasseService {
    private final ClasseRepository classeRepository;

    private final EleveRepository eleveRepository;

    public ClasseService(ClasseRepository classeRepository, EleveRepository eleveRepository) {
        this.classeRepository = classeRepository;
        this.eleveRepository = eleveRepository;
    }

    public Classe createClasse(Classe classe) {
        return classeRepository.save(classe);
    }

    public List<Classe> getAllClasses() {
        return classeRepository.findAll();
    }

    public Classe getClasseById(Long id) {
        return classeRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Classe avec id="+id+" introuvable !"));
    }

    public Classe getClasseByNom(String nom) {
        return classeRepository.findClasseByNom(nom).orElseThrow(() -> new EntityNotFoundException("Classe avec nom="+nom+" introuvable !"));
    }

    public Classe updateClasse(Long id, Classe classe) {
        Classe classeToUpdate = classeRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Classe avec id="+id+" introuvable !"));
        classeToUpdate.setNom(classe.getNom());
        classeToUpdate.setNiveau(classe.getNiveau());
        classeToUpdate.setNomProfTitulaire(classe.getNomProfTitulaire());
        classeToUpdate.setEleves(classe.getEleves());
        classeToUpdate.setAnneeScolaire(classe.getAnneeScolaire());

        return classeRepository.save(classeToUpdate);
    }

    public boolean deleteClasse(Long id) {
        try{
            classeRepository.deleteById(id);
            return true;
        }catch (Exception e){
            System.out.println("Erreur lors de la suppression de la classe : "+e.getMessage());
            return false;
        }
    }


    public List<EleveDTO> getElevesByClasseId(Long classeId) {
        Classe classe = classeRepository.findById(classeId).orElseThrow(() -> new EntityNotFoundException("Classe avec id="+classeId+" introuvable"));
        List<Eleve> eleves = eleveRepository.findByClasseId(classe.getId());
        List<EleveDTO> listEleveDTO = new ArrayList<>();
        for (Eleve eleve : eleves) {
            listEleveDTO.add(EleveDTO.toDTO(eleve));
        }

        return listEleveDTO;
    }

    public List<Classe> getClasseByAnneeScolaire(String annee) {
        return classeRepository.findByAnneeScolaireAnnee(annee);
    }
}
