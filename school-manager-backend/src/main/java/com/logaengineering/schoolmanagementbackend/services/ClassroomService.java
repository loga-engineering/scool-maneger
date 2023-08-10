package com.logaengineering.schoolmanagementbackend.services;


import com.logaengineering.schoolmanagementbackend.domains.entities.Classroom;
import com.logaengineering.schoolmanagementbackend.domains.entities.Student;
import com.logaengineering.schoolmanagementbackend.repositories.ClassroomRepository;
import com.logaengineering.schoolmanagementbackend.repositories.StudentRepository;
import javax.persistence.EntityNotFoundException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ClassroomService {
    private final ClassroomRepository classroomRepository;

    private final StudentRepository studentRepository;

    public ClassroomService(ClassroomRepository classroomRepository, StudentRepository studentRepository) {
        this.classroomRepository = classroomRepository;
        this.studentRepository = studentRepository;
    }

    public Classroom createClassroom(Classroom classroom) {
        return classroomRepository.save(classroom);
    }

    public List<Classroom> getAllClassrooms() {
        return classroomRepository.findAll();
    }

    public Classroom getClassroomById(Long id) {
        return classroomRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Classroom with id="+id+" not found !"));
    }

    public Classroom getClassroomByName(String name) {
        return classroomRepository.findClassroomByName(name).orElseThrow(() -> new EntityNotFoundException("Classroom with name="+name+" not found !"));
    }

    public Classroom updateClassroom(Long id, Classroom classroom) {
        Classroom classroomToUpdate = classroomRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Classroom with id="+id+" not found !"));
        classroomToUpdate.setName(classroom.getName());
        classroomToUpdate.setLevel(classroom.getLevel());
        classroomToUpdate.setHeadTeacherName(classroom.getHeadTeacherName());
        //classroomToUpdate.setStudents(classroom.getStudents());
        classroomToUpdate.setSchoolYear(classroom.getSchoolYear());

        return classroomRepository.save(classroomToUpdate);
    }

    public boolean deleteClassroom(Long id) {
        try{
            classroomRepository.deleteById(id);
            return true;
        }catch (Exception e){
            System.out.println("Error at deleteClassroom : "+e.getMessage());
            return false;
        }
    }

    public List<Classroom> getClassroomBySchoolYear(String year) {
        return classroomRepository.findBySchoolYearYear(year);
    }
}
