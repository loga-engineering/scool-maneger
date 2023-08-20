package com.logaengineering.schoolmanagementbackend.services;

import com.logaengineering.schoolmanagementbackend.domains.dto.RequestData;
import com.logaengineering.schoolmanagementbackend.domains.dto.SearchData;
import com.logaengineering.schoolmanagementbackend.domains.entities.SchoolYear;
import com.logaengineering.schoolmanagementbackend.domains.entities.Student;
import com.logaengineering.schoolmanagementbackend.repositories.StudentRepository;

import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class StudentService {
    private final JdbcTemplate jdbcTemplate;
    private final EntityManager entityManager;
    private final StudentRepository studentRepository;

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

    public Page<Student> searchStudents(SearchData searchData) {
        final String table = "students";

        /// Column filters \\\
        List<String> conditions = searchData.getFilter().stream().map(filteringData -> {
            if (filteringData.getId().equals("firstName")) {
                return searchData.comparisonQuery("first_name",filteringData.getValue());
            } else if (filteringData.getId().equals("lastName")) {
                return searchData.comparisonQuery("last_name",filteringData.getValue());
            } else if (filteringData.getId().equals("dateOfBirth")) {
                return searchData.beforeDateQuery("date_of_birth",filteringData.getValue());
            } else if (filteringData.getId().equals("registrationNumber")) {
                return searchData.comparisonQuery("registration_number",filteringData.getValue());
            }
            return searchData.comparisonQuery(filteringData.getId(),filteringData.getValue());
        }).collect(Collectors.toList());

        /// Sorting \\\
        List<String> sort = searchData.getSort().stream().map(sortingData -> {
            String column;
            if (sortingData.getId().equals("firstName")) {
                column = "first_name";
            } else if (sortingData.getId().equals("lastName")) {
                column = "last_name";
            } else if (sortingData.getId().equals("registrationNumber")) {
                column = "registration_number";
            }else if (sortingData.getId().equals("dateOfBirth")) {
                column = "date_of_birth";
            } else {
                column = sortingData.getId();
            }
            return column + " " + (sortingData.isDesc() ? "desc" : "asc");
        }).collect(Collectors.toList());


        RequestData requestData = new RequestData();
        Pageable pageable = searchData.setRequest(table,sort,conditions,requestData);

        log.info("======> request: {}", requestData.getRequest());
        log.info("======> countRequest: {}", requestData.getCountRequest());

        List<Student> content = entityManager.createNativeQuery(requestData.getRequest(), Student.class).getResultList();
        Long totalCount = jdbcTemplate.queryForObject(requestData.getCountRequest(), Long.class);

        return new PageImpl<>(content, pageable, totalCount);
    }
}
