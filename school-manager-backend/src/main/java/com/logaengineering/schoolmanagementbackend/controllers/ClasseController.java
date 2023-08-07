package com.logaengineering.schoolmanagementbackend.controllers;

import com.logaengineering.schoolmanagementbackend.domains.dto.EleveDTO;
import com.logaengineering.schoolmanagementbackend.domains.entities.Classe;
import com.logaengineering.schoolmanagementbackend.services.ClasseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(value = "http://localhost:3000")
@RestController
@RequestMapping("classes")
public class ClasseController {
    private final ClasseService classeService;

    public ClasseController(ClasseService classeService) {
        this.classeService = classeService;
    }

    @PostMapping()
    public ResponseEntity<Classe> createClasse(@RequestBody Classe classe) {
        Classe newClasse = classeService.createClasse(classe);
        return ResponseEntity.status(HttpStatus.CREATED).body(newClasse);
    }

    @PutMapping("{id}")
    public ResponseEntity<Classe> updateClasse(@PathVariable Long id, @RequestBody Classe classe) {
        Classe updatedClasse = classeService.updateClasse(id, classe);
        return ResponseEntity.ok(updatedClasse);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteClasse(@PathVariable Long id) {
        boolean isDeleted = classeService.deleteClasse(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping()
    public ResponseEntity<List<Classe>> getAllClasses() {
        List<Classe> classes = classeService.getAllClasses();
        return ResponseEntity.ok(classes);
    }

    @GetMapping("{id}")
    public ResponseEntity<Classe> getClasseById(@PathVariable Long id) {
        Classe classe = classeService.getClasseById(id);
        return ResponseEntity.ok(classe);
    }

    @GetMapping("nom/{nom}")
    public ResponseEntity<Classe> getClasseByNom(@PathVariable String nom) {
        Classe classe = classeService.getClasseByNom(nom);
        return ResponseEntity.ok(classe);
    }

    @GetMapping("{classeId}/eleves")
    public ResponseEntity<List<EleveDTO>> getElevesByClasseId(@PathVariable Long classeId) {
        List<EleveDTO> eleves = classeService.getElevesByClasseId(classeId);
        return ResponseEntity.ok(eleves);
    }

    @GetMapping("annee-scolaire/{annee}")
    public ResponseEntity<List<Classe>> getClasseByAnneeScolaire(@PathVariable String annee) {
        List<Classe> classes = classeService.getClasseByAnneeScolaire(annee);
        return ResponseEntity.ok(classes);
    }
}
