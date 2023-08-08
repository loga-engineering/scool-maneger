package com.logaengineering.schoolmanagementbackend.services;

import com.logaengineering.schoolmanagementbackend.domains.entities.Grade;
import com.logaengineering.schoolmanagementbackend.repositories.GradeRepository;
import javax.persistence.EntityNotFoundException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class GradeService {
    private final GradeRepository gradeRepository;

    public GradeService(GradeRepository gradeRepository) {
        this.gradeRepository = gradeRepository;
    }

    public Grade createGrade(Grade grade) {
        return gradeRepository.save(grade);
    }

    public List<Grade> getAllGrades() {
        return gradeRepository.findAll();
    }

    public Grade getGradeById(Long id) {
        return gradeRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Grade not found !"));
    }

    public Grade updateGrade(Long id, Grade grade) {
        Grade gradeToUpdate = gradeRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Grade not found !"));
        gradeToUpdate.setValue(grade.getValue());
        gradeToUpdate.setStudent(grade.getStudent());
        gradeToUpdate.setExam(grade.getExam());
        return gradeRepository.save(gradeToUpdate);
    }

    public boolean deleteGrade(Long id) {
        try{
            gradeRepository.deleteById(id);
            return true;
        }catch (Exception e) {
            System.out.println("Error at deleteGrade : " + e.getMessage());
            return false;
        }
    }

    public List<Grade> getGradesByStudentId(Long student_id) {
        return gradeRepository.findByStudentId(student_id);
    }

    public List<Grade> getGradesByExamId(Long exam_id) {
        return gradeRepository.findByExamId(exam_id);
    }

    public List<Grade> getGradesByValueBetween(Double min, Double max) {
        return gradeRepository.findByValueBetween(min, max);
    }

    public List<Grade> getGradesOrderByValueAsc() {
        return gradeRepository.findByOrderByValueAsc();
    }

    public List<Grade> getGradesOrderByValueDesc() {
        return gradeRepository.findByOrderByValueDesc();
    }


}