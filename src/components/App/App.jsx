import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import ContactList from '../ContactList/ContactList';
import AddContactForm from '../AddContactForm/AddContactForm';

import './App.css';

function App() {
    const [currentPage, setCurrentPage] = useState('contacts');
    const [selectedContact, setSelectedContact] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const localContacts = JSON.parse(localStorage.getItem('contacts'));
        if (!localContacts) {
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(response => response.json())
                .then(result => {
                    localStorage.setItem('contacts', JSON.stringify(result));
                    setContacts(result);
                    setLoaded(true);
                })
                .catch(error => {
                    console.error('Error fetching contacts:', error);
                    setLoaded(true);
                });
        } else {
            setContacts(localContacts);
            setLoaded(true);
        }
    }, []);

    function handleEditContact(contact) {
        setCurrentPage('addContacts');
        setSelectedContact(contact);
        setIsEditing(true);
    }

    function handleGoBack() {
        setCurrentPage('contacts');
        setSelectedContact(null); 
        setIsEditing(false);
    }

    function handleGoToAddContacts() {
        setCurrentPage('addContacts');
        setSelectedContact(null); 
        setIsEditing(false);
    }

    if (!loaded) {
        return <div>Empty</div>;
    }

    return (
        <div className="App">
            <div className="container">
                <Header 
                    currentPage={currentPage} 
                    goBack={handleGoBack} 
                    goToAddContacts={handleGoToAddContacts}
                    isEditing={isEditing}
                />
                {currentPage === 'contacts' && <ContactList contacts={contacts} onEdit={handleEditContact}/>}
                {currentPage === 'addContacts' && <AddContactForm selectedContact={selectedContact} onAdd={handleGoBack}/>}
            </div>
        </div>
    );
}

export default App;
