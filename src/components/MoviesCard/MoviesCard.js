import React from 'react';
import { useLocation } from "react-router-dom";
import './MoviesCard.css'
import { getTimeFromMins } from '../../utils/utils';

export default function MoviesCard({ movieInfo, onMovieSave, onMovieDelete, onCheckboxChecked }) {
    const location = useLocation();
    const moviesLocation = location.pathname === "/movies";

    const handleChange = (event) => {
        if (event.target.checked === true) {
            onMovieSave(movieInfo);
        } else {
            onMovieDelete(movieInfo);
        }
    }
    const handleDeleteSavedMovie = () => {
        onMovieDelete(movieInfo);
    }

    return (
        <li className="movie">
            {moviesLocation ?
                (
                    <label className="movie__checkbox">
                        <input className="movie__input" type="checkbox" onChange={handleChange} checked={onCheckboxChecked} />
                        <span className="movie__save-btn"></span>
                    </label>
                ) : (
                    <button className="movie__delete-btn" type="button" onClick={handleDeleteSavedMovie} />
                )
            }
            <a href={movieInfo.trailerLink} target="_blank" rel="noreferrer">
                <img
                    className="movie__image"
                    src={moviesLocation ? `https://api.nomoreparties.co/${movieInfo.image.url}` : movieInfo.image}
                    alt={movieInfo.nameRU} />
            </a>
            <div className="movie__description">
                <h3 className="movie__title">{movieInfo.nameRU}</h3>
                <div>
                    <p className="movie__duration">{getTimeFromMins(movieInfo.duration)}</p>
                </div>
            </div>
        </li>
    );
};