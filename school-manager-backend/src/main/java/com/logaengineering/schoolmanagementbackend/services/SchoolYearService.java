package com.logaengineering.schoolmanagementbackend.services;

import com.logaengineering.schoolmanagementbackend.domains.dto.RequestData;
import com.logaengineering.schoolmanagementbackend.domains.dto.SearchData;
import com.logaengineering.schoolmanagementbackend.domains.entities.SchoolYear;
import com.logaengineering.schoolmanagementbackend.repositories.SchoolYearRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class SchoolYearService {

    private final JdbcTemplate jdbcTemplate;
    private final EntityManager entityManager;
    private final SchoolYearRepository schoolYearRepository;

    public SchoolYear createSchoolYear(SchoolYear schoolYear) {
        return schoolYearRepository.save(schoolYear);
    }

    public List<SchoolYear> getAllSchoolYears() {
        return schoolYearRepository.findAll();
    }

    public Page<SchoolYear> searchSchoolYears(SearchData searchData) {
        final String table = "school_years";

        /// Column filters \\\
        List<String> conditions = searchData.getFilter().stream().map(filteringData -> {
            if (filteringData.getId().equals("year")) {
                return searchData.comparisonQuery("year",filteringData.getValue());
            } else if (filteringData.getId().equals("startDate")) {
                return searchData.beforeDateQuery("start_date",filteringData.getValue());
            } else if (filteringData.getId().equals("endDate")) {
                return searchData.afterDateQuery("end_date",filteringData.getValue());
            }
            return searchData.comparisonQuery(filteringData.getId(),filteringData.getValue());
        }).collect(Collectors.toList());

        /// Sorting \\\
        List<String> sort = searchData.getSort().stream().map(sortingData -> {
            String column;
            if (sortingData.getId().equals("year")) {
                column = "year";
            } else if (sortingData.getId().equals("startDate")) {
                column = "start_date";
            } else if (sortingData.getId().equals("endDate")) {
                column = "end_date";
            } else {
                column = sortingData.getId();
            }
            return column + " " + (sortingData.isDesc() ? "desc" : "asc");
        }).collect(Collectors.toList());

        RequestData requestData = new RequestData();
        Pageable pageable = searchData.setRequest(table,sort,conditions,requestData);

        log.info("======> request: {}", requestData.getRequest());
        log.info("======> countRequest: {}", requestData.getCountRequest());

        List<SchoolYear> content = entityManager.createNativeQuery(requestData.getRequest(), SchoolYear.class).getResultList();
        Long totalCount = jdbcTemplate.queryForObject(requestData.getCountRequest(), Long.class);

        return new PageImpl<>(content, pageable, totalCount);
    }


    public SchoolYear getSchoolYearById(Long id) {
        return schoolYearRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("School year not found !"));
    }

    public SchoolYear updateSchoolYear(Long id, SchoolYear schoolYear) {
        SchoolYear schoolYearToUpdate = schoolYearRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("School year not found !"));
        schoolYearToUpdate.setYear(schoolYear.getYear());
        schoolYearToUpdate.setStartDate(schoolYear.getStartDate());
        schoolYearToUpdate.setEndDate(schoolYear.getEndDate());
        return schoolYearRepository.save(schoolYearToUpdate);
    }

    public boolean deleteSchoolYear(Long id) {
        try {
            schoolYearRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            System.out.println("Error at deleteSchoolYear : " + e.getMessage());
            return false;
        }
    }

    public List<SchoolYear> getSchoolYearsByYear(String year) {
        return schoolYearRepository.findByYear(year);
    }

}
