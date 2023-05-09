import React from 'react';
import './NotFound.css';
import { Link, useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    return (
        <section className="not-found">
            <h2 className="not-found__title">404</h2>
            <p className="not-found__text">Страница не найдена</p>
            <Link className="not-found__link" onClick={goBack}>Назад</Link>
        </section>
    );
}