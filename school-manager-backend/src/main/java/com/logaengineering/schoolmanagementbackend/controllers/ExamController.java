package com.logaengineering.schoolmanagementbackend.controllers;

import com.logaengineering.schoolmanagementbackend.domains.entities.Exam;
import com.logaengineering.schoolmanagementbackend.services.ExamService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
@CrossOrigin(value = "*")
@RestController
@RequestMapping("exams")
public class ExamController {

    private final ExamService examService;

    public ExamController(ExamService examService) {
        this.examService = examService;
    }

    @PostMapping()
    public ResponseEntity<Exam> createExam(@RequestBody Exam exam) {
        Exam newExam = examService.createExam(exam);
        return ResponseEntity.status(HttpStatus.CREATED).body(newExam);
    }

    @PutMapping("{id}")
    public ResponseEntity<Exam> updateExam(@PathVariable Long id, @RequestBody Exam exam) {
        Exam updatedExam = examService.updateExam(id, exam);
        return ResponseEntity.ok(updatedExam);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteExam(@PathVariable Long id) {
        boolean isDeleted = examService.deleteExam(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping()
    public ResponseEntity<List<Exam>> getAllExams() {
        List<Exam> exams = examService.getAllExams();
        return ResponseEntity.ok(exams);
    }

    @GetMapping("{id}")
    public ResponseEntity<Exam> getExamById(@PathVariable Long id) {
        Exam exam = examService.getExamById(id);
        return ResponseEntity.ok(exam);
    }

    @GetMapping("dates/{date}")
    public ResponseEntity<List<Exam>> getExamsByExamDate(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<Exam> exams = examService.getExamsByExamDate(date);
        return ResponseEntity.ok(exams);
    }

    @GetMapping("subjects/{subject}")
    public ResponseEntity<List<Exam>> getExamsBySubject(@PathVariable String subject) {
        List<Exam> exams = examService.getExamsBySubject(subject);
        return ResponseEntity.ok(exams);
    }

    @GetMapping("teachers/{nomProf}")
    public ResponseEntity<List<Exam>> getExamsByTeacherName(@PathVariable String nomProf) {
        List<Exam> exams = examService.getExamsByTeacherName(nomProf);
        return ResponseEntity.ok(exams);
    }
}
