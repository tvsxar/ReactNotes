import '../App.css';
import React, { useEffect } from 'react'
import NoteItem from './NoteItem'
import AddNote from './AddNote';

function NoteList() {
  const [notes, setNotes] = React.useState([])
  const [isVisible, setIsVisible] = React.useState(false);
  const [editingNote, setEditingNote] = React.useState(null);

  function removeItem(index) {
    setNotes(notes.filter((note, noteIndex) => index !== noteIndex));
  }

  function editItem(note) {
    setEditingNote(note);
    setIsVisible(true);
  }

  return (
    <div className='container'>
      <div className='note-cards'>
      <AddNote setIsVisible={setIsVisible} 
      editingNote={editingNote} setEditingNote={setEditingNote}
      isVisible={isVisible} setNotes={setNotes} notes={notes} />
      {
        notes.map((note, index) => ( 
          <NoteItem removeItem={() => removeItem(index)} 
          editItem={() => editItem(note)}
          key={index} title={note.title}
          description={note.description} day={note.day}
          month={note.month} year={note.year} />)
        )
      }
      </div>
    </div>
  );
}

export default NoteList;
