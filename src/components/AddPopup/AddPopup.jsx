import './AddPopup.scss';
import closeImg from '../../img/close-outline.svg';
import React, { useEffect } from 'react';

function AddPopup({ onAddNote, closePopup, editingNote, setEditingNote, setNotes, notes }) {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');

    useEffect(() => {
        if(editingNote) {
            setTitle(editingNote.title);
            setDescription(editingNote.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [editingNote])

    async function handleSubmit(event) {
        event.preventDefault();

        let currentDate = new Date();
        let monthName = currentDate.toLocaleString('default', { month: 'long' });

        const data = {
            title: title,
            description: description,
            month: monthName,
            day: currentDate.getDate(),
            year: currentDate.getFullYear(),
        };

        if(editingNote) {
            const updatedNote = await fetch(`https://672e7521229a881691f01d93.mockapi.io/notes/${editingNote.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            const updatedData = await updatedNote.json();
            setNotes(notes.map(note => note.id === editingNote.id ? updatedData : note))
            setEditingNote(null);
        } else {
            const newNote = await fetch('https://672e7521229a881691f01d93.mockapi.io/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            
            const newNoteData = await newNote.json();
            onAddNote(newNoteData); 
        }

        closePopup();
    }

    return (
    <div className="popup-container">
        <div className="popup">
            <div className="top-content">
                <p className="popup-text">{!editingNote ? `Add a new` : `Edit note`}</p>
                <img onClick={closePopup} className='close' src={closeImg} />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="title">
                    <label>Title</label>
                    <input type="text" value={title} 
                    required className="input-title" 
                    placeholder="Your title..."
                    onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className="description">
                    <label>Description</label>
                    <textarea className="input-description" value={description}
                    required placeholder="Your description..."
                    onChange={(e) => setDescription(e.target.value)} />
                </div>

                <button type='submit' className="popup-add-btn">{!editingNote ? `Add note` : `Accept`}</button>
            </form>
        </div>
    </div>
    );
}

export default AddPopup;