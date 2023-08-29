package com.logaengineering.schoolmanagementbackend.domains.entities;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "classrooms")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Classroom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String name;
    private String level;
    private String headTeacherName;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "school_year_id", referencedColumnName = "id")
    private SchoolYear schoolYear;

}
