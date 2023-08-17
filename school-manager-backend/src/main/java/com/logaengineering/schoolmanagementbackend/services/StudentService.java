package com.logaengineering.schoolmanagementbackend.services;

import com.logaengineering.schoolmanagementbackend.domains.entities.Student;
import com.logaengineering.schoolmanagementbackend.repositories.StudentRepository;

import javax.persistence.EntityNotFoundException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student createStudent(Student student) {

        return studentRepository.save(student);

    }

    public List<Student> getAllStudent() {
        List<Student> students = studentRepository.findAll();
        return students;
    }

    public Student getStudentById(Long id) {
        Student student = studentRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Student not found !"));
        return student;
    }

    public List<Student> getStudentsByRegistrationNumber(String registrationNumber) {
        List<Student> students = studentRepository.findByRegistrationNumberContaining(registrationNumber);
        return students;
    }

    public List<Student> getStudentsByClassroomId(Long classroomId) {
        List<Student> students = studentRepository.findByClassroomId(classroomId);
        return students;
    }

    public Student updateStudent(Long id, Student newStudent) {
        Student student = studentRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Student not found !"));
        student.setRegistrationNumber(newStudent.getRegistrationNumber());
        student.setLastName(newStudent.getLastName());
        student.setFirstName(newStudent.getFirstName());
        student.setFatherName(newStudent.getFatherName());
        student.setMotherName(newStudent.getMotherName());
        student.setContact(newStudent.getContact());
        student.setAddress(newStudent.getAddress());
        student.setDateOfBirth(newStudent.getDateOfBirth());
        student.setEnrollmentDate(newStudent.getEnrollmentDate());
        student.setClassroom(newStudent.getClassroom());

        return studentRepository.save(student);
    }

    public boolean deleteStudent(Long id) {
        try{
            studentRepository.deleteById(id);
            return true;
        }catch (Exception e){
            System.out.println("Error at deleteStudent : "+e.getMessage());
            return false;
        }

    }

    public int getStudentCountByClassroomId(Long classroomId) {
        return studentRepository.countStudentByClassroomId(classroomId);
    }
}
