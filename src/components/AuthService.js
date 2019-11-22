import decode from 'jwt-decode';
import { URLs } from '../constants/URLs';

export default class AuthService {
    // Initializing important variables
    constructor() {
        this.fetch = this.fetch.bind(this) // React binding stuff
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
        this.register = this.register.bind(this)
    }

    login(payload) {
        // Get a token from api server using the fetch api
        return this.fetch(URLs.login, {
            method: 'POST',
            body: payload,
        })
            .then(res => {
            this.setToken(res.token) // Setting the token in localStorage
            return Promise.resolve(res);
            })
    }

    register(payload) {
        return this.fetch(URLs.register, {
            method: 'POST',
            body: payload,
        }).then(res => {
            this.setToken(res.token) // Setting the token in localStorage
            return Promise.resolve(res);
            })
    }

    newItem(payload) {
        return this.fetch(URLs.newItem + `?token=${this.getToken()}`, {
            method: 'POST',
            body: payload,
        })
            .then(res => {
            return Promise.resolve(res);
            })
    }

    bookItem(payload) {
      return this.fetch(URLs.requestBooking + `?token=${this.getToken()}`, {
          method: 'POST',
          body: payload,
      })
          .then(res => {
          return Promise.resolve(res);
          })
    }

    confirmRequest(id) {
        return this.fetch(URLs.confirmBooking + `${id}` + `?token=${this.getToken()}`, {
            method: 'PATCH',
        })
            .then(res => {
            return Promise.resolve(res);
            })
    }

    rejectRequest(id) {
        return this.fetch(URLs.rejectBooking + `${id}` + `?token=${this.getToken()}`, {
            method: 'DELETE',
        })
            .then(res => {
            return Promise.resolve(res);
            })
    }

    updateItems(payload) {
      return this.fetch(URLs.category + `${payload}`, {
          method: 'GET',
      })
          .then(res => {
          console.log(res)
          return Promise.resolve(res);
          })
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }


    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {}

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}
