import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

export default function SearchForm() {
    return (
        <section className="search-form">
            <form className="search-form__form">
                <input className="search-form__input" type="text" placeholder="Фильм" required />
                <button className="search-form__submit-btn" type="submit" aria-label="Найти"></button>
            </form>
            <div className="search-form__switch-container">
                {<FilterCheckbox />}
                <p className="search-form__switch-text">Короткометражки</p>
            </div>
        </section>
    );
};