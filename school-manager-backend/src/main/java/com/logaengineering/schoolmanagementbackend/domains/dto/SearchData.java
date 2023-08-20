package com.logaengineering.schoolmanagementbackend.domains.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.expression.ParseException;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
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

    public static boolean isFullDate(String dateString) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        dateFormat.setLenient(false);
        try {
            dateFormat.parse(dateString);
            return true;
        } catch (ParseException | java.text.ParseException e) {
            return false;
        }
    }

    public static String beforeDateQuery(String id, String value) {
        String query = SearchData.isFullDate(value) ? " "+id+" <= \"" +
                value + "\"" : "YEAR("+id+") LIKE  \"%" +
                value + "%\" OR MONTH("+id+") LIKE \"%" + value +
                "%\" OR DAY("+id+") LIKE \"%" + value + "%\"";

        return query;
    }

    public static String afterDateQuery(String id, String value) {
        String query = SearchData.isFullDate(value) ? " "+id+" >= \"" +
                value + "\"" : "YEAR("+id+") LIKE  \"%" +
                value + "%\" OR MONTH("+id+") LIKE \"%" + value +
                "%\" OR DAY("+id+") LIKE \"%" + value + "%\"";

        return query;
    }

    public static String comparisonQuery(String field, String value) {
        return field + " like \"%" + value + "%\"";
    }

    public static List<String> getRequest(String table, List<String> sort, List<String> conditions) {
        List<String> requestList = new ArrayList<String>();
        String request = "select * from " + table;
        if (!conditions.isEmpty()) {
            String condition = String.join(" and ", conditions);
            request += " where " + condition;
        }
        if (!sort.isEmpty()) {
            String orderBy = String.join(", ", sort);
            request += " order by " + orderBy;
        }
        requestList.add(request);
        String countRequest = "select count(*) nb from (" + request + ") t";
        requestList.add(countRequest);

        return requestList;
    }

    public Pageable setRequest(String table, List<String> sort, List<String> conditions, RequestData requestData) {
        String request = "select * from " + table;
        if (!conditions.isEmpty()) {
            String condition = String.join(" and ", conditions);
            request += " where " + condition;
        }
        if (!sort.isEmpty()) {
            String orderBy = String.join(", ", sort);
            request += " order by " + orderBy;
        }
        String countRequest = "select count(*) nb from (" + request + ") t";

        Pageable pageable = PageRequest.of(this.getPage(), this.getSize());
        long offset = pageable.getOffset();
        request += " limit " + offset + ", " + this.getSize();
        requestData.setRequest(request);
        requestData.setCountRequest(countRequest);

        return pageable;
    }

}