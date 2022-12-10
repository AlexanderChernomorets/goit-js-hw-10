import './css/styles.css';
import { fetchCountries } from './fetchCountries'
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const searchEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

searchEl.addEventListener('input', debounce(countrySearch, DEBOUNCE_DELAY));
document.getElementById('search-box').placeholder = 'Enter country name';


function countrySearch(e) {
    let name = e.target.value.trim();
    if(name === ''){
        clearContent();
    } else {
        fetchHandler(name);
    }
    
    // console.log(name);
}

function fetchHandler(name) {
    fetchCountries(name)
    .then(data => {
        console.log(data);
        if(data.lenght > 10){
            clearContent();
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            return
        } if(data.lenght > 2 && data.lenght < 10) {
            clearContent();
            countryListMarkup(data);
            return
        } if(data.lenght = 1) {
            clearContent();
            countryListMarkup(data);
            countryInfoMarkup(data);
            return
        }
    })
    .catch(error => {
        clearContent();
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
}

function countryListMarkup(data) {
    const markup = data.map(({ name: { official }, flags: { svg } }) => {
        return `<li><img src=${svg} width='50'></img>${official}</li>`;
    })
    countryListEl.innerHTML = markup.join('');
}

function countryInfoMarkup(data) {
    const markup = data.map(({ capital, population, languages }) => {
        return `<p>Capital: ${capital}</p><p>Population: ${population}</p><p>Languages: ${Object.values(
            languages
          )}</p>`;
    })
    countryInfoEl.innerHTML = markup.join('');
}

 function clearContent() {
    countryListEl.innerHTML = '';
    countryInfoEl.innerHTML = '';
 }