package com.logaengineering.schoolmanagementbackend.domains.entities;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "notes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double valeur;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "eleve_id", nullable = false)
    private Eleve eleve;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "devoir_id", nullable = false)
    private Devoir devoir;

}
