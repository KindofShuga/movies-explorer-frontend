import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import { useFormWithValidation } from "../../utils/validation";

export default function SearchForm({ onSearchMovie, onCheckedShorts }) {
    const location = useLocation();
    const checkboxFromStorage = localStorage.getItem('movies') ?
        location.pathname === '/movies' && JSON.parse(localStorage.getItem('movies')).checkedShorts
        : null;
    const { values, handleChange, errors, isValid, setIsValid } = useFormWithValidation();

    function handleSubmit(e) {
        e.preventDefault();
        const { title } = values;
        onSearchMovie(title);
    }

    useEffect(() => {
        setIsValid(true);
        if (location.pathname === '/movies') {
            const moviesStorage = JSON.parse(localStorage.getItem('movies'));
            if (moviesStorage) {
                values.title = moviesStorage.searchText;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);
    return (
        <section className="search-form">
            <form className="search-form__form" onSubmit={handleSubmit}>
                {location.pathname === '/movies' ?
                    <input
                        className={`search-form__input ${errors.title ? "search-form__input_err" : ""}`}
                        type="text"
                        onChange={handleChange}
                        placeholder="Фильм"
                        name="title"
                        value={values.title || ""}
                        required
                    />
                    :
                    <input
                        className={`search-form__input ${errors.title ? "search-form__input_err" : ""}`}
                        type="text"
                        onChange={handleChange}
                        placeholder="Фильм"
                        name="title"
                        value={values.title || ""}
                    />
                }
                <button className={`search-form__submit-btn ${!isValid ? "search-form__submit-btn_inactive" : ""}`} type="submit" aria-label="Найти" />
            </form>
            <div className="search-form__switch-container">
                <FilterCheckbox onCheckedShorts={onCheckedShorts} checkboxFromStorage={checkboxFromStorage} />
                <p className="search-form__switch-text">Короткометражки</p>
            </div>
        </section>
    );
};