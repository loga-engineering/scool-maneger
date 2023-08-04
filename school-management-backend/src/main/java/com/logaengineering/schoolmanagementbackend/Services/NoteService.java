package com.logaengineering.schoolmanagementbackend.Services;

import com.logaengineering.schoolmanagementbackend.Models.Entities.Devoir;
import com.logaengineering.schoolmanagementbackend.Models.Entities.Note;
import com.logaengineering.schoolmanagementbackend.Repositories.NoteRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class NoteService {
    @Autowired
    private NoteRepository noteRepository;

    public Note createNote(Note note) {
        return noteRepository.save(note);
    }

    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    public Note getNoteById(Long id) {
        return noteRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Note introuvable !"));
    }

    public Note updateNote(Long id, Note note) {
        Note noteToUpdate = noteRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Note introuvable !"));
        noteToUpdate.setValeur(note.getValeur());
        noteToUpdate.setEleve(note.getEleve());
        noteToUpdate.setDevoir(note.getDevoir());
        return noteRepository.save(noteToUpdate);
    }

    public boolean deleteNote(Long id) {
        try{
            noteRepository.deleteById(id);
            return true;
        }catch (Exception e) {
            System.out.println("Erreur lors de la suppression de la note : " + e.getMessage());
            return false;
        }
    }

    public List<Note> getNotesByEleveId(Long id_eleve) {
        return noteRepository.findByEleveId(id_eleve);
    }

    public List<Note> getNotesByDevoirId(Long id_devoir) {
        return noteRepository.findByDevoirId(id_devoir);
    }

    public List<Note> getNotesByValeurBetween(Double min, Double max) {
        return noteRepository.findByValeurBetween(min, max);
    }

    public List<Note> getNotesOrderByValeurAsc() {
        return noteRepository.findByOrderByValeurAsc();
    }

    public List<Note> getNotesOrderByValeurDesc() {
        return noteRepository.findByOrderByValeurDesc();
    }


}