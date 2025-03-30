function _getTheme() {
    console.log("localstorage_theme:", localStorage.theme);
  const isDark =
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", isDark);
}
export const getTheme = `(${_getTheme})();`;
