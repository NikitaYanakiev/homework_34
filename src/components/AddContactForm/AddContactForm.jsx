import { useState, useEffect } from 'react';

import './AddContactForm.css';

function AddContactForm({ selectedContact, onAdd }) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [nameValid, setNameValid] = useState(true);
    const [surnameValid, setSurnameValid] = useState(true);
    const [phoneValid, setPhoneValid] = useState(true);

    useEffect(() => {
        if (selectedContact) {
            setName(selectedContact.name);
            setSurname(selectedContact.surname);
            setPhone(selectedContact.phone);
        } else {
            setName('');
            setSurname('');
            setPhone('');
        }
        setNameValid(true);
        setSurnameValid(true);
        setPhoneValid(true);
    }, [selectedContact]);

    function handleNameChange(e) {
        setName(e.target.value);
        setNameValid(true);
    }

    function handleSurnameChange(e) {
        setSurname(e.target.value);
        setSurnameValid(true);
    }

    function handlePhoneChange(e) {
        const input = e.target.value;
        const filteredInput = input.replace(/[^0-9+()-]/g, '');
        setPhone(filteredInput);
        setPhoneValid(true);
    }

    function addContact() {
        if (!name) {
            setNameValid(false);
            return;
        }
        if (!surname) {
            setSurnameValid(false);
            return;
        }
        if (!phone) {
            setPhoneValid(false);
            return;
        }

        let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        const lastId = contacts.length > 0 ? contacts[contacts.length - 1].id : 0;
        const id = selectedContact ? selectedContact.id : lastId + 1;

        const contact = {
            id,
            name,
            username: surname,
            phone
        };

        if (selectedContact) {
            const updatedContacts = contacts.map(item => (item.id === id ? contact : item));
            localStorage.setItem('contacts', JSON.stringify(updatedContacts));
        } else {
            contacts.push(contact);
            localStorage.setItem('contacts', JSON.stringify(contacts));
        }

        setName('');
        setSurname('');
        setPhone('');
        setNameValid(true);
        setSurnameValid(true);
        setPhoneValid(true);
        onAdd();
    }

    return (
        <form className="form  needs-validation">
            <div className="row mb-3">
                <div className="col">
                    <label 
                        htmlFor="form__name" 
                        className="form-label">Name</label>
                    <input 
                        value={name} 
                        onChange={handleNameChange} 
                        type="text" 
                        className={`form-control ${nameValid ? '' : 'is-invalid'}`} required />
                    <div className="invalid-feedback">
                        Please enter a name
                    </div>
                </div>
                <div className="col">
                    <label 
                        htmlFor="form__surname" 
                        className="form-label">Surname</label>
                    <input 
                        value={surname} 
                        onChange={handleSurnameChange} 
                        type="text" 
                        className={`form-control ${surnameValid ? '' : 'is-invalid'}`} required />
                    <div className="invalid-feedback">
                        Please enter a surname
                    </div>
                </div>
            </div>
            <div className="mb-3">
                <label 
                    htmlFor="form__phone" 
                    className="form-label">Phone number</label>
                <input 
                    value={phone} 
                    onChange={handlePhoneChange} 
                    type="text" 
                    className={`form-control ${phoneValid ? '' : 'is-invalid'}`} required />
                <div className="invalid-feedback">
                    Please enter phone number
                </div>
            </div>

            <div className="form__buttons d-flex justify-content-evenly">
                <button
                    type='button'
                    className="form__add-button button__contact btn btn-success"
                    onClick={addContact}>Save</button>
                <button
                    type='button'
                    className="form__cancel-button button__add btn btn-danger"
                    onClick={onAdd}>Cancel</button>
            </div>
        </form>
    );
}

export default AddContactForm;
