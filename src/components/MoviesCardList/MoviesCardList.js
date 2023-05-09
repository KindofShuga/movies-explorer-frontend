import React from 'react';
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'

export default function MoviesCardList() {
    return (
        <section className="movies">
            <ul className="movies__cards">
                {<MoviesCard />}
                {<MoviesCard />}
                {<MoviesCard />}
                {<MoviesCard />}
                {<MoviesCard />}
            </ul>
            <div className="movies__more">
                <button className="movies__text" type="button">Ещё</button>
            </div>
        </section>
    );
};