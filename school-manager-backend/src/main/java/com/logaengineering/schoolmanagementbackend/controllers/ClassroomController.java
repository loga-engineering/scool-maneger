package com.logaengineering.schoolmanagementbackend.controllers;

import com.logaengineering.schoolmanagementbackend.domains.entities.Classroom;
import com.logaengineering.schoolmanagementbackend.domains.entities.Student;
import com.logaengineering.schoolmanagementbackend.services.ClassroomService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(value = "http://localhost:3000/*")
@RestController
@RequestMapping("classrooms")
public class ClassroomController {
    private final ClassroomService classroomService;

    public ClassroomController(ClassroomService classroomService) {
        this.classroomService = classroomService;
    }

    @PostMapping()
    public ResponseEntity<Classroom> createClassroom(@RequestBody Classroom classroom) {
        Classroom newClassroom = classroomService.createClassroom(classroom);
        return ResponseEntity.status(HttpStatus.CREATED).body(newClassroom);
    }

    @PutMapping("{id}")
    public ResponseEntity<Classroom> updateClassroom(@PathVariable Long id, @RequestBody Classroom classroom) {
        Classroom updatedClassroom = classroomService.updateClassroom(id, classroom);
        return ResponseEntity.ok(updatedClassroom);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteClassroom(@PathVariable Long id) {
        boolean isDeleted = classroomService.deleteClassroom(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping()
    public ResponseEntity<List<Classroom>> getAllClassrooms() {
        List<Classroom> aClasses = classroomService.getAllClassrooms();
        return ResponseEntity.ok(aClasses);
    }

    @GetMapping("{id}")
    public ResponseEntity<Classroom> getClassroomById(@PathVariable Long id) {
        Classroom classroom = classroomService.getClassroomById(id);
        return ResponseEntity.ok(classroom);
    }

    @GetMapping("names/{nom}")
    public ResponseEntity<Classroom> getClassroomByName(@PathVariable String name) {
        Classroom classroom = classroomService.getClassroomByName(name);
        return ResponseEntity.ok(classroom);
    }

    @GetMapping("students/{classroomName}")
    public ResponseEntity<List<Student>> getStudentByClassroomName(@PathVariable String classroomName) {
        return ResponseEntity.ok(classroomService.getStudentByClassroomName(classroomName));
    }

    @GetMapping("school-year/{year}")
    public ResponseEntity<List<Classroom>> getClassroomBySchoolYear(@PathVariable String year) {
        List<Classroom> classrooms = classroomService.getClassroomBySchoolYear(year);
        return ResponseEntity.ok(classrooms);
    }
}