document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("theme-toggle")
  const icon = toggleButton.querySelector("i")

  // Check local storage for saved theme
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    document.body.classList.toggle("dark", savedTheme === "dark")
    icon.classList.toggle("fa-sun", savedTheme === "light")
    icon.classList.toggle("fa-moon", savedTheme === "dark")
  }

  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark")
    const isDarkMode = document.body.classList.contains("dark")

    // Change the icon based on the mode
    icon.classList.toggle("fa-sun", !isDarkMode)
    icon.classList.toggle("fa-moon", isDarkMode)

    // Save the theme to localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light")
  })
})
