xport default function fetchCountries(name) {
    const apiUrl = `https://restcountries.com/v3.1/name/${name}`;
  
    return fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Country not found');
        }
        return response.json();
      })
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  }