// Function to handle the toggle of the power button
function togglePower() {
    const powerButton = document.querySelector('button.power');
    powerButton.classList.toggle('active');
}

// Function to handle adding a movie button
function addMovie(button) {
    const index = button.getAttribute('data-index'); // Get the index from the button
    const movieButton = document.createElement('button'); // Create a new button element
    movieButton.textContent = `Movie ${index}`; // Set the button text
    movieButton.onclick = function() {
        fetch(`/remote/launch/12/80${index}/series`); // Replace with your launch URL
    };
    
    // Replace the "+" button with the new movie button
    const buttonGrid = document.querySelector('.button-grid');
    buttonGrid.replaceChild(movieButton, button);
}

function sendKey(key) {
    if (key === 'Power') {
        togglePower();
    }
    // You can add additional logic for other keys if needed
}
