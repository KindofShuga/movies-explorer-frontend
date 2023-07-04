import React from 'react';
import AuthWithForm from '../AuthWithForm/AuthWithForm';
import { useFormWithValidation } from "../../utils/validation";

export default function Login({ isLoading, handleLogin }) {
    const { values, handleChange, errors, isValid } = useFormWithValidation();

    function handleSubmit(e) {
        e.preventDefault();
        handleLogin(values)
    }

    return (
        <AuthWithForm
            isLoading={isLoading}
            title="Рады видеть!"
            buttonTitle="Войти"
            textQuestion="Ещё не зарегистрированы?"
            linkTitle="Регистрация"
            link="/signup"
            onSubmit={handleSubmit}
            isValid={isValid}
        >
            <label className="auth-form__field">E-mail
                <input
                    className={`auth-form__input ${errors.email ? "auth-form__input_err" : ""}`}
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={values.email || ""}
                />
                <span className="auth-form__input-err">{errors.email && "Введён неккоректный email"}</span>
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