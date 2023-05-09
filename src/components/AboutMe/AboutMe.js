import React from 'react';
import './AboutMe.css';
import studentPhoto from '../../images/student-photo.jpg';

export default function AboutMe() {
    return (
        <section className="about-me">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__container">
                <div>
                    <h3 className="about-me__heading">Алина</h3>
                    <h4 className="about-me__description">Фронтенд-разработчик, 22 года</h4>
                    <p className="about-me__bio">Окончив среднее основное образование, приняла решение получать опыт в компаниях. 
                    Закончив школу в маленьком городке, перебралась в Ростов-на-Дону, спустя год проживания там — в Краснодар, 
                    где в последствии нашла мою текущую компанию («Leader Consult Group» с 2020г.), связанную с кадровым делопроизводством. 
                    На этом этапе останавливаться не хотелось, так как имею постоянное желание развиваться. 
                    Уведомив работодателя, что переезжаю в Санкт-Петербург, меня утвердили в головной офис, где по сей день работаю. 
                    Понимая, что достигла предела навыков, решила учиться новой сфере, к которой ранее немного прикасалась. 
                    Прошла курс веб-разработчика от Практикума, и после совершенствуюсь в «бездонной» области программирования 😉</p>
                    <a className="about-me__link" href='https://github.com/KindofShuga' target="_blank" rel="noreferrer">Github</a>
                </div>
                <img className="about-me__photo" src={studentPhoto} alt="Фото студента" />
            </div>
        </section>
    );
}