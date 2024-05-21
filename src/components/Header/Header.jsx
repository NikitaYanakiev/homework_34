import { useNavigate, useLocation } from "react-router-dom";
import './Header.css';

function Header({handleGoBack}) {
    const navigate = useNavigate();
    const location = useLocation();

    const isContactListPage = location.pathname === '/homework_34';
    const isAddPage = location.pathname === '/add';


    function goBack() {
        navigate('/homework_34');
        handleGoBack();
    }

    return (
        <header className="header text-bg-primary">
            <h1 className="header__title display-6">{isAddPage ? 'Add Contact' : 'Contacts'}</h1>
            {isContactListPage && (
                <i className="fa-solid fa-user-plus" onClick={() => navigate('/add')}></i>
            )}
            {isAddPage && (
                <i className="fa-solid fa-arrow-left" onClick={goBack}></i>
            )}
        </header>
    );
}

export default Header;
