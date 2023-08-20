package com.logaengineering.schoolmanagementbackend.controllers;

import com.logaengineering.schoolmanagementbackend.domains.dto.SearchData;
import com.logaengineering.schoolmanagementbackend.domains.entities.Grade;
import com.logaengineering.schoolmanagementbackend.domains.entities.Student;
import com.logaengineering.schoolmanagementbackend.services.GradeService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(value = "*")
@RestController
@RequestMapping("grades")
public class GradeController {
    private final GradeService gradeService;

    public GradeController(GradeService gradeService) {
        this.gradeService = gradeService;
    }

    @PostMapping()
    public ResponseEntity<Grade> createGrade(@RequestBody Grade grade) {
        Grade newGrade = gradeService.createGrade(grade);
        return ResponseEntity.status(HttpStatus.CREATED).body(newGrade);
    }

    @PostMapping("search")
    public ResponseEntity<Page<Grade>> searchStudents(@RequestBody SearchData searchData) {
        return ResponseEntity.ok(gradeService.searchGrades(searchData));
    }

    @GetMapping()
    public ResponseEntity<List<Grade>> getAllGrades() {
        List<Grade> grades = gradeService.getAllGrades();
        return ResponseEntity.ok(grades);
    }

    @GetMapping("{id}")
    public ResponseEntity<Grade> getGradeById(@PathVariable Long id) {
        Grade grade = gradeService.getGradeById(id);
        return ResponseEntity.ok(grade);
    }


    @PutMapping("{id}")
    public ResponseEntity<Grade> updateGrade(@PathVariable Long id, @RequestBody Grade grade) {
        Grade updatedGrade = gradeService.updateGrade(id, grade);
        return ResponseEntity.ok(updatedGrade);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteGrade(@PathVariable Long id) {
        boolean isDeleted = gradeService.deleteGrade(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("students/{student_id}")
    public ResponseEntity<List<Grade>> getGradesByStudentId(@PathVariable Long student_id) {
        List<Grade> grades = gradeService.getGradesByStudentId(student_id);
        return ResponseEntity.ok(grades);
    }

    @GetMapping("exams/{exam_id}")
    public ResponseEntity<List<Grade>> getGradesByExamId(@PathVariable Long exam_id) {
        List<Grade> grades = gradeService.getGradesByExamId(exam_id);
        return ResponseEntity.ok(grades);
    }

    @GetMapping("values/{min}/{max}")
    public ResponseEntity<List<Grade>> getGradesByValueBetween(@PathVariable Double min, @PathVariable Double max) {
        List<Grade> grades = gradeService.getGradesByValueBetween(min, max);
        return ResponseEntity.ok(grades);
    }

    @GetMapping("value-asc/asc")
    public ResponseEntity<List<Grade>> getGradesOrderByValueAsc() {
        List<Grade> grades = gradeService.getGradesOrderByValueAsc();
        return ResponseEntity.ok(grades);
    }

    @GetMapping("value-desc/desc")
    public ResponseEntity<List<Grade>> getGradesOrderByValueDesc() {
        List<Grade> grades = gradeService.getGradesOrderByValueDesc();
        return ResponseEntity.ok(grades);
    }
}
