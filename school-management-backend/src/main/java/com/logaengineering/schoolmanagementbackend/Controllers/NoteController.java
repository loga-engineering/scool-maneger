package com.logaengineering.schoolmanagementbackend.Controllers;

import com.logaengineering.schoolmanagementbackend.Models.Entities.Note;
import com.logaengineering.schoolmanagementbackend.Services.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(value = "http://localhost:3000")
@RestController
@RequestMapping("/school-management")
public class NoteController {
    @Autowired
    private NoteService noteService;

    @PostMapping("/notes")
    public ResponseEntity<Note> createNote(@RequestBody Note note) {
        Note newNote = noteService.createNote(note);
        return ResponseEntity.status(HttpStatus.CREATED).body(newNote);
    }

    @GetMapping("/notes")
    public ResponseEntity<List<Note>> getAllNotes() {
        List<Note> notes = noteService.getAllNotes();
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/notes/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable Long id) {
        Note note = noteService.getNoteById(id);
        return ResponseEntity.ok(note);
    }


    @PutMapping("/notes/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable Long id, @RequestBody Note note) {
        Note updatedNote = noteService.updateNote(id, note);
        return ResponseEntity.ok(updatedNote);
    }

    @DeleteMapping("/notes/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        boolean isDeleted = noteService.deleteNote(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/notes/eleve/{id_eleve}")
    public ResponseEntity<List<Note>> getNotesByEleveId(@PathVariable Long id_eleve) {
        List<Note> notes = noteService.getNotesByEleveId(id_eleve);
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/notes/devoir/{id_devoir}")
    public ResponseEntity<List<Note>> getNotesByDevoirId(@PathVariable Long id_devoir) {
        List<Note> notes = noteService.getNotesByDevoirId(id_devoir);
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/notes/valeur/{min}/{max}")
    public ResponseEntity<List<Note>> getNotesByValeurBetween(@PathVariable Double min, @PathVariable Double max) {
        List<Note> notes = noteService.getNotesByValeurBetween(min, max);
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/notes/valeur/asc")
    public ResponseEntity<List<Note>> getNotesOrderByValeurAsc() {
        List<Note> notes = noteService.getNotesOrderByValeurAsc();
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/notes/valeur/desc")
    public ResponseEntity<List<Note>> getNotesOrderByValeurDesc() {
        List<Note> notes = noteService.getNotesOrderByValeurDesc();
        return ResponseEntity.ok(notes);
    }
}
