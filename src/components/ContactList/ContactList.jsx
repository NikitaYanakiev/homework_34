import { useState } from 'react';
import ContactListItem from '../ContactListItem/ContactListItem';

import './ContactList.css';

function ContactList({ onEdit }) {
    const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem('contacts')) || []);

    function deleteContact(id) {
        const updatedContacts = contacts.filter(contact => contact.id !== id);
        setContacts(updatedContacts);
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    }
    let elements;
    if (contacts.length > 0) {
        elements = contacts.map(contact => (
            <ContactListItem 
                key={contact.id} 
                id={contact.id} 
                name={contact.name} 
                surname={contact.username}
                phone={contact.phone} 
                onDelete={deleteContact} 
                onEdit={onEdit}
            />
        ));
    } else {
        elements = 
        <tr>
            <td colSpan="4" className='empty'>Empty List</td>
        </tr>
    }

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th className='col-title' scope="col">Name</th>
                    <th className='col-title' scope="col">Surname</th>
                    <th className='col-title' scope="col">Phone</th>
                    <th className='col-title' scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {elements}
            </tbody>
        </table>
    );
}

export default ContactList;