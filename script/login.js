const url = 'https://go-wash-api.onrender.com/api/login';

async function login() {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('password').value;

    let resposta = await fetch(url, {
        method: "POST",
        body: JSON.stringify(
            {
                "email": email,
                "password": senha,
                "user_type_id": 1
            }
        ),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    let data = await resposta.json();

    localStorage.setItem('user', JSON.stringify(data));

}