export { fetchCountries }

function fetchCountries(name) {
    // let country = name.currentTarget.value;
   
   return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
   .then(resp => {
    console.log(resp);
    if(resp.status === 404) {
        throw new Error();
    }
    return resp.json();
   });
//    .then(console.log);
    
}

