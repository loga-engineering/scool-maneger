package com.logaengineering.schoolmanagementbackend.services;

import com.logaengineering.schoolmanagementbackend.domains.dto.EleveDTO;
import com.logaengineering.schoolmanagementbackend.domains.entities.Classe;
import com.logaengineering.schoolmanagementbackend.domains.entities.Eleve;
import com.logaengineering.schoolmanagementbackend.repositories.EleveRepository;

import javax.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class EleveService {

    private final EleveRepository eleveRepository;

    public EleveService(EleveRepository eleveRepository) {
        this.eleveRepository = eleveRepository;
    }

    public EleveDTO createEleve(EleveDTO eleveDTO) {
        Eleve eleve = eleveDTO.toEntity();
        eleveRepository.save(eleve);
        return EleveDTO.toDTO(eleveRepository.save(eleve));
    }

    public List<EleveDTO> getAllEleves() {
        List<Eleve> eleves = eleveRepository.findAll();
        List<EleveDTO> eleveDTOs = new ArrayList<>();
        for (Eleve eleve : eleves) {
            eleveDTOs.add(EleveDTO.toDTO(eleve));
        }
        return eleveDTOs;
    }

    public EleveDTO getEleveById(Long id) {
        Eleve eleve = eleveRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Eleve introuvable !"));
        return EleveDTO.toDTO(eleve);
    }

    public EleveDTO getEleveByMatricule(String matricule) {
        Eleve eleve = eleveRepository.findByMatricule(matricule).orElseThrow(() -> new EntityNotFoundException("Eleve introuvable !"));
        return EleveDTO.toDTO(eleve);
    }

    public EleveDTO updateEleve(Long id, EleveDTO eleveDTO) {
        Eleve eleve = eleveRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Eleve introuvable !"));
        eleve.setMatricule(eleveDTO.getMatricule());
        eleve.setNom(eleveDTO.getNom());
        eleve.setPrenom(eleveDTO.getPrenom());
        eleve.setPrenomPere(eleveDTO.getPrenomPere());
        eleve.setNomMere(eleveDTO.getNomMere());
        eleve.setContact(eleveDTO.getContact());
        eleve.setAdresse(eleveDTO.getAdresse());
        eleve.setDateNaissance(eleveDTO.getDateNaissance());
        eleve.setDateInscription(eleveDTO.getDateInscription());

        Classe classe = new Classe();
        classe.setId(eleveDTO.getClasseId());
        eleve.setClasse(classe);

        eleveRepository.save(eleve);
        return EleveDTO.toDTO(eleve);
    }

    public boolean deleteEleve(Long id) {
        try{
            eleveRepository.deleteById(id);
            return true;
        }catch (Exception e){
            System.out.println("Erreur lors de la suppression de l'eleve : "+e.getMessage());
            return false;
        }

    }
}
