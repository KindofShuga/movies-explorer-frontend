class MainApi {
    constructor(options) {
        this._options = options;
    }
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
    getProfile() {
        return fetch(`${this._options.baseUrl}/users/me`, {
            method: 'GET',
            headers: this._options.headers
        })
            .then(this._getResponseData)
    }

    updateProfile(data) {
        return fetch(`${this._options.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                name: data.name,
                email: data.email
            })
        })
            .then(this._getResponseData)
    }

    getMovies() {
        return fetch(`${this._options.baseUrl}/movies`, {
            method: 'GET',
            headers: this._options.headers,
        })
            .then(this._getResponseData)
    }

    addMovie(data) {
        return fetch(`${this._options.baseUrl}/movies`, {
            method: 'POST',
            headers: this._options.headers,
            body: JSON.stringify({
                country: data.country,
                director: data.director,
                duration: data.duration,
                year: data.year,
                description: data.description,
                image: `https://api.nomoreparties.co${data.image.url}`,
                trailerLink: data.trailerLink,
                thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
                movieId: data.id,
                nameRU: data.nameRU,
                nameEN: data.nameEN,
            }),
        })
            .then(this._getResponseData)
    }

    deleteMovie(id) {
        return fetch(`${this._options.baseUrl}/movies/${id}`, {
            method: 'DELETE',
            headers: this._options.headers,
        })
            .then(this._getResponseData)
    }

    getUserAndSavedMovies() {
        const promises = [this.getProfile(), this.getMovies()];
        return Promise.all(promises);
    }
}
const mainApi = new MainApi({
    baseUrl: 'http://127.0.0.1:3001',
    headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
    }
});
export default mainApi