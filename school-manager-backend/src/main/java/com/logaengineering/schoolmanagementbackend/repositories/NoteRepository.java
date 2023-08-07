package com.logaengineering.schoolmanagementbackend.repositories;

import com.logaengineering.schoolmanagementbackend.domains.entities.Note;
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
