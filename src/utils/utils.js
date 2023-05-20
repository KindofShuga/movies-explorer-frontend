export function filterMovies(movies, searchText, checkedShorts) {
    const searchedMovies = movies.filter((movie) => {
        const movieRu = movie.nameRU.toLowerCase();
        const movieEn = movie.nameEN.toLowerCase();
        if(searchText) {
            return movieRu.includes(searchText.toLowerCase()) || movieEn.includes(searchText.toLowerCase());
        } else {
            return movieRu || movieEn;
        }
    });
    if (checkedShorts) {
        return searchedMovies.filter((movie) => {
            return movie.duration <= 40;
        });
    } else {
        return searchedMovies;
    }
}

export function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours > 0 ?
        hours + 'ч ' + minutes + 'м'
        : minutes + 'м';
};