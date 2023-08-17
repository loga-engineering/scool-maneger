package com.logaengineering.schoolmanagementbackend.controllers;

import com.logaengineering.schoolmanagementbackend.domains.entities.SchoolYear;
import com.logaengineering.schoolmanagementbackend.services.SchoolYearService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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


    @GetMapping("/search")
    public Page<SchoolYear> searchSchoolYears(@RequestParam(name="query", required = false) String query,
                                              @RequestParam(name="page", defaultValue="0") int page,
                                              @RequestParam(name="size", defaultValue="10") int size,
                                              @RequestParam(name="sortId", required = false) String sortId,
                                              @RequestParam(name="sortDirection", required = false) boolean sortDirection) {

        System.out.println("query = " + query + ", page = " + page + ", size = " + size + ", sortId = " + sortId + ", sortDirection = " + sortDirection);

        Sort sort = null;
        if (sortId != null) {

            if(sortDirection) {
                sort = Sort.by(sortId).descending();
            } else {
                sort = Sort.by(sortId).ascending();
            }
        }


        Sort pageableSort = null;
        if (sort != null) {
            pageableSort = sort;
        }else pageableSort = Sort.by("id").descending();

        Pageable pageable = PageRequest.of(page, size, pageableSort);

        System.out.println("pageable =====> " + pageable);
        return schoolYearService.searchSchoolYears(query, pageable);
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
