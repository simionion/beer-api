export function BeerTemplate(beer) {
    return `
        <div class="beer_container" id="beer-${beer.id}" tabindex="0" aria-label="Beer named: ${beer.name}, with ${beer.ibu} bitterness units, and ${beer.abv}% alcohol." 
          itemscope itemtype="https://schema.org/LiquorStore" aria-describedby="beer-${beer.id}-description" aria-labelledby="beer-${beer.id}-title"
        >
            <img class="beer_image" src="${beer.image_url}" alt="${beer.name}" itemprop="image">
            <h2 class="beer_title" id="beer-${beer.id}-title" itemprop="name">${beer.name}</h2>
            <p class="beer_description visually-hidden" id="beer-${beer.id}-description" itemprop="description">${beer.description}</p>
            <p class="beer_ibu" title="The International Bitterness Units of the beer">IBU: ${beer.ibu}</p>
            <p class="beer_abv" title="The alcohol by volume percentage of the beer">${beer.abv}%</p>
        </div>
    `;
}
