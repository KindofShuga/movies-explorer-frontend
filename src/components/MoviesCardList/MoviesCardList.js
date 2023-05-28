import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import {
    NOT_FOUND,
    TABLET_DISPLAY,
    MOBILE_DISPLAY,
    DISPLAYED_MOVIES_DESKTOP,
    DISPLAYED_MOVIES_TABLET,
    DISPLAYED_MOVIES_MOBILE,
    SHOW_MORE_DESKTOP,
    SHOW_MORE_TABLET_AND_MOBILE
} from '../../utils/constans';
import { filterMovies } from '../../utils/utils.js';

export default function MoviesCardList({ savedMovies, searchText, onMovieSave, onMovieDelete, checkedCheckbox }) {
    const location = useLocation();
    const [count, setCount] = useState(0);
    const [currentMovies, setCurrentMovies] = useState([]);
    const windowDisplay = window.innerWidth;

    const changedWindow = () => {
        if (windowDisplay > TABLET_DISPLAY) {
            setCount(DISPLAYED_MOVIES_DESKTOP)
        } else if (windowDisplay > MOBILE_DISPLAY) {
            setCount(DISPLAYED_MOVIES_TABLET)
        } else {
            setCount(DISPLAYED_MOVIES_MOBILE)
        }
    };

    const addMore = () => {
        if (windowDisplay > 1280) {
            setCount(count + SHOW_MORE_DESKTOP)
        } else {
            setCount(count + SHOW_MORE_TABLET_AND_MOBILE)
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [windowDisplay]);

    useEffect(() => {
        setTimeout(() => {
            window.addEventListener('resize', changedWindow);
        }, 500);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    useEffect(() => {
        if (location.pathname === '/movies') {
            const moviesStorage = JSON.parse(localStorage.getItem('movies'));
            if (moviesStorage) {
                if (moviesStorage.movies.length > 0) {
                    if (checkedCheckbox === true) {
                        setCurrentMovies(filterMovies(moviesStorage.movies, checkedCheckbox))
                        localStorage.setItem('movies', JSON.stringify({ movies: moviesStorage.movies, searchText: moviesStorage.searchText, checkedShorts: true }));
                    } else {
                        const allMovies = JSON.parse(localStorage.getItem('all-movies'));
                        const newMovies = filterMovies(allMovies, checkedCheckbox, moviesStorage.searchText);
                        setCurrentMovies(newMovies);
                        localStorage.setItem('movies', JSON.stringify({ movies: newMovies, searchText: moviesStorage.searchText, checkedShorts: false }));
                    }
                } else {
                    setCurrentMovies(moviesStorage.movies);
                }
            } else {
                setTimeout(() => {
                    setCurrentMovies(JSON.parse(localStorage.getItem('all-movies')));
                }, 500)
            }
        } else {
            savedMovies.length > 0 ? setCurrentMovies(savedMovies) : setCurrentMovies([NOT_FOUND]);
            if (checkedCheckbox === true) {
                setCurrentMovies(filterMovies(savedMovies, checkedCheckbox))
            } else {
                const savedMoviesStorage = JSON.parse(localStorage.getItem('saved-movies'));
                setCurrentMovies(filterMovies(savedMoviesStorage, checkedCheckbox, searchText))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchText, savedMovies, useNavigate, checkedCheckbox]);

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