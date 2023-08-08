package com.logaengineering.schoolmanagementbackend.domains.entities;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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

//    @OneToMany(mappedBy = "classroom", cascade = CascadeType.ALL)
//    private List<Student> students;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "school_year_id", referencedColumnName = "id")
    private SchoolYear schoolYear;

//    public void addEleve(Student student) {
//        this.students.add(student);
//        student.setClassroom(this);
//    }
//    public void removeEleve(Student student) {
//        this.students.remove(student);
//        student.setClassroom(null);
//    }

}
