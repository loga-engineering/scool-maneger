package com.logaengineering.schoolmanagementbackend.Controllers;

import com.logaengineering.schoolmanagementbackend.Models.DTO.EleveDTO;
import com.logaengineering.schoolmanagementbackend.Services.EleveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(value = "*")
@RestController
@RequestMapping("/school-management")
public class EleveController {

    @Autowired
    private EleveService eleveService;

    @PostMapping("/eleves")
    public ResponseEntity<EleveDTO> createEleve(@RequestBody EleveDTO eleveDTO) {
        EleveDTO newEleveDTO = eleveService.createEleve(eleveDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(newEleveDTO);
    }

    @PutMapping("/eleves/{id}")
    public ResponseEntity<EleveDTO> updateEleve(@PathVariable Long id, @RequestBody EleveDTO eleveDTO) {
        EleveDTO updatedEleveDTO = eleveService.updateEleve(id, eleveDTO);
        return ResponseEntity.ok(updatedEleveDTO);
    }

    @DeleteMapping("/eleves/{id}")
    public ResponseEntity<Void> deleteEleve(@PathVariable Long id) {
        boolean isDeleted = eleveService.deleteEleve(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/eleves")
    public ResponseEntity<List<EleveDTO>> getAllEleves() {
        List<EleveDTO> elevesDTO = eleveService.getAllEleves();
        return ResponseEntity.ok(elevesDTO);
    }

    @GetMapping("/eleves/{id}")
    public ResponseEntity<EleveDTO> getEleveById(@PathVariable Long id) {
        EleveDTO eleveDTO = eleveService.getEleveById(id);
        return ResponseEntity.ok(eleveDTO);
    }

    @GetMapping("/eleves/matricule/{matricule}")
    public ResponseEntity<EleveDTO> getEleveByMatricule(@PathVariable String matricule) {
        EleveDTO eleveDTO = eleveService.getEleveByMatricule(matricule);
        if (eleveDTO != null) {
            return ResponseEntity.ok(eleveDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



}
