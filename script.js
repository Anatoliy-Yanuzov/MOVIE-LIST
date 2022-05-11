let url = 'http://localhost:3030';
let movieForm = document.getElementById('add-movie-form');
let registerForm = document.querySelector('#register-form');
let loginForm = document.querySelector('#login-form');
let registerSection = document.querySelector('.register-section');
let addMovieSection = document.querySelector('.add-movie-section');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let data = new FormData(e.currentTarget);

    e.currentTarget.reset();

    fetch(`${url}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: data.get('email'),
            password: data.get('password')
        })
    })
        .then(res => res.json())
        .then(data => {
            saveToken(data.accessToken)
            console.log(data);
            registerSection.classList.add('hide')
            addMovieSection.classList.remove('hide')
        })
        .catch(err => {
            console.error(err);
        })
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let data = new FormData(e.currentTarget);

    e.currentTarget.reset();

    fetch(`${url}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: data.get('email'),
            password: data.get('password')
        })
    })
        .then(res => res.json())
        .then(data => {
            saveToken(data.accessToken)
            console.log(data);
            registerSection.classList.add('hide')
            addMovieSection.classList.remove('hide')
        })
        .catch(err => {
            console.error(err);
        })
});

movieForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);

    let title = formData.get('title');
    let description = formData.get('description');
    let token = getToken();

    fetch(`${url}/data/movies`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify({
            title,
            description
        }),
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log('There is a problem with fetch request');
        })

    e.currentTarget.reset();
});

function saveToken(token) {
    localStorage.setItem('auth_token', token)
}

function getToken() {
    let token = localStorage.getItem('auth_token');

    return token;
}