import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies() {
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