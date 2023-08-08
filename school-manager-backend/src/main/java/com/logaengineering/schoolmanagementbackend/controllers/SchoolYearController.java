package com.logaengineering.schoolmanagementbackend.controllers;

import com.logaengineering.schoolmanagementbackend.domains.entities.SchoolYear;
import com.logaengineering.schoolmanagementbackend.services.SchoolYearService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("school-years")
public class SchoolYearController {

    private final SchoolYearService schoolYearService;

    public SchoolYearController(SchoolYearService schoolYearService) {
        this.schoolYearService = schoolYearService;
    }

    @PostMapping()
    public ResponseEntity<SchoolYear> createSchoolYear(@RequestBody SchoolYear schoolYear) {
        SchoolYear newSchoolYear = schoolYearService.createSchoolYear(schoolYear);
        return ResponseEntity.status(HttpStatus.CREATED).body(newSchoolYear);
    }

    @PutMapping("{id}")
    public ResponseEntity<SchoolYear> updateSchoolYear(@PathVariable Long id, @RequestBody SchoolYear schoolYear) {
        SchoolYear updatedSchoolYear = schoolYearService.updateSchoolYear(id, schoolYear);
        return ResponseEntity.ok(updatedSchoolYear);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteSchoolYear(@PathVariable Long id) {
        boolean isDeleted = schoolYearService.deleteSchoolYear(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping()
    public ResponseEntity<List<SchoolYear>> getAllSchoolYears() {
        List<SchoolYear> schoolYears = schoolYearService.getAllSchoolYears();
        return ResponseEntity.ok(schoolYears);
    }

    @GetMapping("{id}")
    public ResponseEntity<SchoolYear> getSchoolYearById(@PathVariable Long id) {
        SchoolYear schoolYear = schoolYearService.getSchoolYearById(id);
        return ResponseEntity.ok(schoolYear);
    }

    @GetMapping("/years/{year}")
    public ResponseEntity<List<SchoolYear>> getSchoolYearsByYear(@PathVariable String year) {
        List<SchoolYear> schoolYears = schoolYearService.getSchoolYearsByYear(year);
        return ResponseEntity.ok(schoolYears);
    }

}
