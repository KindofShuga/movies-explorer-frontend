import { NOT_FOUND, SHORT_DURATION } from './constans';

export function filterMovies(movies, checkedShorts, searchText) {
    const searchedMovies = movies.filter((movie) => {
        if (typeof movie === "string") {
            return []
        } else {
            const movieRu = movie.nameRU.toLowerCase();
            const movieEn = movie.nameEN.toLowerCase();
            if (searchText) {
                return movieRu.includes(searchText.toLowerCase()) || movieEn.includes(searchText.toLowerCase());
            } else {
                return movieRu || movieEn;
            }
        }
    });
    if (checkedShorts && typeof searchedMovies[0] !== "string" && searchedMovies.length > 0) {
        const shortMovies = searchedMovies.filter((movie) => {
            return movie.duration <= SHORT_DURATION;
        });
        if (shortMovies.length > 0) {
            return shortMovies;
        } else {
            return [NOT_FOUND];
        }
    } else if (typeof searchedMovies[0] !== "string" && searchedMovies.length > 0) {
        return searchedMovies;
    } else {
        return [NOT_FOUND];
    }
}

export function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours > 0 ?
        hours + 'ч ' + minutes + 'м'
        : minutes + 'м';
};