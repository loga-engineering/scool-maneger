package com.logaengineering.schoolmanagementbackend.Models.DTO;

import com.logaengineering.schoolmanagementbackend.Models.Entities.Classe;
import com.logaengineering.schoolmanagementbackend.Models.Entities.Eleve;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class EleveDTO {

    private Long id;
    private String matricule;
    private String nom;
    private String prenom;
    private String prenomPere;
    private String nomMere;
    private String contact;
    private String adresse;
    private LocalDate dateNaissance;
    private LocalDate dateInscription;
    private Long classeId;

    public Eleve toEntity() {
        Eleve eleve = new Eleve();
        eleve.setId(this.getId());
        eleve.setMatricule(this.getMatricule());
        eleve.setNom(this.getNom());
        eleve.setPrenom(this.getPrenom());
        eleve.setPrenomPere(this.getPrenomPere());
        eleve.setNomMere(this.getNomMere());
        eleve.setContact(this.getContact());
        eleve.setAdresse(this.getAdresse());
        eleve.setDateNaissance(this.getDateNaissance());
        eleve.setDateInscription(this.getDateInscription());

        Classe classe = new Classe();
        classe.setId(this.getClasseId());
        eleve.setClasse(classe);

        return eleve;
    }

    public static EleveDTO toDTO(Eleve eleve) {
        return EleveDTO.builder()
                .id(eleve.getId())
                .matricule(eleve.getMatricule())
                .nom(eleve.getNom())
                .prenom(eleve.getPrenom())
                .prenomPere(eleve.getPrenomPere())
                .nomMere(eleve.getNomMere())
                .contact(eleve.getContact())
                .adresse(eleve.getAdresse())
                .dateNaissance(eleve.getDateNaissance())
                .dateInscription(eleve.getDateInscription())
                .classeId(eleve.getClasse().getId())
                .build();
    }



}
