package com.logaengineering.schoolmanagementbackend.Repositories;

import com.logaengineering.schoolmanagementbackend.Models.Entities.Devoir;
import com.logaengineering.schoolmanagementbackend.Models.Entities.Eleve;
import com.logaengineering.schoolmanagementbackend.Models.Entities.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note,Long> {

    List<Note> findByEleveId(Long id_eleve);
    List<Note> findByDevoirId(Long id_devoir);
    List<Note> findByValeurBetween(Double min, Double max);
    List<Note> findByOrderByValeurAsc();
    List<Note> findByOrderByValeurDesc();

}
