function togglePower() {
    const powerButton = document.querySelector('button.power');
    powerButton.classList.toggle('active');
}

function addMovie(button) {
    const index = button.getAttribute('data-index');
    const movieButton = document.createElement('button');
    movieButton.textContent = `Movie ${index}`;
    movieButton.className = 'movie' + index;
    movieButton.onclick = function() {
        fetch(`/remote/launch/12/80${index}/series`);
    };
    const buttonGrid = document.querySelector('.button-grid');
    buttonGrid.replaceChild(movieButton, button);
}

function sendKey(key) {
    if (key === 'Power') {
        togglePower();
    }
}
