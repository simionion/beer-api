export function BeerTemplate(beer) {
    return `
        <div class="beer_container" id="beer-${beer.id}" tabindex="0" role="article">
            <img class="beer_image" src="${beer.image_url}" alt="${beer.name}">
            <h2 class="beer_title">${beer.name}</h2>
            <p class="beer_ibu">IBU: ${beer.ibu}</p>
            <p class="beer_abv">${beer.abv}%</p>
        </div>
    `;
}
