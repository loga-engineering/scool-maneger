package com.logaengineering.schoolmanagementbackend.services;

import com.logaengineering.schoolmanagementbackend.domains.entities.Exam;
import com.logaengineering.schoolmanagementbackend.repositories.ExamRepository;
import javax.persistence.EntityNotFoundException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class ExamService {
    private final ExamRepository examRepository;

    public ExamService(ExamRepository examRepository) {
        this.examRepository = examRepository;
    }

    public Exam createExam(Exam exam) {
        return examRepository.save(exam);
    }

    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    public Exam getExamById(Long id) {
        return examRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Exam not found !"));
    }

    public Exam updateExam(Long id, Exam exam) {
        Exam examToUpdate = examRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Exam not found !"));
        examToUpdate.setExamDate(exam.getExamDate());
        examToUpdate.setSubject(exam.getSubject());
        examToUpdate.setTeacherName(exam.getTeacherName());
        return examRepository.save(examToUpdate);
    }

    public boolean deleteExam(Long id) {

        try{
            examRepository.deleteById(id);
            return true;
        }catch (Exception e){
            System.out.println("Error at deleteExam : "+e.getMessage());
            return false;
        }
    }

    public List<Exam> getExamsByExamDate(LocalDate date) {
        return examRepository.findByExamDate(date);
    }

    public List<Exam> getExamsBySubject(String matiere) {
        return examRepository.findBySubject(matiere);
    }

    public List<Exam> getExamsByTeacherName(String nomProf) {
        return examRepository.findByTeacherName(nomProf);
    }
}
