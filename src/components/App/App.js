import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import InfoTooltip from '../InfoTooltip/InfoTooltip'
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import mainApi from '../../utils/MainApi';
import * as auth from '../../utils/auth'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { serverErrorText, notFoundText } from '../../utils/textConstans';

import moviesApi from '../../utils/MoviesApi';
import { filterMovies } from '../../utils/utils.js';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isSuccessInfoTooltip, setIsSuccessInfoTooltip] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [errorMassege, setErrorMessage] = useState("");


  const [searchedMovies, setSearchedMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [checkedShorts, setCheckedShorts] = useState(false);

  function closeInfoTooltipPopup() {
    setIsInfoTooltipPopupOpen(false);
  }

  function handleLogin({ email, password }) {
    setIsLoading(true)
    return auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          navigate("/movies");
        }
      })
      .catch((err) => {
        setIsSuccessInfoTooltip(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(err)
      })
      .finally(() => setIsLoading(false));
  }

  function handleRegister({ name, email, password }) {
    setIsLoading(true);
    return auth.register(name, email, password)
      .then(() => {
        handleLogin({ email, password })
        setIsSuccessInfoTooltip(true);
        setIsInfoTooltipPopupOpen(true);
      })
      .catch((err) => {
        setIsSuccessInfoTooltip(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(err)
      })
      .finally(() => setIsLoading(false));
  }
  function handleUpdateUser(data) {
    setIsLoading(true);
    return mainApi.updateProfile(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        setIsSuccessInfoTooltip(true);
        setIsInfoTooltipPopupOpen(true);
      })
      .catch((err) => {
        setIsSuccessInfoTooltip(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(err)
      })
      .finally(() => setIsLoading(false));
  }

  // const handleSearchMovie = (searchText) => {
  //   const setFilteredMovies = (allMovies) => {
  //     const filteredMovies = filterMovies(allMovies, searchText);
  //     if (filteredMovies.length === 0) {
  //       const newMovies = { movies: "Ничего не найдено", searchText: searchText }
  //       return newMovies;
  //     } else {
  //       const newMovies = { movies: filteredMovies, searchText: searchText, shortsChecked: checkedShorts }
  //       return newMovies;
  //     }
  //   }
  //   const reject = {
  //     movies: `Во время запроса произошла ошибка. 
  //       Возможно, проблема с соединением или сервер недоступен. 
  //       Подождите немного и попробуйте ещё раз`,
  //     searchText: searchText
  //   }

  //   setIsLoading(true);

  //   if (location.pathname === '/movies') {
  //     moviesApi.getMovies()
  //       .then((allMovies) => {
  //         window.localStorage.removeItem('movies');
  //         const newMovies = setFilteredMovies(allMovies)
  //         return localStorage.setItem('movies', JSON.stringify(newMovies));
  //       })
  //       // .then(storage => setSearchedMovies(storage))
  //       .catch((err) => {
  //         console.log(err);
  //         return localStorage.setItem('movies', JSON.stringify(reject));
  //       })
  //       .finally(() => {
  //         setIsLoading(false)
  //       });
  //   } else {
  //     try {
  //       window.localStorage.removeItem('saved-movies');
  //       const savedMoviesCopied = savedMovies.slice(0);
  //       const newMovies = setFilteredMovies(savedMoviesCopied);
  //       setFilteredSavedMovies(newMovies);
  //       return localStorage.setItem('saved-movies', JSON.stringify(newMovies));
  //     }
  //     catch (err) {
  //       console.log(err);
  //     }
  //     finally {
  //       setIsLoading(false)
  //     }
  //   }
  // }
  const setFilterMovies = (allMovies, searchText) => {
    const filteredMovies = filterMovies(allMovies, searchText, checkedShorts);
    // if (filteredMovies.length === 0) {
    //   const newMovies = { movies: "Ничего не найдено", searchText: searchText }
    //   return newMovies;
    // } else {
    //   const newMovies = { movies: filteredMovies, searchText: searchText }
    //   return newMovies;
    if (filteredMovies.length === 0) {
      return [notFoundText];
    } else {
      // const newMovies = { movies: filteredMovies, searchText: searchText }
      // return newMovies;
      return filteredMovies;
    }
  };
  const handleSearchMovie = (searchText) => {
    setIsLoading(true);

    if (location.pathname === '/movies') {
      moviesApi.getMovies()
        .then((allMovies) => {
          const newMovies = setFilterMovies(allMovies, searchText)
          return localStorage.setItem('movies', JSON.stringify({ movies: newMovies, searchText: searchText }));
        })
        .catch((err) => {
          console.log(err);
          return localStorage.setItem('movies', JSON.stringify({
            movies: [serverErrorText],
            searchText: searchText
          }));
        })
        .finally(() => {
          setIsLoading(false)
        });
    } else {
      try {
        // const savedMoviesCopied = savedMovies.slice(0);
        // const newMovies = setFilterMovies(savedMovies, searchText);
        const newMovies = setFilterMovies(JSON.parse(localStorage.getItem('saved-movies')), searchText);
        // if (newMovies.length === 0) {
        //   setSavedMovies(["Ничего не найдено"]);
        // } else {
        setSavedMovies(newMovies);
        // setSavedMovies(newMovies);
        //   setFilteredSavedMovies(newMovies);
        // }
        // setFilteredSavedMovies(newMovies.movies);
      }
      catch (err) {
        console.log(err);
        setSavedMovies([serverErrorText]);
        // setFilteredSavedMovies(reject.movies);
      }
      finally {
        setIsLoading(false)
      }
    };
  };

  const handleMovieSave = (movieInfo) => {
    mainApi.addMovie(movieInfo)
      .then((savedMovie) => setSavedMovies([...savedMovies, savedMovie]))
      .catch((err) => {
        setIsSuccessInfoTooltip(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(err)
      });
  };

  const handleMovieDelete = (movieInfo) => {
    const movieId = movieInfo._id || (savedMovies.find((savedMovie) => savedMovie.movieId === movieInfo.id))._id;
    // console.log(movieInfo);
    // console.log(movieId);
    mainApi.deleteMovie(movieId)
      .then(() => {
        setSavedMovies((moviesArray) => moviesArray.filter((oneMovie) => oneMovie._id !== movieId));
      })
      // mainApi.deleteMovie(movieInfo)
      //   .then(() => {
      //     setSavedMovies((moviesArray) => moviesArray.filter((oneMovie) => oneMovie._id !== movieInfo._id));
      //   })
      .catch((err) => {
        setIsSuccessInfoTooltip(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(err)
      });
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setIsLoading(true);
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate(location.pathname);
          }
        })
        .catch((err) => {
          setIsSuccessInfoTooltip(false);
          setIsInfoTooltipPopupOpen(true);
          console.log(err)
        })
        .finally(() => setIsLoading(false));
    }
  }, [])

  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      mainApi.getUserAndSavedMovies()
        .then(([user, movies]) => {
          setCurrentUser(user);
          setSavedMovies(movies);
          localStorage.setItem('saved-movies', JSON.stringify(movies));
        })
        .catch((err) => {
          setIsSuccessInfoTooltip(false);
          setIsInfoTooltipPopupOpen(true);
          console.log(err)
        })
        .finally(() => setIsLoading(false));
    }
  }, [loggedIn, navigate])
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={<Main loggedIn={loggedIn} />} />
        <Route path="/signin" element={<Login isLoading={isLoading} handleLogin={handleLogin} />} />
        <Route path="/signup" element={<Register isLoading={isLoading} handleRegister={handleRegister} />} />
        <Route path="/movies" element={
          <ProtectedRoute
            isLoading={isLoading}
            loggedIn={loggedIn}
            element={Movies}
            savedMovies={savedMovies}
            errorMassege={errorMassege}
            handleSearchMovie={handleSearchMovie}
            searchedMovies={searchedMovies}
            onCheckedShorts={setCheckedShorts}
            onMovieSave={handleMovieSave}
            handleMovieDelete={handleMovieDelete}
          />
        }
        />
        <Route path="/saved-movies" element={
          <ProtectedRoute
            isLoading={isLoading}
            loggedIn={loggedIn}
            element={SavedMovies}
            savedMovies={savedMovies}
            filteredSavedMovies={filteredSavedMovies}
            errorMassege={errorMassege}
            onCheckedShorts={setCheckedShorts}
            onSearchMovie={handleSearchMovie}
            handleMovieDelete={handleMovieDelete}
          />
        }
        />
        <Route path="/profile" element={
          <ProtectedRoute
            isLoading={isLoading}
            loggedIn={loggedIn}
            element={Profile}
            onUpdateUser={handleUpdateUser}
          />
        }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <InfoTooltip
        isOpen={isInfoTooltipPopupOpen}
        onClose={closeInfoTooltipPopup}
        isSuccessInfoTooltip={isSuccessInfoTooltip}
      />
    </CurrentUserContext.Provider>
  );
};
