let url = 'http://localhost:3030';
let movieForm = document.getElementById('add-movie-form');
let registerForm = document.querySelector('#register-form');
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

movieForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);
    console.log(formData.get("title"));

    e.currentTarget.reset();
});

function saveToken(token){
    localStorage.setItem('auth_token', token)
}