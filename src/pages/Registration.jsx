import React from 'react';

import { RegistrationForm } from '../components/RegistrationForm';
import { Authentication } from '../layoutPages/Authentication';

export const Registration = () => {
    return (
        <Authentication>
            <RegistrationForm />
        </Authentication>
    );
};
