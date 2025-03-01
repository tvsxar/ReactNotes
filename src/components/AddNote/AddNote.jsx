import './AddNote.scss';
import React from 'react';
import AddPopup from '../AddPopup/AddPopup'
import addImg from '../../img/add-circle-outline.svg';

function AddNote({ setNotes, isVisible, setIsVisible, editingNote, setEditingNote, notes }) {

    function openPopup() {
        setIsVisible(true);
    }

    function closePopup() {
        setEditingNote(null); 
        setIsVisible(false);
    }

    function onAddNote(data) {
        setNotes(prev => [...prev, data]);
    }

    return (
      <div>
        {isVisible && <AddPopup onAddNote={onAddNote} setNotes={setNotes}
        closePopup={closePopup} setIsVisible={setIsVisible} notes={notes}
        editingNote={editingNote} setEditingNote={setEditingNote} />}
        <div className="card add-card-btn" onClick={openPopup}>
            <img className='add-btn' src={addImg} alt='add' />
            <p className="add-text">Add new note</p>
        </div>
      </div>
    );
}

export default AddNote;