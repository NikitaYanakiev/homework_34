import './Header.css'

function Header({currentPage, goBack, goToAddContacts, isEditing  }) {
    let title = '';
    if (currentPage === 'contacts') {
        title = 'Contact List'
    } else if ((currentPage === 'addContacts')) {
        title = isEditing ? 'Edit Contact' : 'Add Contacts';
    }
    
    return (
        <header className="header text-bg-primary">
            <h1 className="header__title display-6">{title}</h1>
            {currentPage === 'addContacts' && (
                <i className="fa-solid fa-arrow-left" onClick={goBack}></i>
            )}
            {currentPage === 'contacts' && (
                <i className="fa-solid fa-user-plus" onClick={goToAddContacts}></i>
            )}
        </header>
    );
}

export default Header;