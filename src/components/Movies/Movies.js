import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies({
    isLoading,
    loggedIn,
    searchText,
    savedMovies,
    onSearchMovie,
    onMovieSave,
    onMovieDelete,
    checkedShorts
}) {
    const location = useLocation();
    const checkboxFromStorage = localStorage.getItem('movies') ?
        location.pathname === '/movies' && JSON.parse(localStorage.getItem('movies')).checkedShorts
        : null;
    const [ checkedCheckbox, setCheckedCheckbox ] = useState(checkboxFromStorage || false);

    function handleChangeShorts() {
        setCheckedCheckbox(!checkedCheckbox);
        checkedShorts(!checkedCheckbox);
    }

    return (
        <>
            <Header loggedIn={loggedIn} />
            <main>
                <SearchForm onSearchMovie={onSearchMovie} checkedCheckbox={checkedCheckbox} onChangeShorts={handleChangeShorts} />
                {isLoading ?
                    <Preloader />
                    :
                    <MoviesCardList
                    searchText={searchText}
                        savedMovies={savedMovies}
                        onMovieSave={onMovieSave}
                        onMovieDelete={onMovieDelete}
                        checkedCheckbox={checkedCheckbox}
                    />
                }
            </main>
            <Footer />
        </>
    );
};