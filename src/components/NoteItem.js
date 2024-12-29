import '../App.css';
import React from 'react'
import menuImg from '../img/menu-outline.svg';
import closeImg from '../img/close-circle.svg';
import editImg from '../img/pencil-sharp.svg';

function NoteItem({ title, description, month, day, year, removeItem, editItem }) {

  return (
    <section className='card'>
        <div className='note'>
            <h1 className='card-title'>{title}</h1>
            <p className='card-text'>{description}</p>
        </div>

        <div className='bottom-content'>
            <p className='date'>{`${month} ${day}, ${year}`}</p>

            <div className='settings'>
                <img className='settings-btn' src={menuImg} alt='menu' />

                <ul className="menu">
                    <li className="edit-btn" onClick={editItem}><img src={editImg} alt='edit' /><span>Edit</span></li>
                    <li className="remove-btn" onClick={removeItem}><img src={closeImg} alt='remove' /><span>Remove</span></li>
                </ul>
            </div>
        </div>
    </section>
  );
}

export default NoteItem;
