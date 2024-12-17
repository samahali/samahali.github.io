//index.js

const hamburger = document.getElementById('hamburger'); 
const menu = document.querySelector('.menu'); 

hamburger.addEventListener('click', function () { 
    const hamIcon = this.querySelector('.hamburger-icon'); 
    const crossIcon = this.querySelector('.cross-icon'); 
    if (hamIcon.style.display === "none") { 
        hamIcon.style.display = "inline-block"
        menu.style.display = "none"
        crossIcon.style.display = "none"
    } 
    else { 
        crossIcon.style.display = "inline-block"
        hamIcon.style.display = "none"
        menu.style.display = "block"
    } 
});
// Function to fetch language data
async function fetchLanguageData(lang) {
    const response = await fetch(`languages/${lang}.json`);
    return response.json();
  }
  
  // Function to set the language preference
  function setLanguagePreference(lang) {
    localStorage.setItem("language", lang);
    location.reload();
  }
  
  // Function to update content based on selected language
  function updateContent(langData) {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
  
      if (element.tagName === "INPUT" && key === "placeholder_text") {
        // If the element is an input with placeholder_text attribute, set placeholder
        element.placeholder = langData[key];
      } else {
        // For other elements, set text content
        //element.textContent = langData[key];
        element.innerHTML = langData[key];
      }
    });
  }
  
  // Function to change language
  async function changeLanguage() {
    let lang = document.querySelector("#lang").innerHTML;
    lang = lang == "English" ? "en": "ar";
    await setLanguagePreference(lang);
  
    const langData = await fetchLanguageData(lang);
    updateContent(langData);
  
    //
    toggleArabicStylesheet(lang); // Toggle Arabic stylesheet
  }
  
  // Function to toggle Arabic stylesheet based on language selection
  function toggleArabicStylesheet(lang) {
    const head = document.querySelector("head");
    const link = document.querySelector("#styles-link");
    const responsiveLink = document.querySelector("#responsive-link")
    if (link) {
      head.removeChild(link); // Remove the old stylesheet link
      head.removeChild(responsiveLink);
    } else if (lang === "ar") {
      const newLink = document.createElement("link");
      const newResponsiveLink = document.createElement("link");
      newLink.id = "styles-link";
      newLink.rel = "stylesheet";
      newLink.href = "./assets/css/style-ar.css"; // Path to Arabic stylesheet
      newResponsiveLink.id = "responsive-link";
      newResponsiveLink.rel = "stylesheet";
      newResponsiveLink.href = "./assets/css/responsive-ar.css"
      head.appendChild(newLink);
      head.appendChild(newResponsiveLink);
    }
    const html = document.documentElement;
            
    if (lang === 'en') {
        html.setAttribute('lang', 'en');
        html.setAttribute('dir', 'ltr');
    } else if (lang === 'ar') {
        html.setAttribute('lang', 'ar');
        html.setAttribute('dir', 'rtl');
    }
  }
  
  // Call updateContent() on page load
  window.addEventListener("DOMContentLoaded", async () => {
    const userPreferredLanguage = localStorage.getItem("language") || "en";
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);
    toggleArabicStylesheet(userPreferredLanguage);
  });