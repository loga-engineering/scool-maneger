package com.logaengineering.schoolmanagementbackend.Controllers;

import com.logaengineering.schoolmanagementbackend.Models.Entities.AnneeScolaire;
import com.logaengineering.schoolmanagementbackend.Services.AnneeScolaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/school-management")
public class AnneeScolaireController {

    @Autowired
    private AnneeScolaireService anneeScolaireService;

    @PostMapping("/annees-scolaires")
    public ResponseEntity<AnneeScolaire> createAnneeScolaire(@RequestBody AnneeScolaire anneeScolaire) {
        AnneeScolaire newAnneeScolaire = anneeScolaireService.createAnneeScolaire(anneeScolaire);
        return ResponseEntity.status(HttpStatus.CREATED).body(newAnneeScolaire);
    }

    @PutMapping("/annees-scolaires/{id}")
    public ResponseEntity<AnneeScolaire> updateAnneeScolaire(@PathVariable Long id, @RequestBody AnneeScolaire anneeScolaire) {
        AnneeScolaire updatedAnneeScolaire = anneeScolaireService.updateAnneeScolaire(id, anneeScolaire);
        return ResponseEntity.ok(updatedAnneeScolaire);
    }

    @DeleteMapping("/annees-scolaires/{id}")
    public ResponseEntity<Void> deleteAnneeScolaire(@PathVariable Long id) {
        boolean isDeleted = anneeScolaireService.deleteAnneeScolaire(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/annees-scolaires")
    public ResponseEntity<List<AnneeScolaire>> getAllAnneesScolaires() {
        List<AnneeScolaire> anneesScolaires = anneeScolaireService.getAllAnneesScolaires();
        return ResponseEntity.ok(anneesScolaires);
    }

    @GetMapping("/annees-scolaires/{id}")
    public ResponseEntity<AnneeScolaire> getAnneeScolaireById(@PathVariable Long id) {
        AnneeScolaire anneeScolaire = anneeScolaireService.getAnneeScolaireById(id);
        return ResponseEntity.ok(anneeScolaire);
    }

    @GetMapping("/annees-scolaires/annee/{annee}")
    public ResponseEntity<List<AnneeScolaire>> getAnneesScolairesByAnnee(@PathVariable String annee) {
        List<AnneeScolaire> anneesScolaires = anneeScolaireService.getAnneesScolairesByAnnee(annee);
        return ResponseEntity.ok(anneesScolaires);
    }

}
