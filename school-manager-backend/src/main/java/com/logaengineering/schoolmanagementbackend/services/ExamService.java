package com.logaengineering.schoolmanagementbackend.services;

import com.logaengineering.schoolmanagementbackend.domains.dto.RequestData;
import com.logaengineering.schoolmanagementbackend.domains.dto.SearchData;
import com.logaengineering.schoolmanagementbackend.domains.entities.Exam;
import com.logaengineering.schoolmanagementbackend.domains.entities.SchoolYear;
import com.logaengineering.schoolmanagementbackend.repositories.ExamRepository;

import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class ExamService {
    private final JdbcTemplate jdbcTemplate;
    private final EntityManager entityManager;
    private final ExamRepository examRepository;

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
        return examRepository.findBySubjectContaining(matiere);
    }

    public List<Exam> getExamsByTeacherName(String nomProf) {
        return examRepository.findByTeacherName(nomProf);
    }

    public Page<Exam> searchExams(SearchData searchData) {
        final String table = "exams";

        /// Column filters \\\
        List<String> conditions = searchData.getFilter().stream().map(filteringData -> {
            if (filteringData.getId().equals("subject")) {
                return searchData.comparisonQuery("subject",filteringData.getValue());
            } else if (filteringData.getId().equals("teacherName")) {
                return searchData.comparisonQuery("teacher_name",filteringData.getValue());
            } else if (filteringData.getId().equals("examDate")) {
                return searchData.afterDateQuery("exam_date",filteringData.getValue());
            }
            return searchData.comparisonQuery(filteringData.getId(),filteringData.getValue());
        }).collect(Collectors.toList());

        /// Sorting \\\
        List<String> sort = searchData.getSort().stream().map(sortingData -> {
            String column;
            if (sortingData.getId().equals("subject")) {
                column = "subject";
            } else if (sortingData.getId().equals("teacherName")) {
                column = "teacher_name";
            } else if (sortingData.getId().equals("examDate")) {
                column = "exam_date";
            } else {
                column = sortingData.getId();
            }
            return column + " " + (sortingData.isDesc() ? "desc" : "asc");
        }).collect(Collectors.toList());

        RequestData requestData = new RequestData();
        Pageable pageable = searchData.setRequest(table,sort,conditions,requestData);

        log.info("======> request: {}", requestData.getRequest());
        log.info("======> countRequest: {}", requestData.getCountRequest());

        List<Exam> content = entityManager.createNativeQuery(requestData.getRequest(), Exam.class).getResultList();
        Long totalCount = jdbcTemplate.queryForObject(requestData.getCountRequest(), Long.class);

        return new PageImpl<>(content, pageable, totalCount);
    }
}
