import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import ContactList from "../ContactList/ContactList";
import AddContactForm from "../AddContactForm/AddContactForm";
import "./App.css";

function App() {
    const [contacts, setContacts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    useEffect(() => {
        const localContacts = JSON.parse(localStorage.getItem("contacts"));
        if (!localContacts) {
            fetch("https://jsonplaceholder.typicode.com/users")
                .then((response) => response.json())
                .then((result) => {
                    localStorage.setItem("contacts", JSON.stringify(result));
                    setContacts(result);
                    setLoaded(true);
                })
        } else {
            setContacts(localContacts);
            setLoaded(true);
        }
    }, []);

    function handleGoBack() {
        setSelectedContact(null);
    }
    function handleAddOrUpdateContact(contact) {
        let updatedContacts;
    
        if (selectedContact) {
            updatedContacts = contacts.map((currentContact) => {
                if (currentContact.id === contact.id) {
                    return contact; 
                } else {
                    return currentContact; 
                }
            });
        } else {
            updatedContacts = [...contacts, contact]; 
        }
    
        setContacts(updatedContacts);
        localStorage.setItem("contacts", JSON.stringify(updatedContacts));
        setSelectedContact(null);
    }
    

    if (!loaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
            <div className="container">
                <BrowserRouter>
                    <Header handleGoBack={handleGoBack} />
                    <Routes>
                        <Route
                            path="/homework_34"
                            element={
                                <ContactList
                                    contacts={contacts}
                                    setContacts={setContacts}
                                    onEdit={(contact) =>
                                        setSelectedContact(contact)
                                    }
                                />
                            }
                        />
                        <Route
                            path="/add"
                            element={
                                <AddContactForm
                                    selectedContact={selectedContact}
                                    onAdd={handleAddOrUpdateContact}
                                    onCancel={handleGoBack}
                                />
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
