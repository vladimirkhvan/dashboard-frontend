import React from 'react';

import { Authentication } from '../layoutPages/Authentication';
import { LoginForm } from '../components/LoginForm';

export const Login = () => {
    return (
        <Authentication>
            <LoginForm />
        </Authentication>
    );
};
