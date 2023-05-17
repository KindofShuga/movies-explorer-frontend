import React, { useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Preloader from '../Preloader/Preloader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from "../../utils/validation";
import Header from '../Header/Header';
import './Profile.css';

export default function Profile({ isLoading, loggedIn, onUpdateUser }) {
    const navigate = useNavigate();
    const { values, handleChange, errors, isValid, resetForm, setIsValid } = useFormWithValidation();
    const currentUser = useContext(CurrentUserContext);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser(values);
    }

    function signOut() {
        localStorage.removeItem("jwt");
        localStorage.removeItem('movies');
        localStorage.removeItem('saved-movies');
        navigate('/');
    }

    useEffect(() => {
        if (currentUser.name === values.name && currentUser.email === values.email) {
            setIsValid(false)
        }
    }, [values]);

    useEffect(() => {
        resetForm(currentUser);
        values.name = currentUser.name;
        values.email = currentUser.email;
    }, [currentUser]);
    return (
        <>
            {isLoading ?
                <Preloader />
                :
                <>
                    <Header loggedIn={loggedIn} />
                    <main>
                        <section className="profile">
                            <div className="profile__container">
                                <h2 className="profile__title">Привет, {currentUser.name}!</h2>
                                <form className="profile__form" onSubmit={handleSubmit}>
                                    <label className="profile__field">Имя
                                        <input
                                            className={`profile__input ${errors.name ? "profile__input_err" : ""}`}
                                            type="text"
                                            pattern="^[А-Яа-яЁёa-zA-Z\s\-]+$"
                                            required
                                            value={values.name || ""}
                                            onChange={handleChange}
                                            name="name"
                                        />
                                        <span className="profile__input-err">{errors.name && "Поле может содержать только латиницу, кириллицу, пробел или дефис."}</span>
                                    </label>
                                    <label className="profile__field">E-mail
                                        <input
                                            className={`profile__input ${errors.email ? "profile__input_err" : ""}`}
                                            type="email"
                                            required
                                            value={values.email || ""}
                                            onChange={handleChange}
                                            name="email"
                                        />
                                        <span className="profile__input-err">{errors.email}</span>
                                    </label>
                                    <button className={`profile__edit-btn ${!isValid ? "profile__edit-btn_inactive" : ""}`} type="submit">Редактировать</button>
                                </form>
                                <Link className="profile__exit-btn" to="/signin" onClick={signOut}>Выйти из аккаунта</Link>
                            </div>
                        </section>
                    </main>
                </>
            }
        </>
    );
}