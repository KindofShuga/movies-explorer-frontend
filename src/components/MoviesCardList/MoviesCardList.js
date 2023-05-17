import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { notFoundText } from '../../utils/textConstans';

export default function MoviesCardList({ savedMovies, filteredSavedMovies, onMovieSave, handleMovieDelete, errorMassege }) {
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
    }

    const addMore = () => {
        if (window.innerWidth > 768) {
            setCount(count + 3)
        } else {
            setCount(count + 2)
        }
    }

    const handleCheckboxChecked = (movie) => {
        if (!!savedMovies.find(savedMovie => savedMovie.movieId === movie.id)) {
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        window.addEventListener('resize', changedWindow);
    }, [window.innerWidth])

    useEffect(() => {
        changedWindow();
    }, [])


    useEffect(() => {
        if (location.pathname === '/movies') {
            const moviesStorage = JSON.parse(localStorage.getItem('movies'));
            if (moviesStorage) {
                setCurrentMovies(moviesStorage.movies);
            }
        } else {
            savedMovies.length > 0 ? setCurrentMovies(savedMovies) : setCurrentMovies([notFoundText]);
            // setCurrentMovies(savedMovies);
        }
        // }, [localStorage, filteredSavedMovies, savedMovies, useNavigate]);
    }, [localStorage, filteredSavedMovies, savedMovies, useNavigate, errorMassege]);


    // useEffect(() => {
    //     // setTimeout(() => {
    //     console.log(savedMovies);
    //     // }, 1000)
    // }, [savedMovies])
    // useEffect(() => {
    //     const storageName = location.pathname === '/movies' ? 'movies' : 'saved-movies';
    //     const moviesStorage = JSON.parse(localStorage.getItem(storageName));
    //     if (moviesStorage) {
    //         if (moviesStorage.shortsChecked === true) {
    //             const shortMovies = filterShorts(moviesStorage.movies);
    //             setCurrentMovies(shortMovies);
    //         } else {
    //             setCurrentMovies(moviesStorage.movies);
    //         };
    //     } else if (storageName === 'saved-movies') {
    //         setCurrentMovies(savedMovies);
    //     }
    // // }, [onSearchMovie, savedMovies, searchedMovies, useNavigate])
    // }, [filteredSavedMovies, searchedMovies, savedMovies, useNavigate])
    // useEffect(() => {
    //     const moviesStorage = JSON.parse(localStorage.getItem('/movies'));
    //     if (moviesStorage) {
    //         if (moviesStorage.shortsChecked === true) {
    //             const shortMovies = filterShorts(moviesStorage.movies);
    //             setCurrentMovies(shortMovies);
    //         } else {
    //             setCurrentMovies(moviesStorage.movies);
    //         };
    //     } else if (storageName === 'saved-movies') {
    //         setCurrentMovies(savedMovies);
    //     }
    // // }, [onSearchMovie, savedMovies, searchedMovies, useNavigate])
    // }, [filteredSavedMovies, searchedMovies, savedMovies, useNavigate])
    return (
        <section className="movies">
            {/* {typeof currentMovies !== "string" ? */}
            {typeof currentMovies[0] !== "string" ?
                (
                    <>
                        <ul className="movies__cards">
                            {currentMovies.slice(0, count).map((movie) => {
                                return <MoviesCard
                                    movieInfo={movie}
                                    key={movie.id || movie.movieId}
                                    onMovieSave={onMovieSave}
                                    handleMovieDelete={handleMovieDelete}
                                onCheckboxChecked={handleCheckboxChecked(movie)}
                                />
                            })
                            }
                        </ul>
                        {location.pathname === '/movies' && count < currentMovies.length &&
                            <div className="movies__more">
                                <button className="movies__btn-text" type="button" onClick={addMore}>Ещё</button>
                            </div>
                        }
                    </>
                )
                :
                (<p className="movies__result-text">{currentMovies[0]}</p>)
            }
        </section>
    );
};