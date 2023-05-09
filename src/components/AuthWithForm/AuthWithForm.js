import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../../images/logo-icon.svg';
import './AuthWithForm.css';

export default function AuthWithForm(props) {
    return (
        <>
            <main>
                <section className="auth-form">
                    <div className="auth-form__container">
                        <Link to="/" className="auth-form__logo-link">
                            <img className="auth-form__logo" src={logoImage} alt="Логотип" />
                        </Link>
                        <h2 className="auth-form__title">{props.title}</h2>
                        <form className="auth-form__form">
                            {props.children}
                        </form>
                        <button className="auth-form__submit-btn" type="submit">{props.buttonTitle}</button>
                        <p className="auth-form__text">{props.textQuestion}
                            <Link className="auth-form__link" to={props.link}>{props.linkTitle}</Link>
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
}