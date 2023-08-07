package com.logaengineering.schoolmanagementbackend.controllers;

import com.logaengineering.schoolmanagementbackend.domains.entities.AnneeScolaire;
import com.logaengineering.schoolmanagementbackend.services.AnneeScolaireService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(value = "http://localhost:3000/*")
@RequestMapping("annees-scolaires")
public class AnneeScolaireController {

    private final AnneeScolaireService anneeScolaireService;

    public AnneeScolaireController(AnneeScolaireService anneeScolaireService) {
        this.anneeScolaireService = anneeScolaireService;
    }

    @PostMapping()
    public ResponseEntity<AnneeScolaire> createAnneeScolaire(@RequestBody AnneeScolaire anneeScolaire) {
        AnneeScolaire newAnneeScolaire = anneeScolaireService.createAnneeScolaire(anneeScolaire);
        return ResponseEntity.status(HttpStatus.CREATED).body(newAnneeScolaire);
    }

    @PutMapping("{id}")
    public ResponseEntity<AnneeScolaire> updateAnneeScolaire(@PathVariable Long id, @RequestBody AnneeScolaire anneeScolaire) {
        AnneeScolaire updatedAnneeScolaire = anneeScolaireService.updateAnneeScolaire(id, anneeScolaire);
        return ResponseEntity.ok(updatedAnneeScolaire);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteAnneeScolaire(@PathVariable Long id) {
        boolean isDeleted = anneeScolaireService.deleteAnneeScolaire(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping()
    public ResponseEntity<List<AnneeScolaire>> getAllAnneesScolaires() {
        List<AnneeScolaire> anneesScolaires = anneeScolaireService.getAllAnneesScolaires();
        return ResponseEntity.ok(anneesScolaires);
    }

    @GetMapping("{id}")
    public ResponseEntity<AnneeScolaire> getAnneeScolaireById(@PathVariable Long id) {
        AnneeScolaire anneeScolaire = anneeScolaireService.getAnneeScolaireById(id);
        return ResponseEntity.ok(anneeScolaire);
    }

    @GetMapping("annee/{annee}")
    public ResponseEntity<List<AnneeScolaire>> getAnneesScolairesByAnnee(@PathVariable String annee) {
        List<AnneeScolaire> anneesScolaires = anneeScolaireService.getAnneesScolairesByAnnee(annee);
        return ResponseEntity.ok(anneesScolaires);
    }

}
