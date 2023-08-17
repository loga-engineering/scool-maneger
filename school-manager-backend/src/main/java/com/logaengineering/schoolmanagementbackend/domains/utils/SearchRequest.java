package com.logaengineering.schoolmanagementbackend.domains.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchRequest {
    private String query;
    private int page;
    private int size;
    private String sort;

}
