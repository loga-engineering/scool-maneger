package com.logaengineering.schoolmanagementbackend.domains.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchData {
    private int page;
    private int size;
    private String query;
    private List<SortingData> sort;
    private List<FilteringData> filter;
}
