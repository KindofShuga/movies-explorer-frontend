import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies() {
    return (
        <>
            <Header loggedIn={true} />
            <main>
                <SearchForm />
                <MoviesCardList />
            </main>
            <Footer />
        </>
    );
};