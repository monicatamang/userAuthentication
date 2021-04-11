// Creating a function that is called when login button is clicked
function loginUser(e) {

    // Printing a loading message to the user
    document.getElementById(`loginStatus`).innerText = `Verifying Credentials`;

    // When the login button is clicked, configure the request with the type, url, data format, and parameters being the input values the user enters for their email and password
    // If the page doesn't fail, call the userLoginSuccess function
    // If the page fails, call the userLoginFailure function
    axios.request({
        method: `POST`,
        url: `https://reqres.in/api/login`,
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            email: document.getElementById(`emailInput`).value,
            password: document.getElementById(`passwordInput`).value
        }
    }).then(userLoginSuccess).catch(userLoginFailure);
}

// Creating a function that is called when the page errors, printing an error message to the user
function userLoginFailure(err) {
    document.getElementById(`loginStatus`).innerText = `Email or password is invalid. Please try again.`;
}

// Creating a function that is called when the network is done and there are no errors
function userLoginSuccess(res) {

    // Storing the user's token from the returned JS object as a variable
    let loginToken = res.data.token;

    // Creating a cookie based on the token that was returned back
    Cookies.set(`token`, loginToken);

    // Printing a success message to the user 
    document.getElementById(`loginStatus`).innerText = `You have successfully logged in.`;
    
    // After 1s, take the user to the second page
    setTimeout(changePage, 1000);
}

// Creating a function that takes the user to the second page
function changePage() {
    window.location = `/pages/secondPage.html`;
}

// Adding a click event to the login button and calling the loginUser function
let loginButton = document.getElementById(`loginButton`);
loginButton.addEventListener(`click`, loginUser);