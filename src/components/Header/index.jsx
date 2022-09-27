import React from 'react';

import { Link } from 'react-router-dom';

import style from './Header.module.scss';

export const Header = ({ isAuthorized }) => {
    const handleLogout = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('id');
        window.localStorage.removeItem('username');
    };

    const [username, setUsername] = React.useState('');

    React.useEffect(() => {
        if (isAuthorized) {
            console.log(window.localStorage.getItem('username'))
            setUsername(window.localStorage.getItem('username'));
        }
    }, []);

    return (
        <header>
            {isAuthorized ? (
                <>
                    <p className={style.user}>Hi, {username}</p>
                    <Link to="/login" className={style.register} onClick={handleLogout}>
                        Logout
                    </Link>
                </>
            ) : (
                <>
                    <Link to="/login" className={style.login}>
                        Sign In
                    </Link>
                    <Link to="/registration" className={style.register}>
                        Register
                    </Link>
                </>
            )}
        </header>
    );
};
