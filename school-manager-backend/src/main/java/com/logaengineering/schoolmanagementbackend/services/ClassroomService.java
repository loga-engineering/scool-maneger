package com.logaengineering.schoolmanagementbackend.services;

import com.logaengineering.schoolmanagementbackend.domains.dto.SearchData;
import com.logaengineering.schoolmanagementbackend.domains.entities.Classroom;
import com.logaengineering.schoolmanagementbackend.repositories.ClassroomRepository;

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
public class ClassroomService {
    private final JdbcTemplate jdbcTemplate;
    private final EntityManager entityManager;
    private final ClassroomRepository classroomRepository;

    public Classroom createClassroom(Classroom classroom) {
        return classroomRepository.save(classroom);
    }

    public List<Classroom> getAllClassrooms() {
        return classroomRepository.findAll();
    }

    public Classroom getClassroomById(Long id) {
        return classroomRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Classroom with id="+id+" not found !"));
    }

    public List<Classroom> getClassroomsByName(String name) {
        return classroomRepository.findByNameContaining(name);
    }

    public Classroom updateClassroom(Long id, Classroom classroom) {
        Classroom classroomToUpdate = classroomRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Classroom with id="+id+" not found !"));
        classroomToUpdate.setName(classroom.getName());
        classroomToUpdate.setLevel(classroom.getLevel());
        classroomToUpdate.setHeadTeacherName(classroom.getHeadTeacherName());
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

    public Page<Classroom> searchClassrooms(SearchData searchData) {

        final String table = "classrooms";

        /// Column filters \\\
        List<String> conditions = searchData.getFilter().stream().map(filteringData -> {
            if (filteringData.getId().equals("name")) {
                return searchData.comparisonQuery("name",filteringData.getValue());
            } else if (filteringData.getId().equals("level")) {
                return searchData.comparisonQuery("level",filteringData.getValue());
            } else if (filteringData.getId().equals("headTeacherName")) {
                return searchData.comparisonQuery("head_teacher_name",filteringData.getValue());
            }
            return searchData.comparisonQuery("s.year",filteringData.getValue());
        }).collect(Collectors.toList());

        /// Sorting \\\
        List<String> sort = searchData.getSort().stream().map(sortingData -> {
            String column;
            if (sortingData.getId().equals("name")) {
                column = "name";
            } else if (sortingData.getId().equals("level")) {
                column = "level";
            } else if (sortingData.getId().equals("headTeacherName")) {
                column = "head_teacher_name";
            } else {
                column = "s.year";
            }
            return column + " " + (sortingData.isDesc() ? "desc" : "asc");
        }).collect(Collectors.toList());


        String request = "select * from "+ table+" c, school_years s where c.school_year_id = s.id ";
        if (!conditions.isEmpty()) {
            String condition = String.join(" and ", conditions);
            request += " and "+condition;
        }
        if (!sort.isEmpty()) {
            String orderBy = String.join(", ", sort);
            request += " order by " + orderBy;
        }

        String countRequest = "select count(*) nb from ( select c.id from " +table+ " c, school_years s where c.school_year_id = s.id ) t";

        Pageable pageable = PageRequest.of(searchData.getPage(), searchData.getSize());
        long offset = pageable.getOffset();
        request += " limit " + offset + ", " + searchData.getSize();


        log.info("======> request: {}", request);
        log.info("======> countRequest: {}", countRequest);

        List<Classroom> content = entityManager.createNativeQuery(request, Classroom.class).getResultList();
        Long totalCount = jdbcTemplate.queryForObject(countRequest, Long.class);

        return new PageImpl<>(content, pageable, totalCount);

    }



}
