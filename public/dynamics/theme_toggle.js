document.addEventListener("DOMContentLoaded", () => {
  const themeToggleButton = document.getElementById("theme-toggle");
  const icon = themeToggleButton.querySelector("i");
  const currentTheme = localStorage.getItem("theme") || "light";

  // Apply the stored theme and set the initial icon based on the theme
  document.body.setAttribute("data-theme", currentTheme);
  icon.classList.add(currentTheme === "dark" ? "fas": "fa-sun" , "fas", "fa-moon");

  themeToggleButton.addEventListener("click", () => {
    const isLightMode = document.body.getAttribute("data-theme") === "light";
    const newTheme = isLightMode ? "dark" : "light";
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    // Update icon based on the new theme
    icon.className = newTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
  });
});
