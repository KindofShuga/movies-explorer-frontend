import React from 'react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                <nav className="footer__navigation">
                    <p className="footer__copyright">© 2023</p>
                    <ul className="footer__column-links">
                        <li className="footer__column-link">
                            <a className="footer__link" href="https://practicum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
                        </li>
                        <li className="footer__column-link">
                            <a className="footer__link" href="https://github.com/KindofShuga" target="_blank" rel="noreferrer">Github</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};