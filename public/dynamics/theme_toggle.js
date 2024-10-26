document.addEventListener("DOMContentLoaded", () => {
  const themeToggleButton = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme") || "light";

  // Apply stored theme
  document.body.setAttribute("data-theme", currentTheme);

  // Update icon based on theme
  themeToggleButton.querySelector("i").className =
    currentTheme === "dark" ? "fas fa-moon" : "fas fa-sun";

  themeToggleButton.addEventListener("click", () => {
    const newTheme = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    // Update icon based on new theme
    themeToggleButton.querySelector("i").className =
      newTheme === "dark" ? "fas fa-moon" : "fas fa-sun";
  });
});
