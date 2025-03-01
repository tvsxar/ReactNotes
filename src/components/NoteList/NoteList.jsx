import './NoteList.scss';
import React, { useEffect } from 'react'
import NoteItem from '../NoteItem/NoteItem'
import AddNote from '../AddNote/AddNote';

function NoteList() {
  const [notes, setNotes] = React.useState([])
  const [isVisible, setIsVisible] = React.useState(false);
  const [editingNote, setEditingNote] = React.useState(null);

  // retrieve notes from mockapi.io
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('https://672e7521229a881691f01d93.mockapi.io/notes');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setNotes(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchNotes();
  }, [])

  function removeItem(id) {
    try {
      fetch(`https://672e7521229a881691f01d93.mockapi.io/notes/${id}`, {
        method: 'DELETE',
      });

      setNotes(notes.filter(note => id !== note.id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
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
        notes.map((note) => ( 
          <NoteItem removeItem={() => removeItem(note.id)} 
          editItem={() => editItem(note)}
          key={note.id} title={note.title}
          description={note.description} day={note.day}
          month={note.month} year={note.year} />)
        )
      }
      </div>
    </div>
  );
}

export default NoteList;
