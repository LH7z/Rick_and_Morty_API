
// ENDPOINTS DA API
const endpoints = {
    characters: "https://rickandmortyapi.com/api/character",
    locations: "https://rickandmortyapi.com/api/location",
    episodes: "https://rickandmortyapi.com/api/episode"
};

// ELEMENTOS DO HTML
const container = document.getElementById('container');
const bt_container = document.getElementById('bt-container');
const bt_pg_next = document.getElementById('bt-pg-next');
const bt_pg_prev = document.getElementById('bt-pg-prev');
const container_pg = document.getElementById('container-pg');
const num_pg = document.getElementById('num-pg');

// VARIÁVEIS DE CONTROLE
let page = 1;
let nextUrl = '';
let prevUrl = '';


// CRIA OS CARDS NA TELA
function CreateElementsInPage(result) {

    const div = document.createElement('div');
    div.classList.add('card');

    if (result.image) {
        const image = document.createElement('img');
        image.src = result.image;
        image.alt = result.name || 'Imagem';
        div.appendChild(image);
    }

    if (result.name) {
        const name = document.createElement('h1');
        name.textContent = result.name;
        div.appendChild(name);
    }

    if (result.status) {
        const status = document.createElement('p');
        status.textContent = result.status;
        div.appendChild(status);
    }

    if (result.species) {
        const species = document.createElement('p');
        species.textContent = result.species;
        div.appendChild(species);
    }

    if (result.dimension) {
        const dimension = document.createElement('p');
        dimension.textContent = result.dimension;
        div.appendChild(dimension);
    }

    if (result.type) {
        const type = document.createElement('p');
        type.textContent = result.type;
        div.appendChild(type);
    }

    if (typeof result.episode === 'string') {
        const episode = document.createElement('p');
        episode.textContent = result.episode;
        div.appendChild(episode);
    }

    if (result.air_date) {
        const air_date = document.createElement('p');
        air_date.textContent = result.air_date;
        div.appendChild(air_date);
    }

    const linkShow = document.createElement('a');
    linkShow.textContent = 'Saiba mais';
    linkShow.id = result.id;
    linkShow.href = `show.html?info=${encodeURIComponent(result.url)}`;

    div.appendChild(linkShow);

    container.appendChild(div);
}


// FAZ A REQUISIÇÃO PARA A API
async function fetchSection(endpoint) {

    try {

        console.log("Endpoint solicitado:", endpoint);

        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
        }

        const data = await response.json();

        // ATUALIZA AS URLS DE PAGINAÇÃO
        nextUrl = data.info.next;
        prevUrl = data.info.prev;

        // LIMPA OS CARDS ANTERIORES
        container.innerHTML = '';

        // CRIA OS NOVOS CARDS
        data.results.forEach(result => {
            CreateElementsInPage(result);
        });

        // ATUALIZA O NÚMERO DA PÁGINA
        num_pg.textContent = page;

    } catch (error) {

        console.error('Erro ao buscar dados:', error);

    }
}


// CRIA OS BOTÕES DOS ENDPOINTS
Object.entries(endpoints).forEach(([key, endpoint]) => {

    const button = document.createElement('button');

    button.textContent = key;

    button.addEventListener('click', () => {

        container_pg.style.display = 'flex';

        container.innerHTML = '';

        page = 1;

        fetchSection(endpoint);

    });

    bt_container.appendChild(button);

});


// BOTÃO PRÓXIMA PÁGINA
bt_pg_next.addEventListener('click', () => {

    if (nextUrl) {

        page++;

        fetchSection(nextUrl);

    }

});


// BOTÃO PÁGINA ANTERIOR
bt_pg_prev.addEventListener('click', () => {

    if (prevUrl && page > 1) {

        page--;

        fetchSection(prevUrl);

    }

});
