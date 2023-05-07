import React from 'react';
import AuthWithForm from '../AuthWithForm/AuthWithForm';

export default function Login() {
    return (
        <AuthWithForm
            title="Рады видеть!"
            buttonTitle="Войти"
            textQuestion="Ещё не зарегистрированы?"
            linkTitle="Регистрация"
            link="/signup">
        </AuthWithForm>
    );
}