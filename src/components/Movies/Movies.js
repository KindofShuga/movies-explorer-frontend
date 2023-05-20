import React from 'react';
import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies({
    isLoading,
    loggedIn,
    savedMovies,
    onSearchMovie,
    onCheckedShorts,
    onMovieSave,
    onMovieDelete
}) {
    return (
        <>
            <Header loggedIn={loggedIn} />
            <main>
                <SearchForm onSearchMovie={onSearchMovie} onCheckedShorts={onCheckedShorts} />
                {isLoading ?
                    <Preloader />
                    :
                    <MoviesCardList
                        savedMovies={savedMovies}
                        onMovieSave={onMovieSave}
                        onMovieDelete={onMovieDelete}
                    />
                }
            </main>
            <Footer />
        </>
    );
};