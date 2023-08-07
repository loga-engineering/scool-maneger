package com.logaengineering.schoolmanagementbackend.controllers;

import com.logaengineering.schoolmanagementbackend.domains.dto.EleveDTO;
import com.logaengineering.schoolmanagementbackend.services.EleveService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("eleves")
public class EleveController {

    private final EleveService eleveService;

    public EleveController(EleveService eleveService) {
        this.eleveService = eleveService;
    }

    @PostMapping()
    public ResponseEntity<EleveDTO> createEleve(@RequestBody EleveDTO eleveDTO) {
        EleveDTO newEleveDTO = eleveService.createEleve(eleveDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(newEleveDTO);
    }

    @PutMapping("{id}")
    public ResponseEntity<EleveDTO> updateEleve(@PathVariable Long id, @RequestBody EleveDTO eleveDTO) {
        EleveDTO updatedEleveDTO = eleveService.updateEleve(id, eleveDTO);
        return ResponseEntity.ok(updatedEleveDTO);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteEleve(@PathVariable Long id) {
        boolean isDeleted = eleveService.deleteEleve(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping()
    public ResponseEntity<List<EleveDTO>> getAllEleves() {
        List<EleveDTO> elevesDTO = eleveService.getAllEleves();
        return ResponseEntity.ok(elevesDTO);
    }

    @GetMapping("{id}")
    public ResponseEntity<EleveDTO> getEleveById(@PathVariable Long id) {
        EleveDTO eleveDTO = eleveService.getEleveById(id);
        return ResponseEntity.ok(eleveDTO);
    }

    @GetMapping("matricule/{matricule}")
    public ResponseEntity<EleveDTO> getEleveByMatricule(@PathVariable String matricule) {
        EleveDTO eleveDTO = eleveService.getEleveByMatricule(matricule);
        if (eleveDTO != null) {
            return ResponseEntity.ok(eleveDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
