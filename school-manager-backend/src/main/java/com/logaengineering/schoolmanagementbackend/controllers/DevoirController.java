package com.logaengineering.schoolmanagementbackend.controllers;

import com.logaengineering.schoolmanagementbackend.domains.entities.Devoir;
import com.logaengineering.schoolmanagementbackend.services.DevoirService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
@CrossOrigin(value = "http://localhost:3000")
@RestController
@RequestMapping("devoirs")
public class DevoirController {

    private final DevoirService devoirService;

    public DevoirController(DevoirService devoirService) {
        this.devoirService = devoirService;
    }

    @PostMapping()
    public ResponseEntity<Devoir> createDevoir(@RequestBody Devoir devoir) {
        Devoir newDevoir = devoirService.createDevoir(devoir);
        return ResponseEntity.status(HttpStatus.CREATED).body(newDevoir);
    }

    @PutMapping("{id}")
    public ResponseEntity<Devoir> updateDevoir(@PathVariable Long id, @RequestBody Devoir devoir) {
        Devoir updatedDevoir = devoirService.updateDevoir(id, devoir);
        return ResponseEntity.ok(updatedDevoir);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteDevoir(@PathVariable Long id) {
        boolean isDeleted = devoirService.deleteDevoir(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping()
    public ResponseEntity<List<Devoir>> getAllDevoirs() {
        List<Devoir> devoirs = devoirService.getAllDevoirs();
        return ResponseEntity.ok(devoirs);
    }

    @GetMapping("{id}")
    public ResponseEntity<Devoir> getDevoirById(@PathVariable Long id) {
        Devoir devoir = devoirService.getDevoirById(id);
        return ResponseEntity.ok(devoir);
    }

    @GetMapping("date/{date}")
    public ResponseEntity<List<Devoir>> getDevoirsByDate(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<Devoir> devoirs = devoirService.getDevoirsByDate(date);
        return ResponseEntity.ok(devoirs);
    }

    @GetMapping("matiere/{matiere}")
    public ResponseEntity<List<Devoir>> getDevoirsByMatiere(@PathVariable String matiere) {
        List<Devoir> devoirs = devoirService.getDevoirsByMatiere(matiere);
        return ResponseEntity.ok(devoirs);
    }

    @GetMapping("prof/{nomProf}")
    public ResponseEntity<List<Devoir>> getDevoirsByNomProf(@PathVariable String nomProf) {
        List<Devoir> devoirs = devoirService.getDevoirsByNomProf(nomProf);
        return ResponseEntity.ok(devoirs);
    }
}
