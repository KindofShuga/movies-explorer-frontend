import React from 'react';
import './AboutProject.css';

export default function AboutProject() {
    return (
        <section className="about-project">
            <h2 className="about-project__title">О проекте</h2>
            <div className="about-project__container">
                <div className="about-project__info">
                    <h3 className="about-project__info-heading">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__info-text">
                        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                    </p>
                </div>
                <div className="about-project__info">
                    <h3 className="about-project__info-heading">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__info-text">
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </div>
            </div>
            <div className="about-project__time">
                <p className="about-project__time-title about-project__time-title_blue">1 неделя</p>
                <p className="about-project__time-title">4 недели</p>
                <p className="about-project__time-description">Back-end</p>
                <p className="about-project__time-description">Front-end</p>
            </div>
        </section>
    );
}