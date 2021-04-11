// Creating a function that is called as soon as the window is loaded
function showColours(e) {

    // When the window is loaded, configure the request with the type and URL
    // If the page doesn't fail, call the getColoursSuccess function
    // If the page fails, call the getColoursFailure function
    axios.request({
        method: `GET`,
        url: `https://reqres.in/api/unknown`
    }).then(getColoursSuccess).catch(getColourFailure);
}

// Creating a function that is called when the page errors, printing an error message to the user
function getColourFailure(err) {
    document.getElementById(`coloursStaus`).innerText = `No colours found. Please try again.`;
}

// Creating a function that is called when the network is done and there are no errors
function getColoursSuccess(res) {

    // Storing the returned array into a variable
    let colours = res.data.data;

    // Getting the container that will contain the returned array and printing the colour and it's attributes to the user
    let coloursContainer = document.getElementById(`coloursContainer`);
    for (let i = 0; i < colours.length; i++) {

        // Grouping each the colour's name, year and hex code
        let colourCard = document.createElement(`article`);
        colourCard.classList.add(`colourCard`);
        colourCard.innerHTML += `<p>${colours[i].name}</p>
        <p>${colours[i].year}</p>`;

        // Creating a div, setting it's dimensions and background colour to be displayed on the screen
        // The background colour set to correspond with the colour title
        let colourBox = document.createElement(`div`);
        colourBox.style.width = `100px`;
        colourBox.style.height = `100px`;
        colourBox.style.background = `${colours[i].color}`;
        colourCard.append(colourBox);

        // Appending all colour cards to the main container
        coloursContainer.append(colourCard);
    }

    // Storing the user's token as a variable
    let userToken = Cookies.get(`token`);

    // If the user's token does not exist, print a message to the user prompting them to go back to the login page and create a button that takes them to the login page
    if (userToken === undefined) {
        coloursContainer.innerHTML = `<p>You are not logged in. Please go back to the login page.</p>
        <button id="backToLoginPageButton">Back to Login Page</button>`;

        // Styling the container to have an inherit property or in other words, styling the container to has no gridTemplateColumns property as it is inherited from its parent container which has no gridTemplateColumns property
        coloursContainer.style.gridTemplateColumns = `inherit`;
    }
}

// Creating a function that removes the user's token when the logout button is clicked
function logoutUser(e) {
    Cookies.remove(`token`);
}

// Adding a load event to the window and calling the showColours function
window.addEventListener(`load`, showColours);

// Adding a click event to the logout button and calling the logoutUser function
let logoutButton = document.getElementById(`logoutButton`);
logoutButton.addEventListener(`click`, logoutUser);