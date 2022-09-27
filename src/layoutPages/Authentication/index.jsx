import React from 'react';
import { Link } from 'react-router-dom';

import style from './Authentication.module.scss'

import character from '../../assets/images/character.png'

import { Header } from '../../components/Header';

export const Authentication = (props) => {
    return (
        <div className={style.authentication}>
            <Header isAuthorized={false}/>
            <main>
                <div className={style.infoBlock}>
                    <h1>Sign In to <br/>Manage Dashboard</h1>
                    <p className={style.hideSmall}>if you don’t an account <br/>you can <Link to='/registration'>Register here!</Link></p>
                </div>
                <img src={character} alt="character" width={545} className={`${style.hideSmall} ${style.character}`}/>
                
                {props.children}
            </main>
        </div>
    );
};
