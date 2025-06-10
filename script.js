
let url = "https://rickandmortyapi.com/api";
const container = document.getElementById('container')
const bt_container = document.getElementById('bt-container')
const bt_pg_next = document.getElementById('bt-pg-next')
const bt_pg_prev = document.getElementById('bt-pg-prev')
const container_pg = document.getElementById('container-pg')
const num_pg = document.getElementById('num-pg')
let page = 1
let nextUrl = '';
let prevUrl = '';


function CreateElementsInPage(result , lastPart) {
  const div = document.createElement('div')
  div.classList = 'card'
  if (result.image) {
    const image = document.createElement('img')
    image.src = `${result.image}`
    div.appendChild(image)
  }
  if (result.name) {
    const name = document.createElement('h1')
    name.innerHTML = `${result.name}`
    div.appendChild(name)
  }
  if (result.status) {
    const status = document.createElement('p')
    status.innerHTML = `${result.status}`
    div.appendChild(status)
  }
  if (result.species) {
    const species = document.createElement('p')
    species.innerHTML = `${result.species}`
    div.appendChild(species)
  }
  if (result.dimension) {
    const dimension = document.createElement('p')
    dimension.innerHTML = `${result.dimension}`
    div.appendChild(dimension)
  }
  if (result.type) {
    const type = document.createElement('p')
    type.innerHTML = `${result.type}`
    div.appendChild(type)
  }
  if (typeof result.episode === 'string') {
    const episode = document.createElement('p')
    episode.innerHTML = `${result.episode}`
    div.appendChild(episode)
  }
  if (result.air_date) {
    const air_date = document.createElement('p')
    air_date.innerHTML = `${result.air_date}`
    div.appendChild(air_date)
  }
  const linkShow = document.createElement('a')
  linkShow.innerHTML = 'Saiba mais'
  linkShow.id = `${result.id}`
  linkShow.href = `show.html?info=${result.url}`
  div.appendChild(linkShow)
  container.appendChild(div)
  num_pg.innerHTML = page
}

function fetchSection(endpoint) {
  fetch(`${endpoint}`)
  .then (response => {
    if (!response.ok) {
      throw new Error('Erro na requisição: ' + response.status);
    }
    return response.json(); // ou response.text() / response.blob()
  })
  .then(data => {
    nextUrl = data.info.next;
    prevUrl = data.info.prev;

    container.innerHTML = '';

    const parts = endpoint.split('/');
    const lastPart = parts[parts.length - 1];
    console.log(lastPart);
    data.results.forEach(result => {
      console.log(result);

      CreateElementsInPage(result, lastPart)
    })
  })
}


fetch(`${url}`)
.then(response => {
  if (!response.ok) {
    throw new Error('Erro na requisição: ' + response.status);
  }
  return response.json(); // ou response.text() / response.blob()
})
.then(data => {
  //console.log(data); // manipule os dados aqui
  Object.keys(data).forEach(key => {
    const button = document.createElement('button')
    button.innerText = `${key}`
    button.addEventListener('click', () => {
      container_pg.style = 'display:flex'
      // bt_container.style = 'display:none'
      if (key == 'characters') {
        container.innerHTML = ''
        page = 1
        fetchSection(`${Object.values(data)[0]}`)
      }
      if (key == 'locations') {
        container.innerHTML = ''
        page = 1
        fetchSection(`${Object.values(data)[1]}`)
      }
      if (key == 'episodes') {
        container.innerHTML = ''
        page = 1
        fetchSection(`${Object.values(data)[2]}`)
      }
    })
    bt_container.appendChild(button)
  })
})
.catch(error => {
  console.error('Erro:', error);
});


bt_pg_next.addEventListener('click', () => {
  if (nextUrl) {
    page++;
    container.innerHTML = '';
    fetchSection(nextUrl);
  }
});

bt_pg_prev.addEventListener('click', () => {
  if (prevUrl && page > 1) {
    page--;
    container.innerHTML = '';
    fetchSection(prevUrl);
  }
});
