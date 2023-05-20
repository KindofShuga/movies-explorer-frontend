import React from 'react';
import { Link } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import logoImage from '../../images/logo-icon.svg';
import './AuthWithForm.css';

export default function AuthWithForm(props) {
    return (
        <main>
            <section className="auth-form">
                {props.isLoading ?
                    <Preloader />
                    :
                    <div className="auth-form__container">
                        <Link to="/" className="auth-form__logo-link">
                            <img className="auth-form__logo" src={logoImage} alt="Логотип" />
                        </Link>
                        <h2 className="auth-form__title">{props.title}</h2>
                        <form className="auth-form__form" onSubmit={props.onSubmit}>
                            {props.children}
                            <button
                                className={`auth-form__submit-btn ${!props.isValid ? "auth-form__submit-btn_inactive" : ""}`}
                                type="submit">{props.buttonTitle}
                            </button>
                            <p className="auth-form__text">{props.textQuestion}
                                <Link className="auth-form__link" to={props.link}>{props.linkTitle}</Link>
                            </p>
                        </form>
                    </div>
                }
            </section>
        </main>
    );
}