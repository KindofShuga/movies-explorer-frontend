import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import { useFormWithValidation } from "../../utils/validation";

export default function SearchForm({ onSearchMovie, checkedCheckbox, onChangeShorts }) {
    const location = useLocation();
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
            <form className="search-form__form" onSubmit={handleSubmit} noValidate>
                {location.pathname === '/movies' ?
                    <>
                        <input
                            className={`search-form__input ${errors.title ? "search-form__input_err" : ""}`}
                            type="text"
                            onChange={handleChange}
                            placeholder="Фильм"
                            name="title"
                            value={values.title || ""}
                            required
                        />
                        <span className="search-form__input-err">{errors.title && "Нужно ввести ключевое слово"}</span>
                    </>
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
                <button className={`search-form__submit-btn ${!isValid ? "search-form__submit-btn_inactive" : ""}`} type="submit" aria-label="Найти" disabled={!isValid} />
            </form>
            <div className="search-form__switch-container">
                <FilterCheckbox checkedCheckbox={checkedCheckbox} onChangeShorts={onChangeShorts} />
                <p className="search-form__switch-text">Короткометражки</p>
            </div>
        </section>
    );
};