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


function ModalTemplate() {
    return `
<dialog aria-hidden="true" aria-labelledby="modal_title" class="modal" id="modal" role="alertdialog" style="display:none;">
	<div class="modal_container">
        <h2 class="modal_title" id="modal_title"></h2>
        <div class="modal_content" id="modal_content"></div>
        <button class="modal_btn_close" id="modal_btn_close">&cross;</button>
	</div>
</dialog>
    `;
}


function create_modal_context() {
    document.body.insertAdjacentHTML('beforeend', ModalTemplate());

    const modal = document.getElementById('modal');
    const modal_title = document.getElementById('modal_title');
    const modal_content = document.getElementById('modal_content');
    const modal_btn_close = document.getElementById('modal_btn_close');
    modal_btn_close.addEventListener('click', close);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            close();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            close();
        }
    });

    function open(title, content) {
        modal_title.textContent = title;
        modal_content.innerHTML = content;
        modal.attributes.ariaHidden = false;
        modal.showModal();
        modal.style.display = 'flex';
        document.querySelector('.modal [tabindex]').focus();
    }

    function close() {
        modal.attributes.ariaHidden = true;
        modal.close();
        modal.style.display = 'none';
    }

    return {open, close}
}

function create_order_dropdown(order_options) {
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown';
    dropdown.tabIndex = 0;

    const dropbtn = document.createElement('button');
    dropbtn.className = 'dropbtn';
    dropbtn.innerHTML = 'Order &#9660;';
    dropbtn.tabIndex = 0;
    dropdown.appendChild(dropbtn);



    const dropdownContent = document.createElement('div');
    dropdownContent.className = 'dropdown-content';

    order_options.forEach((item) => {
        const dropdownItem = document.createElement('div');
        dropdownItem.className = 'dropdown-item';
        dropdownItem.tabIndex = 0;

        const itemLabel = document.createElement('span');
        itemLabel.textContent = item.name;
        itemLabel.tabIndex = 0;
        dropdownItem.appendChild(itemLabel);

        const submenu = document.createElement('div');
        submenu.className = 'dropdown-submenu';

        for (let i = 1; i <= item.qty; i++) {
            const subItem = document.createElement('a');
            subItem.href = '#';
            subItem.textContent = i;
            subItem.tabIndex = 0;
            submenu.appendChild(subItem);
        }

        dropdownItem.appendChild(submenu);
        dropdownContent.appendChild(dropdownItem);
    });

    dropdown.appendChild(dropdownContent);
    return dropdown.outerHTML;
}


/*APP*/
const order_options = [
    {name: "Glass", qty: 3},
    {name: "Can", qty: 2},
    {name: "Box", qty: 4}
];

const modal = create_modal_context();


get_data().then(beers => {
    const app_container = document.getElementById('app');

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


function run_on_enter(callback) {
    return function (e) {
        if (e.key === 'Enter') {
            callback();
        }
    }
}

