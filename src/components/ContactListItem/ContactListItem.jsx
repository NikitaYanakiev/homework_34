import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './ContactListItem.css';

function ContactListItem({ name, surname, phone, id, onDelete, onEdit }) {
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    phone = phone.replace(/\s\w{1,}$/, '');
    phone = phone.replace(/\./g, '-');

    function handleDelete() {
        setModalOpen(true);
    }

    function confirmDelete() {
        onDelete(id);
        setModalOpen(false);
    }

    function cancelDelete() {
        setModalOpen(false);
    }

    function handleEdit() {
        onEdit({ id, name, surname, phone });
        navigate('/add');
    }

    return (
        <tr>
            <td className='contact__item'>{name}</td>
            <td className='contact__item'>{surname}</td>
            <td className='contact__item'>{phone}</td>
            <td>
                <div className='d-flex justify-content-center align-items-center'>
                    <button 
                        type="button" 
                        className="btn-edit btn-sm" 
                        onClick={handleEdit}>
                        <i className="fa-solid fa-pen"></i>
                    </button>
                    <button 
                        type="button" 
                        className="btn-trash btn-sm" 
                        onClick={handleDelete}>
                        <i className="fas fa-trash"></i>
                    </button>
                </div>

                {modalOpen && (
                    <div className={`modal-overlay ${modalOpen ? 'show' : ''}`}>
                        <div className="modal-delete">
                            <p className='modal-text'>Удалить?</p>
                            <i className="fa-solid fa-circle-xmark" onClick={cancelDelete}></i>
                            <div className="modal-btns">
                                <button 
                                    type="button" 
                                    className="btn-delete btn btn-danger" 
                                    onClick={confirmDelete}>Удалить</button>
                                <button 
                                    type="button" 
                                    className="btn-cancel btn btn-secondary" 
                                    onClick={cancelDelete}>Отмена</button>
                            </div>
                        </div>
                    </div>
                )}
            </td>
        </tr>
    );
}

export default ContactListItem;
