const pokemonsNumber = 494;
//494
const flexContainer = document.querySelector('.flex-container');
const typeMap = 
{
    bug: 'Images/bug.jpg',
    dark: 'Images/dark.jpg',
    dragon: 'Images/dragon.jpg',
    electric: 'Images/electric.jpg',
    fairy: 'Images/fairy.jpg',
    fighting: 'Images/fighting.jpeg',
    fire: 'Images/fire.jpg',
    flying: 'Images/flying.jpg',
    grass: 'Images/grass.jpg',
    ghost: 'Images/ghost.jpeg',
    ground: 'Images/ground.jpg',
    ice: 'Images/ice.png',
    normal: 'Images/normal.jpg',
    poison: 'Images/poison.jpg',
    psychic: 'Images/psychic.jpg',
    rock: 'Images/rock.png',
    steel: 'Images/steel.png',
    water: 'Images/water.jpg' 
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const result = await fetch(url);
    const pokemon = await result.json();
    createPokemonCard(pokemon);
}

const fetchPokemons = async () => {
    for(let i=1; i <= pokemonsNumber; i++){
        await getPokemon(i);
    }
}

function createPokemonCard(pokemon){
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('flex-item');

    let id = pokemon.id;
    let name = pokemon.name;
    let pokemonListing = document.createElement('div');
    pokemonListing.innerHTML = `${id}. ${name}`;
    pokemonListing.classList.add('card-title')
 
    let img = document.createElement('img');
    img.setAttribute('src', pokemon.sprites.front_default);
    


    let typeDiv = document.createElement('div');    
    let types = pokemon.types;
    let typeInnerHtml = 'Type:';

    for(let i = 0; i < types.length; i++){
        if(i === 0){
            typeInnerHtml += ` ${types[i].type.name}`;
        } else{
            typeInnerHtml += `/${types[i].type.name}`;
        }
        
    }
    typeDiv.innerText = typeInnerHtml;

    let height = pokemon.height;
    let weight = pokemon.weight;
    let heightDiv = document.createElement('div');
    let weightDiv = document.createElement('div');
    heightDiv.innerText = `Height: ${height}`;
    weightDiv.innerText = `Weight: ${weight} lbs`;
    if(types[0].type.name == 'ghost' || types[0].type.name == 'rock' || types[0].type.name == 'psychic' || types[0].type.name == 'fire' || types[0].type.name == 'dark' || types[0].type.name == 'steel'){
        pokemonEl.style.color = 'white';
    }
    
   

    pokemonEl.appendChild(pokemonListing);
    pokemonEl.appendChild(img);
    pokemonEl.appendChild(typeDiv);
    pokemonEl.appendChild(heightDiv);
    pokemonEl.appendChild(weightDiv);
    pokemonEl.style.backgroundImage = `url('${typeMap[types[0].type.name]}')`;

    pokemonEl.addEventListener('mouseover', function(){
        img.setAttribute('src', pokemon.sprites.front_shiny)
    })

    pokemonEl.addEventListener('mouseout', function(){
        img.setAttribute('src', pokemon.sprites.front_default)
    })

    flexContainer.appendChild(pokemonEl);
}
fetchPokemons();