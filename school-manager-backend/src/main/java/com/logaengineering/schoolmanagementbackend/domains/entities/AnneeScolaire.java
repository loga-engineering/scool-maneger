package com.logaengineering.schoolmanagementbackend.domains.entities;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Entity
@Table(name = "annees_scolaires")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnneeScolaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String annee;
    @Column(name="date_debut")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate dateDebut;
    @Column(name="date_fin")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate dateFin;

    public AnneeScolaire(String annee, LocalDate dateDebut, LocalDate dateFin) {
        this.annee = annee;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
    }
}
