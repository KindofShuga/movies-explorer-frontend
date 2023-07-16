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
                    Закончив школу в маленьком городке, перебралась в Ростов-на-Дону, спустя год &mdash; в Краснодар,
                    где в последствии нашла мою текущую компанию (&laquo;Leader Consult Group&raquo; с 2020г.),
                    связанную с кадровым делопроизводством.<br/>
                    На этом этапе останавливаться не хотелось, люблю постоянное развитие.<br/>
                    Приняла решение о переезде в Санкт-Петербург, после чего меня утвердили в головной офис, где по сей день работаю.<br/><br/>
                    Поняла, что достигла предела навыков &mdash; решила учиться новой сфере, к которой раньше немного прикасалась.
                    Прошла курс веб-разработчика от Практикума, и дальше совершенствуюсь в &laquo;бездонной&raquo; области программирования. 😉</p>
                    <a className="about-me__link" href='https://github.com/KindofShuga' target="_blank" rel="noreferrer">Github</a>
                </div>
                <img className="about-me__photo" src={studentPhoto} alt="Фото студента" />
            </div>
        </section>
    );
}