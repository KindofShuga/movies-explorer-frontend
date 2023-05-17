import React from 'react';
import AuthWithForm from '../AuthWithForm/AuthWithForm';
import { useFormWithValidation } from "../../utils/validation";

export default function Register({ isLoading, handleRegister }) {
    const { values, handleChange, errors, isValid } = useFormWithValidation();

    function handleSubmit(e) {
        e.preventDefault();
        handleRegister(values)
    }

    return (
        <AuthWithForm
            isLoading={isLoading}
            title="Добро пожаловать!"
            buttonTitle="Зарегистрироваться"
            textQuestion="Уже зарегистрированы?"
            linkTitle="Войти"
            link="/signin"
            onSubmit={handleSubmit}
            isValid={isValid}
        >
            <label className="auth-form__field">Имя
                <input
                    className={`auth-form__input ${errors.name ? "auth-form__input_err" : ""}`}
                    type="text"
                    pattern="^[А-Яа-яЁёa-zA-Z\s\-]+$"
                    minLength="2"
                    maxLength="40"
                    required
                    onChange={handleChange}
                    name="name"
                    value={values.name || ""}
                />
                <span className="auth-form__input-err">{errors.name && "Поле может содержать только латиницу, кириллицу, пробел или дефис."}</span>
            </label>
            <label className="auth-form__field">E-mail
                <input
                    className={`auth-form__input ${errors.email ? "auth-form__input_err" : ""}`}
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={values.email || ""}
                />
                <span className="auth-form__input-err">{errors.email}</span>
            </label>
            <label className="auth-form__field">Пароль
                <input
                    className={`auth-form__input ${errors.password ? "auth-form__input_err" : ""}`}
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={values.password || ""}
                />
                <span className="auth-form__input-err">{errors.password}</span>
            </label>
        </AuthWithForm>
    );
}