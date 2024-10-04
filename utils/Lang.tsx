function getLangFromLocalStorage() {
      return localStorage.getItem("selectedLang") || "en";
    }

export default getLangFromLocalStorage;