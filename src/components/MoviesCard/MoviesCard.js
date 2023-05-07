import React from 'react';
import './MoviesCard.css'
import moviePic from '../../images/movie.png';

export default function MoviesCard() {
    return (
        <li className="movie">
            {/* <label className="movie__checkbox">
                <input className="movie__input" type="checkbox" />
                <span className="movie__save-btn"></span>
            </label> */}
            <button className="movie__delete-btn" type="button"/>
            <img className="movie__image" src={moviePic} alt="Изображение фильма" />
            <div className="movie__description">
                <h3 className="movie__title">33 слова о дизайне</h3>
                <div>
                    <p className="movie__duration">1ч 17м</p>
                </div>
            </div>
        </li>
    );
};