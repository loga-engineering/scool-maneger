package com.logaengineering.schoolmanagementbackend.Controllers;

import com.logaengineering.schoolmanagementbackend.Models.DTO.EleveDTO;
import com.logaengineering.schoolmanagementbackend.Models.Entities.Classe;
import com.logaengineering.schoolmanagementbackend.Services.ClasseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/school-management")
public class ClasseController {
    @Autowired
    private ClasseService classeService;

    @PostMapping("/classes")
    public ResponseEntity<Classe> createClasse(@RequestBody Classe classe) {
        Classe newClasse = classeService.createClasse(classe);
        return ResponseEntity.status(HttpStatus.CREATED).body(newClasse);
    }

    @PutMapping("/classes/{id}")
    public ResponseEntity<Classe> updateClasse(@PathVariable Long id, @RequestBody Classe classe) {
        Classe updatedClasse = classeService.updateClasse(id, classe);
        return ResponseEntity.ok(updatedClasse);
    }

    @DeleteMapping("/classes/{id}")
    public ResponseEntity<Void> deleteClasse(@PathVariable Long id) {
        boolean isDeleted = classeService.deleteClasse(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/classes")
    public ResponseEntity<List<Classe>> getAllClasses() {
        List<Classe> classes = classeService.getAllClasses();
        return ResponseEntity.ok(classes);
    }

    @GetMapping("/classes/{id}")
    public ResponseEntity<Classe> getClasseById(@PathVariable Long id) {
        Classe classe = classeService.getClasseById(id);
        return ResponseEntity.ok(classe);
    }

    @GetMapping("/classes/nom/{nom}")
    public ResponseEntity<Classe> getClasseByNom(@PathVariable String nom) {
        Classe classe = classeService.getClasseByNom(nom);
        return ResponseEntity.ok(classe);
    }

    @GetMapping("/classes/{classeId}/eleves")
    public ResponseEntity<List<EleveDTO>> getElevesByClasseId(@PathVariable Long classeId) {
        List<EleveDTO> eleves = classeService.getElevesByClasseId(classeId);
        return ResponseEntity.ok(eleves);
    }

    @GetMapping("/classes/annee-scolaire/{annee}")
    public ResponseEntity<List<Classe>> getClasseByAnneeScolaire(@PathVariable String annee) {
        List<Classe> classes = classeService.getClasseByAnneeScolaire(annee);
        return ResponseEntity.ok(classes);
    }
}
