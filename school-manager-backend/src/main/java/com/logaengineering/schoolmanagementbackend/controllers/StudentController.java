package com.logaengineering.schoolmanagementbackend.controllers;

import com.logaengineering.schoolmanagementbackend.domains.entities.Student;
import com.logaengineering.schoolmanagementbackend.services.StudentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping()
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        return ResponseEntity.status(HttpStatus.CREATED).body(studentService.createStudent(student));
    }

    @PutMapping("{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student student) {
        return ResponseEntity.ok(studentService.updateStudent(id, student));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        boolean isDeleted = studentService.deleteStudent(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping()
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudent());
    }

    @GetMapping("{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.getStudentById(id));
    }

    @GetMapping("registration-number/{number}")
    public ResponseEntity<List<Student>> getStudentsByRegistrationNumber(@PathVariable String number) {
        List<Student> students = studentService.getStudentsByRegistrationNumber(number);
        return ResponseEntity.ok(students);
    }

    @GetMapping("classroom/{id}")
    public ResponseEntity<List<Student>> getStudentsByClassroomId(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.getStudentsByClassroomId(id));
    }

    @GetMapping("count/{classroomId}")
    public ResponseEntity<Integer> countStudentsByClassroomId(@PathVariable Long classroomId) {
        int count = studentService.getStudentCountByClassroomId(classroomId);
        return ResponseEntity.ok(count);
    }


}
