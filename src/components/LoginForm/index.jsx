import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import style from './LoginForm.module.scss';

import clearIcon from '../../assets/images/clear.svg';

import { clearField } from '../../utils/clearField';
import { handleChange } from '../../utils/handleChange';

export const LoginForm = () => {
    const [userInfo, setUserInfo] = React.useState({
        email: '',
        password: '',
    });

    const [isLoginError, setIsLoginError] = React.useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(`http://khvan-vladimir-dashboard.herokuapp.com/users/login`, {
                email: userInfo.email,
                password: userInfo.password,
            });
            window.localStorage.setItem('token', data.token);
            window.localStorage.setItem('id', data.id);
            window.localStorage.setItem('username', data.username);
            navigate('/');
        } catch (error) {
            setIsLoginError(true)
            console.log(error);
        }
    };

    return (
        <div>
            <h2>Sign in</h2>
            <form onSubmit={handleLogin} className={style.loginForm}>
                <div>
                    <input
                        type="email"
                        name="email"
                        onChange={(e) => handleChange(e, setUserInfo)}
                        value={userInfo.email}
                        placeholder="email"
                        required
                    />
                    <img src={clearIcon} alt="clear" onClick={() => clearField('email', setUserInfo)} />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        onChange={(e) => handleChange(e, setUserInfo)}
                        value={userInfo.password}
                        placeholder="password"
                        autoComplete="current-password"
                        required
                    />
                    <img src={clearIcon} alt="clear" onClick={() => clearField('password', setUserInfo)} />
                </div>

                <p className={`${style.errorMessage} ` + (isLoginError ? '' : `${style.hide}`)}>
                    Email or password are not matching. Try again
                </p>

                <button type="submit">Login</button>
            </form>
        </div>
    );
};
