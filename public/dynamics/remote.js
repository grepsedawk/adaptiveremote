// Function to handle the toggle of the power button
function togglePower() {
    const powerButton = document.querySelector('button.power');
    
    // Toggle the 'active' class to switch between green and red states
    powerButton.classList.toggle('active');
  }
  
  // Attach the togglePower function to the power button's onclick event
  function sendKey(key) {
    if (key === 'Power') {
      togglePower();
    }
    // You can add additional logic for other keys if needed
  }
  