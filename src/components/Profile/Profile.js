import React from 'react';
import { Link } from "react-router-dom";
import Header from '../Header/Header';
import './Profile.css';

export default function Profile() {
    return (
        <>
            <Header loggedIn={true} />
            <main>
                <section className="profile">
                    <div className="profile__container">
                        <h2 className="profile__title">Привет, Виталий!</h2>
                        <form className="profile__form" >
                            <label className="profile__field">Имя
                                <input className="profile__input" type="text" defaultValue="Виталий" />
                            </label>
                            <label className="profile__field">E-mail
                                <input className="profile__input" type="text" defaultValue="pochta@yandex.ru" />
                            </label>
                        </form>
                        <button className="profile__edit-btn" type="submit">Редактировать</button>
                        <Link className="profile__exit-btn" to="/">Выйти из аккаунта</Link>
                    </div>
                </section>
            </main>
        </>
    );
}