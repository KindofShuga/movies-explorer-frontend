import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { notFoundText } from '../../utils/textConstans';

export default function MoviesCardList({ savedMovies, onMovieSave, onMovieDelete }) {
    const location = useLocation();
    const [count, setCount] = useState(0);
    const [currentMovies, setCurrentMovies] = useState([]);

    const changedWindow = () => {
        if (window.innerWidth > 768) {
            setCount(12)
        } else if (window.innerWidth > 480) {
            setCount(8)
        } else {
            setCount(5)
        }
    };

    const addMore = () => {
        if (window.innerWidth > 768) {
            setCount(count + 3)
        } else {
            setCount(count + 2)
        }
    };

    const handleCheckboxChecked = (movie) => {
        if (!!savedMovies.find(savedMovie => savedMovie.movieId === movie.id)) {
            return true;
        } else {
            return false;
        }
    };

    useEffect(() => {
        changedWindow();
    }, []);
    useEffect(() => {
        window.addEventListener('resize', changedWindow);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.innerWidth]);
    useEffect(() => {
        if (location.pathname === '/movies') {
            const moviesStorage = JSON.parse(localStorage.getItem('movies'));
            if (moviesStorage) {
                setCurrentMovies(moviesStorage.movies);
            }
        } else {
            savedMovies.length > 0 ? setCurrentMovies(savedMovies) : setCurrentMovies([notFoundText]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localStorage, savedMovies, useNavigate]);

    return (
        <section className="movies">
            {typeof currentMovies[0] !== "string" ?
                (<>
                    <ul className="movies__cards">
                        {currentMovies.slice(0, count).map((movie) => {
                            return <MoviesCard
                                key={movie.id || movie.movieId}
                                movieInfo={movie}
                                onMovieSave={onMovieSave}
                                onMovieDelete={onMovieDelete}
                                onCheckboxChecked={handleCheckboxChecked(movie)}
                            />
                        })}
                    </ul>
                    {location.pathname === '/movies' &&
                        count < currentMovies.length &&
                        <div className="movies__more">
                            <button className="movies__btn-text" type="button" onClick={addMore}>Ещё</button>
                        </div>
                    }
                </>)
                :
                (<p className="movies__result-text">{currentMovies[0]}</p>)
            }
        </section>
    );
};