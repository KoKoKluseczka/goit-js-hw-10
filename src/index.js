import fetchCountries from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix'; 

const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list ul');
const countryInfo = document.querySelector('.country-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

searchBox.addEventListener('input', debounce(handleSearch, 300));

function handleSearch() {
  const searchTerm = searchBox.value.trim();

  if (searchTerm) {
    fetchCountries(searchTerm)
      .then((countries) => {
        clearUI();

        if (countries.length > 10) {
          showTooManyMatchesError();
        } else if (countries.length >= 2) {
          showCountryList(countries);
        } else if (countries.length === 1) {
          showCountryInfo(countries[0]);
        } else {
          showNotFoundError();
        }
      })
      // .catch(() => {
      //   showError();
      // });
  } else {
    clearUI();
  }
}

function showTooManyMatchesError() {
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
}

function showCountryList(countries) {
  const listItems = countries.map((country) => {
    const listItem = document.createElement('li');
    listItem.textContent = country.name.official;
    listItem.addEventListener('click', () => showCountryInfo(country));
    return listItem;
  });

  countryList.innerHTML = '';
  listItems.forEach((item) => countryList.appendChild(item));
}

function showCountryInfo(country) {
  const flag = country.flags.svg;
  const name = country.name.official;
  const capital = country.capital;
  const population = country.population;
  // const languages = country.languages.map(lang => lang).join(', ');
  const languages = Object.values(country.languages).join(', ');

  const countryCard = countryInfo.querySelector('.country-card');
  countryCard.innerHTML = '';
  // const flagImg = countryCard.querySelector('.flag');
  const flagImg = document.createElement('img');
  flagImg.className = 'flag';
  flagImg.src = flag;
  flagImg.alt = 'Flag';
  countryCard.appendChild(flagImg);
  // const nameElement = countryCard.querySelector('.country-name');
  const nameElement = document.createElement('h2');
  nameElement.className = 'country-name';
  nameElement.textContent = name;
  countryCard.appendChild(nameElement);
  // const capitalElement = countryCard.querySelector('.capital');
  const capitalElement = document.createElement('p');
  capitalElement.className = 'capital'; // Dodaliśmy klasę 'capital'
  capitalElement.innerHTML = `<strong>Capital:</strong> <span>${capital}</span>`;
  countryCard.appendChild(capitalElement);
  // const populationElement = countryCard.querySelector('.population');
  const populationElement = document.createElement('p');
  populationElement.innerHTML = `<strong>Population:</strong> <span>${population}</span>`;
  countryCard.appendChild(populationElement);
  // const languagesElement = countryCard.querySelector('.languages');
  const languagesElement = document.createElement('p');
  languagesElement.className = 'languages';
  languagesElement.innerHTML = `<strong>Languages:</strong> <span>${languages}</span>`;
  countryCard.appendChild(languagesElement);

  flagImg.src = flag;
  nameElement.textContent = name;
  capitalElement.textContent = capital;
  populationElement.textContent = population;
  languagesElement.textContent = languages;

  countryInfo.style.display = 'block';
}

function showNotFoundError() {
  Notiflix.Notify.failure('Oops, there is no country with that name.');
}

function showError() {
  error.style.display = 'block';
}

function clearUI() {
  countryList.innerHTML = '';
  countryInfo.style.display = 'none';
  error.style.display = 'none';
  loader.style.display = 'none';
}

clearUI();