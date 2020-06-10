/**
 * Example Task:
 * 
 * Create a simple webpage which displays the data from an opensource API.
 * 
 * Use the following Javascript API's / concepts:
 *  - Use the Fetch API (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
 *  - Use promises (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
 *  - Use URL API (https://developer.mozilla.org/en-US/docs/Web/API/URL)
 *  - Display the results of an API call on the page or in the console.
 *  - Use an object oriented approach
 *  - Use at least one constructor function 
 *  - Use this open API https://data.rijksmuseum.nl/object-metadata/api/
 *      Create an account, then in account settings under the 'advanced' tab you find the API key request button.
 *      You need this API Key to make API calls.
 */


let RijksmuseumApi = function (key, language) {
    this.apiKey = key;
    this.language = typeof language !== 'undefined' ? language : 'nl';
    this.url = "https://www.rijksmuseum.nl";

    this.fetch = function (endpoint, query) {
        const requestOptions = {
            method: "GET",
            headers: new Headers()
        }

        const url = new URL(endpoint, this.url);
        
        //const searchParams = new URLSearchParams(query);
        url.searchParams.append('key', this.apiKey);
        
        console.log(url.toString());
        const request = new Request(url.toString(), requestOptions);

        fetch(request)
            .then(response => {
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new TypeError("Oops, we haven't got JSON!");
                }

                return response.json();
            })
            .then(data => {
                return data;
            })
            .catch(error => console.error(error));
    }

    this.getCollection = function (query) {
        let endpoint = `/api/${this.language}/collection`;

        const result = this.fetch(endpoint, query);
        return result;
    }

    this.getCollectionImages = function () {
        
    }
}
