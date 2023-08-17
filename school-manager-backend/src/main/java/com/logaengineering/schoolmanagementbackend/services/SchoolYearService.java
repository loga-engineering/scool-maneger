package com.logaengineering.schoolmanagementbackend.services;

import com.logaengineering.schoolmanagementbackend.domains.entities.SchoolYear;
import com.logaengineering.schoolmanagementbackend.repositories.SchoolYearRepository;
import javax.persistence.EntityNotFoundException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static java.util.Objects.isNull;

@Service
@Transactional
public class SchoolYearService {
    private final SchoolYearRepository schoolYearRepository;

    public SchoolYearService(SchoolYearRepository schoolYearRepository) {
        this.schoolYearRepository = schoolYearRepository;
    }

    public SchoolYear createSchoolYear(SchoolYear schoolYear) {
        return schoolYearRepository.save(schoolYear);
    }

    public List<SchoolYear> getAllSchoolYears() {
        return schoolYearRepository.findAll();
    }

    public Page<SchoolYear> searchSchoolYears(String query, Pageable pageable) {
        if (isNull(query) || "".equals(query)) {
            return schoolYearRepository.findAll(pageable);
        } else {
            return schoolYearRepository.search(query, pageable);
        }
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
        }catch (Exception e){
            System.out.println("Error at deleteSchoolYear : "+e.getMessage());
            return false;
        }
    }

    public List<SchoolYear> getSchoolYearsByYear(String year) {
        return schoolYearRepository.findByYear(year);
    }

}
