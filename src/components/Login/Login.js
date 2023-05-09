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
            <label className="auth-form__field">E-mail
                <input className="auth-form__input" type="text" defaultValue="pochta@yandex.ru" required />
            </label>
            <label className="auth-form__field">Пароль
                <input className="auth-form__input" type="password" defaultValue="123ss231wsW" required />
            </label>
        </AuthWithForm>
    );
}