import React from 'react';
import { Link, NavLink } from "react-router-dom";
import headerLogo from '../../images/logo-icon.svg';
import accountImg from '../../images/account-icon.svg';
import './Header.css';

export default function Header({ loggedIn }) {
    const setNavLinkClass = ({ isActive }) => isActive ? "header__nav-link header__nav-link_active" : "header__nav-link";
    return (
        <header className="header">
            {!loggedIn &&
                <>
                    <img src={headerLogo} alt="Логотип" className="header__logo" />
                    <nav className="header__nav">
                        <Link to="/signup" className="header__link">Регистрация</Link>
                        <Link to="/signin" className="header__link header__link_blue">Войти</Link>
                    </nav>
                </>
            }
            {loggedIn &&
                <>
                    <input type="checkbox" id="check" />
                    <Link to="/">
                        <img src={headerLogo} alt="Логотип" className="header__logo" />
                    </Link>
                    <label htmlFor="check" className="header__fa-bars" />
                    <div className="header__overlay" />
                    <nav className="header__menu">
                        <div className="header__links-container">
                            <NavLink to="/" className={setNavLinkClass} id="home-link">Главная</NavLink>
                            <NavLink to="/movies" className={setNavLinkClass}>Фильмы</NavLink>
                            <NavLink to="/saved-movies" className={setNavLinkClass}>Сохранённые фильмы</NavLink>
                        </div>
                        <Link to="/profile" className="header__account-container">
                            <img className="header__account-img" src={accountImg} alt="Аккаунт" />
                            <p className="header__account-text">Аккаунт</p>
                        </Link>
                    </nav>
                </>
            }
        </header>
    );
};