
/**
 * @typedef {Object} Beer
 * @property {number} id - The unique identifier for the beer.
 * @property {string} name - The name of the beer.
 * @property {number} ibu - The International Bitterness Units of the beer.
 * @property {number} abv - The alcohol by volume percentage of the beer.
 * @property {string} description - A description of the beer.
 * @property {string} image_url - The URL of an image of the beer.
 */


/**
 * Fetches a list of beers.
 *
 * @returns {Promise<Beer[]>} A promise that resolves to an array of Beer objects.
 */
export async function get_data() {
    const response = await fetch('https://api.jsonbin.io/v3/b/6630fd9be41b4d34e4ecd1f9');
    const beer_api = await response.json();
    return beer_api["record"];
}


export function run_on_enter(callback) {
    return function (e) {
        if (e.key === 'Enter') {
            callback();
        }
    }
}
