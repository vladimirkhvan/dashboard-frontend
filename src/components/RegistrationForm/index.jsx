import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import style from './RegistrationForm.module.scss';

import clearIcon from '../../assets/images/clear.svg';

import { clearField } from '../../utils/clearField';
import { handleChange } from '../../utils/handleChange';

export const RegistrationForm = () => {
    const [userInfo, setUserInfo] = React.useState({
        username: '',
        email: '',
        password: '',
        confirmationPassword: '',
    });

    const [isExist, setIsExist] = React.useState(false);

    const hideStyle = userInfo.password === userInfo.confirmationPassword ? `${style.hide}` : '';

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('khvan-vladimir-dashboard.herokuapp.com/users', userInfo);
            navigate('/login');
        } catch (error) {
            if (error.response.status === 409) {
                setIsExist(true);
            }
            console.log(error);
        }
    };

    return (
        <div>
            <h2>Registration</h2>
            <form onSubmit={handleRegister} className={style.registrationForm}>
                <div className={style.username}>
                    <input
                        type="text"
                        name="username"
                        onChange={(e) => handleChange(e, setUserInfo)}
                        value={userInfo.username}
                        placeholder="Enter name"
                        required
                    />
                    <img src={clearIcon} alt="clear" onClick={() => clearField('username', setUserInfo)} />
                </div>
                <div className={style.email}>
                    <input
                        type="email"
                        name="email"
                        onChange={(e) => handleChange(e, setUserInfo)}
                        value={userInfo.email}
                        placeholder="Enter email"
                        required
                    />
                    <img src={clearIcon} alt="clear" onClick={() => clearField('email', setUserInfo)} />
                </div>
                <div className={style.password}>
                    <input
                        type="password"
                        name="password"
                        onChange={(e) => handleChange(e, setUserInfo)}
                        value={userInfo.password}
                        placeholder="Enter password"
                        autoComplete="current-password"
                        required
                    />
                    <img src={clearIcon} alt="clear" onClick={() => clearField('password', setUserInfo)} />
                </div>
                <div className={style.password}>
                    <input
                        type="password"
                        name="confirmationPassword"
                        onChange={(e) => handleChange(e, setUserInfo)}
                        value={userInfo.confirmationPassword}
                        placeholder="Confirm password"
                        autoComplete="current-password"
                        required
                    />
                    <img
                        src={clearIcon}
                        alt="clear"
                        onClick={() => clearField('confirmationPassword', setUserInfo)}
                    />
                </div>
                <p className={`${style.errorMessage} ` + hideStyle}>Passwords are not matching</p>
                <p className={`${style.errorMessage} ` + (isExist ? ' ' : ` ${style.hide}`)}>
                    Email exists in database
                </p>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};
