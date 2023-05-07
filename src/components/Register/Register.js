import React from 'react';
import AuthWithForm from '../AuthWithForm/AuthWithForm';

export default function Register() {
    return (
        <AuthWithForm
            title="Добро пожаловать!"
            buttonTitle="Зарегистрироваться"
            textQuestion="Уже зарегистрированы?"
            linkTitle="Войти"
            link="/signin">
            <label className="auth-form__field">Имя
                <input className="auth-form__input" type="text" defaultValue="Виталий" />
            </label>
        </AuthWithForm>
    );
}