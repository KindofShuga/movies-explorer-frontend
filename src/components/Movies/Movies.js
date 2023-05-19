import React from 'react';
import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies({ isLoading, loggedIn, savedMovies, handleSearchMovie, onCheckedShorts, onMovieSave, handleMovieDelete }) {
    return (
        <>
            {isLoading ?
                <Preloader />
                :
                <>
                    <Header loggedIn={loggedIn} />
                    <main>
                        <SearchForm onSearchMovie={handleSearchMovie} onCheckedShorts={onCheckedShorts} />
                        {isLoading ?
                            <Preloader />
                            :
                            <MoviesCardList
                                onSearchMovie={handleSearchMovie}
                                savedMovies={savedMovies}
                                onMovieSave={onMovieSave}
                                handleMovieDelete={handleMovieDelete}
                            />
                        }
                    </main>
                    <Footer />
                </>
            }
        </>
    );
};