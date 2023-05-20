import React from 'react';
import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies({
    isLoading,
    loggedIn,
    savedMovies,
    onMovieDelete,
    onSearchMovie,
    onCheckedShorts
}) {
    return (
        <>
            <Header loggedIn={loggedIn} />
            <main>
                <SearchForm onSearchMovie={onSearchMovie} onCheckedShorts={onCheckedShorts} />
                {isLoading ?
                    <Preloader />
                    :
                    <MoviesCardList savedMovies={savedMovies} onMovieDelete={onMovieDelete} />
                }
            </main>
            <Footer />
        </>
    );
};