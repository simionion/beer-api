import {create_order_dropdown} from "../dropdown/dropdown.js";

export function BeerModalTemplate(beer, order_options) {
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
             ${order_options.length ? ordering_options_dropdown : "Out of stock"}
            </div>
        </div>
    `;
}
