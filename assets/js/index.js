//index.js
function includeHTML(elementId, filePath) {
  fetch(filePath)
      .then(response => response.text())
      .then(data => {
          document.getElementById(elementId).innerHTML = data;
      })
      .catch(error => console.error(`Error loading ${filePath}:`, error));
}

// Include parts
includeHTML("header", "templates/header.html");
includeHTML("company", "templates/companies.html");
includeHTML("about", "templates/about.html");
includeHTML("projects", "templates/projects.html");
includeHTML("skills", "templates/skills.html");
includeHTML("edu", "templates/edu.html");
includeHTML("contact", "templates/contact.html")
includeHTML("footer", "templates/footer.html");    

// Initialize AOS
AOS.init({
  duration: 1000, // Animation duration in milliseconds
  once: true, // Animation happens only once (when scrolled into view)
});

function showProjects(projectDiv) {
  const projects = ["pfront", "pback", "pfull"];

  projects.forEach((div) => {
    const element = document.querySelector(`#${div}`);
    if (element) {
      if (div === projectDiv) {
        element.classList.remove("d-none");
      } else {
        element.classList.add("d-none");
      }
    }
  });
}
// Move text
const text = "Samah Ali | سماح علي";
let index = 0;
function typeWriter() {
  if (index < text.length) {
    document.getElementById("typewriter").innerHTML += text.charAt(index);
    index++;
    setTimeout(typeWriter, 100);
  }
}
window.onload = typeWriter;

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