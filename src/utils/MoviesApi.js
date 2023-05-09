class MoviesApi {
    constructor(options) {
        this._options = options;
    }
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
    get() {
        return fetch(`${this._options.baseUrl}`, {
            method: 'GET',
            headers: this._options.headers,
          })
            .then(this._getResponseData)
    }
}
const moviesApi = new MoviesApi({
        baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
export default moviesApi