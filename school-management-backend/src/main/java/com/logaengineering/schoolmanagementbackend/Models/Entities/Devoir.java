package com.logaengineering.schoolmanagementbackend.Models.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "devoir")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Devoir {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate dateDevoir;
    private String matiere;
    private String nomProf;

}
