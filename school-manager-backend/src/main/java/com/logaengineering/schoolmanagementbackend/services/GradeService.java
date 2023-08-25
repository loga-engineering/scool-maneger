package com.logaengineering.schoolmanagementbackend.services;

import com.logaengineering.schoolmanagementbackend.domains.dto.RequestData;
import com.logaengineering.schoolmanagementbackend.domains.dto.SearchData;
import com.logaengineering.schoolmanagementbackend.domains.entities.Grade;
import com.logaengineering.schoolmanagementbackend.domains.entities.Student;
import com.logaengineering.schoolmanagementbackend.repositories.GradeRepository;

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
public class GradeService {
    private final JdbcTemplate jdbcTemplate;
    private final EntityManager entityManager;
    private final GradeRepository gradeRepository;

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


    public Page<Grade> searchGrades(SearchData searchData) {
        final String table = "grades";

        /// Column filters \\\
        List<String> conditions = searchData.getFilter().stream().map(filteringData -> {
            if (filteringData.getId().equals("exam.examDate")) {
                return searchData.afterDateQuery("e.exam_date",filteringData.getValue());
            } else if (filteringData.getId().equals("exam.subject")) {
                return searchData.comparisonQuery("e.subject",filteringData.getValue());
            } else if (filteringData.getId().equals("value")) {
                return searchData.comparisonQuery("g.value",filteringData.getValue());
            } else if (filteringData.getId().equals("student.lastName")) {
                return searchData.comparisonQuery("st.last_name",filteringData.getValue());
            } else if (filteringData.getId().equals("student.firstName")) {
                return searchData.comparisonQuery("st.first_name",filteringData.getValue());
            }
            return searchData.comparisonQuery("c.name",filteringData.getValue());
        }).collect(Collectors.toList());

        /// Sorting \\\
        List<String> sort = searchData.getSort().stream().map(sortingData -> {
            String column;
            if (sortingData.getId().equals("exam.examDate")) {
                column = "e.exam_date";
            } else if (sortingData.getId().equals("exam.subject")) {
                column = "e.subject";
            } else if (sortingData.getId().equals("value")) {
                column = "g.value";
            }else if (sortingData.getId().equals("student.lastName")) {
                column = "st.last_name";
            }else  {
                column = "c.name";
            }
            return column + " " + (sortingData.isDesc() ? "desc" : "asc");
        }).collect(Collectors.toList());

        //////

        String request = "select * from "+ table+" g, exams e, students st, classrooms c where g.exam_id = e.id " +
                "and g.student_id = st.id and st.classroom_id = c.id ";
        if (!conditions.isEmpty()) {
            String condition = String.join(" and ", conditions);
            request += " and "+condition;
        }
        if (!sort.isEmpty()) {
            String orderBy = String.join(", ", sort);
            request += " order by " + orderBy;
        }
        //String countRequest = "select count(*) nb from (" + request + ") t";
        String countRequest = "SELECT COUNT(*) AS nb FROM (" +
                "   SELECT g.id FROM grades g, exams e, students st, classrooms c " +
                "WHERE g.exam_id = e.id AND g.student_id = st.id and st.classroom_id = c.id ) t";

        Pageable pageable = PageRequest.of(searchData.getPage(), searchData.getSize());
        long offset = pageable.getOffset();
        request += " limit " + offset + ", " + searchData.getSize();


        log.info("======> request: {}", request);
        log.info("======> countRequest: {}", countRequest);

        List<Grade> content = entityManager.createNativeQuery(request, Grade.class).getResultList();
        Long totalCount = jdbcTemplate.queryForObject(countRequest, Long.class);

        return new PageImpl<>(content, pageable, totalCount);
    }
}