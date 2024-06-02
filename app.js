import {create_modal_context} from './components/modal/modal.js';
import {BeerModalTemplate} from './components/modal_beer/modal_beer.js';
import {BeerTemplate} from './components/beer/beer.js';
import {get_data, random_filter, random_int, run_on_enter} from './others.js';


const modal = create_modal_context();

get_data().then(beers => {
    const app_container = document.getElementById('app');
    app_container.innerHTML = ''; // Clear the loading message

    beers.forEach(beer => {
        beer.image_url = "images/" + beer.image_url.split('/').pop();

        const beer_container = document.createElement('article');
        beer_container.innerHTML = BeerTemplate(beer);

        beer_container.querySelector(".beer_container").style.background = `linear-gradient(90deg, var(--bg${beer.ibu.toString()[0]}) 0%, var(--bg1) 100%)`;


        const order_options = random_filter([
            {name: "Glass", qty: random_int(1, 4)},
            {name: "Can", qty: random_int(1, 4)},
            {name: "Box", qty: random_int(1, 4)}
        ]);


        const modal_trigger = () => {
            modal.open("", BeerModalTemplate(beer, order_options));
        };
        beer_container.addEventListener('click', modal_trigger);
        beer_container.addEventListener('keydown', run_on_enter(modal_trigger));
        app_container.appendChild(beer_container);
    });
});


