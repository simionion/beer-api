import {create_order_dropdown} from './components/dropdown/dropdown.js';
import {create_modal_context} from './components/modal/modal.js';

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
async function get_data() {
    const response = await fetch('https://api.jsonbin.io/v3/b/6630fd9be41b4d34e4ecd1f9');
    const beer_api = await response.json();
    return beer_api["record"];
}


function BeerTemplate(beer) {
    return `
        <div class="beer_container" id="beer-${beer.id}" tabindex="0" role="article">
            <img class="beer_image" src="${beer.image_url}" alt="${beer.name}">
            <h2 class="beer_title">${beer.name}</h2>
            <p class="beer_ibu">IBU: ${beer.ibu}</p>
            <p class="beer_abv">${beer.abv}%</p>
        </div>
    `;
}


function BeerModalTemplate(beer, order_options) {
    const ordering_options_dropdown = create_order_dropdown(order_options);

    return `
        <div class="modal_beer_container" >
           <div class="modal_beer_img_prewrapper" tabindex="0" role="article">
                <span class="modal_beer_img_wrapper">
                   <img class="modal_beer_image" src="${beer.image_url}" alt="${beer.name}" />
                    <p class="modal_beer_ibu">IBU<br/>${beer.ibu}</p>
                    <p class="modal_beer_abv">${beer.abv}%</p>
                </span>
          </div>
            <p class="modal_beer_description">${beer.description}</p>
            <div class="modal_beer_footer">
            <h2 class="modal_beer_title ">${beer.name}</h2>
             ${ordering_options_dropdown}
            </div>
        </div>
    `;
}

function run_on_enter(callback) {
    return function (e) {
        if (e.key === 'Enter') {
            callback();
        }
    }
}


/*APP*/
const order_options = [{name: "Glass", qty: 3}, {name: "Can", qty: 2}, {name: "Box", qty: 4}];

const modal = create_modal_context();


get_data().then(beers => {
    const app_container = document.getElementById('app');
    app_container.innerHTML = ''; // Clear the loading message

    beers.forEach(beer => {

        beer.image_url = "images/" + beer.image_url.split('/').pop();

        const beer_container = document.createElement('article');
        beer_container.innerHTML = BeerTemplate(beer);
        const modal_trigger = () => {
            modal.open("", BeerModalTemplate(beer, order_options));
        };
        beer_container.addEventListener('click', modal_trigger);
        beer_container.addEventListener('keydown', run_on_enter(modal_trigger));
        app_container.appendChild(beer_container);
    });
});


