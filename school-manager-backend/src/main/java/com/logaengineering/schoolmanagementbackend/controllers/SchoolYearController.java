package com.logaengineering.schoolmanagementbackend.controllers;

import com.logaengineering.schoolmanagementbackend.domains.dto.SearchData;
import com.logaengineering.schoolmanagementbackend.domains.entities.SchoolYear;
import com.logaengineering.schoolmanagementbackend.services.SchoolYearService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(value = "*")
@RequestMapping("school-years")
public class SchoolYearController {

    private final SchoolYearService schoolYearService;

    @PostMapping()
    public ResponseEntity<SchoolYear> createSchoolYear(@RequestBody SchoolYear schoolYear) {
        return ResponseEntity.status(HttpStatus.CREATED).body(schoolYearService.createSchoolYear(schoolYear));
    }


    @PostMapping("search")
    public ResponseEntity<Page<SchoolYear>> searchSchoolYears(@RequestBody SearchData searchData) {
        return ResponseEntity.ok(schoolYearService.searchSchoolYears(searchData));
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

//    @GetMapping("/search")
//    public ResponseEntity<Page<SchoolYear>> search(@Nullable @RequestParam("query") String query, @RequestParam(value = "sort", required = false) Sort sortParams, Pageable pageable) {
//
//        System.out.println("query ===========> " + query + ", sortParams ===========> " + sortParams + ", pageable ============> " + pageable);
//        Page<SchoolYear> schoolYears = schoolYearService.searchSchoolYears(query, pageable, sortParams);
//        return ResponseEntity.ok(schoolYears);
//    }


    @GetMapping()
    public ResponseEntity<List<SchoolYear>> getAllSchoolYears() {
        return ResponseEntity.ok(schoolYearService.getAllSchoolYears());
    }
    @GetMapping("{id}")
    public ResponseEntity<SchoolYear> getSchoolYearById(@PathVariable Long id) {
        return ResponseEntity.ok(schoolYearService.getSchoolYearById(id));
    }

    @GetMapping("years/{year}")
    public ResponseEntity<List<SchoolYear>> getSchoolYearsByYear(@PathVariable String year) {
        return ResponseEntity.ok(schoolYearService.getSchoolYearsByYear(year));
    }

}
