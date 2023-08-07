package com.logaengineering.schoolmanagementbackend.controllers;

import com.logaengineering.schoolmanagementbackend.domains.entities.Note;
import com.logaengineering.schoolmanagementbackend.services.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(value = "http://localhost:3000")
@RestController
@RequestMapping("notes")
public class NoteController {
    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping()
    public ResponseEntity<Note> createNote(@RequestBody Note note) {
        Note newNote = noteService.createNote(note);
        return ResponseEntity.status(HttpStatus.CREATED).body(newNote);
    }

    @GetMapping()
    public ResponseEntity<List<Note>> getAllNotes() {
        List<Note> notes = noteService.getAllNotes();
        return ResponseEntity.ok(notes);
    }

    @GetMapping("{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable Long id) {
        Note note = noteService.getNoteById(id);
        return ResponseEntity.ok(note);
    }


    @PutMapping("{id}")
    public ResponseEntity<Note> updateNote(@PathVariable Long id, @RequestBody Note note) {
        Note updatedNote = noteService.updateNote(id, note);
        return ResponseEntity.ok(updatedNote);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        boolean isDeleted = noteService.deleteNote(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("eleve/{id_eleve}")
    public ResponseEntity<List<Note>> getNotesByEleveId(@PathVariable Long id_eleve) {
        List<Note> notes = noteService.getNotesByEleveId(id_eleve);
        return ResponseEntity.ok(notes);
    }

    @GetMapping("devoir/{id_devoir}")
    public ResponseEntity<List<Note>> getNotesByDevoirId(@PathVariable Long id_devoir) {
        List<Note> notes = noteService.getNotesByDevoirId(id_devoir);
        return ResponseEntity.ok(notes);
    }

    @GetMapping("valeur/{min}/{max}")
    public ResponseEntity<List<Note>> getNotesByValeurBetween(@PathVariable Double min, @PathVariable Double max) {
        List<Note> notes = noteService.getNotesByValeurBetween(min, max);
        return ResponseEntity.ok(notes);
    }

    @GetMapping("valeur/asc")
    public ResponseEntity<List<Note>> getNotesOrderByValeurAsc() {
        List<Note> notes = noteService.getNotesOrderByValeurAsc();
        return ResponseEntity.ok(notes);
    }

    @GetMapping("valeur/desc")
    public ResponseEntity<List<Note>> getNotesOrderByValeurDesc() {
        List<Note> notes = noteService.getNotesOrderByValeurDesc();
        return ResponseEntity.ok(notes);
    }
}
