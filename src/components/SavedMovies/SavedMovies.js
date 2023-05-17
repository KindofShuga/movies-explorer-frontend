import React from 'react';
import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies({ isLoading, loggedIn, savedMovies, filteredSavedMovies, handleMovieDelete, onSearchMovie, onCheckedShorts, errorMassege }) {
    return (
        <>
            {isLoading ?
                <Preloader />
                :
                <>
                    <Header loggedIn={loggedIn} />
                    <main>
                        <SearchForm onSearchMovie={onSearchMovie} onCheckedShorts={onCheckedShorts} />
                        <MoviesCardList savedMovies={savedMovies} filteredSavedMovies={filteredSavedMovies} handleMovieDelete={handleMovieDelete} errorMassege={errorMassege} />
                    </main>
                    <Footer />
                </>
            }
        </>
    );
};