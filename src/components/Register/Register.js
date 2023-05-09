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
                <input className="auth-form__input" type="text" minLength="2" maxLength="40" defaultValue="Виталий" required />
                <span className="auth-form__input-err"></span>
            </label>
            <label className="auth-form__field">E-mail
                <input className="auth-form__input" type="text" defaultValue="pochta@yandex.ru" required/>
                <span className="auth-form__input-err"></span>
            </label>
            <label className="auth-form__field">Пароль
                <input className="auth-form__input auth-form__input_err" type="password" defaultValue="123ss231wsW" required />
                <span className="auth-form__input-err">Что-то пошло не так...</span>
            </label>
        </AuthWithForm>
    );
}