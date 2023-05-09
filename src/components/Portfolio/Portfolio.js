import React from 'react';
import './Portfolio.css';

export default function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <nav className="portfolio__navigation">
                <a className="portfolio__link" href='https://kindofshuga.github.io/how-to-learn/' target="_blank" rel="noreferrer">
                    <p className="portfolio__text">Статичный сайт</p>
                    <p className="portfolio__arrow">↗</p>
                </a>
                <a className="portfolio__link" href='https://kindofshuga.github.io/russian-travel/' target="_blank" rel="noreferrer">
                    <p className="portfolio__text">Адаптивный сайт</p>
                    <p className="portfolio__arrow">↗</p>
                </a>
                <a className="portfolio__link" href='https://kindofshuga.github.io/mesto-react/' target="_blank" rel="noreferrer">
                    <p className="portfolio__text">Одностраничное приложение</p>
                    <p className="portfolio__arrow">↗</p>
                </a>
            </nav>
        </section>
    );
}   