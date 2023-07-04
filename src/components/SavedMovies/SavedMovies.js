import React, {useState} from 'react';
import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies({
    isLoading,
    loggedIn,
    savedMovies,
    searchText,
    onMovieDelete,
    onSearchMovie,
    checkedShorts
}) {
    const [ checkedCheckbox, setCheckedCheckbox ] = useState(false);

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
                    <MoviesCardList savedMovies={savedMovies} searchText={searchText} onMovieDelete={onMovieDelete} checkedCheckbox={checkedCheckbox} />
                }
            </main>
            <Footer />
        </>
    );
};