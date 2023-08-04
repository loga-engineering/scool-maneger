package com.logaengineering.schoolmanagementbackend.Models.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "classes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Classe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String niveau;
    private String nomProfTitulaire;

    @OneToMany(mappedBy = "classe", cascade = CascadeType.ALL)
    private List<Eleve> eleves;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "annee_scolaire_id")
    private AnneeScolaire anneeScolaire;

    public void addEleve(Eleve eleve) {
        this.eleves.add(eleve);
        eleve.setClasse(this);
    }
    public void removeEleve(Eleve eleve) {
        this.eleves.remove(eleve);
        eleve.setClasse(null);
    }
}
