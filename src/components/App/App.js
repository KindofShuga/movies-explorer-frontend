import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import InfoTooltip from '../InfoTooltip/InfoTooltip'
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import * as auth from '../../utils/auth'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { filterMovies } from '../../utils/utils.js';
import { SERVER_ERROR } from '../../utils/constans';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [checkedShorts, setCheckedShorts] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function getAllMovies() {
    moviesApi.getMovies()
      .then((allMovies) => localStorage.setItem('all-movies', JSON.stringify(allMovies)))
      .catch((err) => console.log(err));
  }

  function closeInfoTooltipPopup() {
    setIsInfoTooltipPopupOpen(false);
    setTimeout(() => setIsSuccess(false), 2000);
  }

  function signOut() {
    setLoggedIn(false);
    localStorage.clear();
  }

  function handleLogin({ email, password }) {
    setIsLoading(true)
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          getAllMovies();
          navigate("/movies")
        }
      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen(true);
        console.log(err)
      })
      .finally(() => setIsLoading(false));
  }

  function handleRegister({ name, email, password }) {
    setIsLoading(true);
    auth.register(name, email, password)
      .then(() => {
        handleLogin({ email, password })
      })
      .then(() => {
        setIsSuccess(true);
        setIsInfoTooltipPopupOpen(true);
      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen(true);
        console.log(err)
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    mainApi.updateProfile(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        setIsSuccess(true);
        setIsInfoTooltipPopupOpen(true);
      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen(true);
        console.log(err)
      })
      .finally(() => setIsLoading(false));
  }

  const handleSearchMovie = (searchText) => {
    setSearchText(searchText)
    setIsLoading(true);
    if (location.pathname === '/movies') {
      try {
        const allMovies = JSON.parse(localStorage.getItem('all-movies'))
        const newMovies = filterMovies(allMovies, checkedShorts, searchText)
        localStorage.setItem('movies', JSON.stringify({ movies: newMovies, searchText: searchText, checkedShorts: checkedShorts }));
      }
      catch (err) {
        console.log(err);
        return localStorage.setItem('movies', JSON.stringify({
          movies: [SERVER_ERROR],
          searchText: searchText
        }));
      }
      finally {
        setIsLoading(false)
      }
    } else {
      try {
        const newMovies = filterMovies(JSON.parse(localStorage.getItem('saved-movies')), checkedShorts, searchText);
        setSavedMovies(newMovies);
      }
      catch (err) {
        console.log(err);
        setSavedMovies([SERVER_ERROR]);
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
        setIsInfoTooltipPopupOpen(true);
        console.log(err)
      });
  };

  const handleMovieDelete = (movieInfo) => {
    const movieId = movieInfo._id || (savedMovies.find((savedMovie) => savedMovie.movieId === movieInfo.id))._id;
    const deleteFromList = (moviesArray) => {
      return moviesArray.filter((oneMovie) => oneMovie._id !== movieId)
    };
    mainApi.deleteMovie(movieId)
      .then(() => {
        setSavedMovies((moviesArray) => deleteFromList(moviesArray));
        const newStorage = deleteFromList(JSON.parse(localStorage.getItem('saved-movies')));
        localStorage.setItem('saved-movies', JSON.stringify(newStorage));
      })
      .catch((err) => {
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
          setIsInfoTooltipPopupOpen(true);
          console.log(err)
        })
        .finally(() => setIsLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loggedIn === true) {
      setIsLoading(true);
      mainApi.getUserAndSavedMovies()
        .then(([user, movies]) => {
          setCurrentUser(user);
          setSavedMovies(movies);
          localStorage.setItem('saved-movies', JSON.stringify(movies));
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => setIsLoading(false));
    }
  }, [loggedIn, navigate]);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={<Main loggedIn={loggedIn} />} />

        <Route path="/signin" element={
          !loggedIn ?
            (<Login isLoading={isLoading} handleLogin={handleLogin} />) :
            (<Navigate to="/" />)
        } />
        <Route path="/signup" element={
          !loggedIn ?
            (<Register isLoading={isLoading} handleRegister={handleRegister} />) :
            (<Navigate to="/" />)
        } />

        <Route path="/movies" element={
          <ProtectedRoute
            element={Movies}
            isLoading={isLoading}
            loggedIn={loggedIn}
            searchText={searchText}
            savedMovies={savedMovies}
            onSearchMovie={handleSearchMovie}
            checkedShorts={setCheckedShorts}
            onMovieSave={handleMovieSave}
            onMovieDelete={handleMovieDelete}
          />
        }
        />
        <Route path="/saved-movies" element={
          <ProtectedRoute
            element={SavedMovies}
            isLoading={isLoading}
            loggedIn={loggedIn}
            savedMovies={savedMovies}
            searchText={searchText}
            onSearchMovie={handleSearchMovie}
            onMovieDelete={handleMovieDelete}
            checkedShorts={setCheckedShorts}
          />
        }
        />
        <Route path="/profile" element={
          <ProtectedRoute
            element={Profile}
            isLoading={isLoading}
            loggedIn={loggedIn}
            onUpdateUser={handleUpdateUser}
            signOut={signOut}
          />
        }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <InfoTooltip
        isOpen={isInfoTooltipPopupOpen}
        onClose={closeInfoTooltipPopup}
        isSuccess={isSuccess}
      />
    </CurrentUserContext.Provider>
  );
};
