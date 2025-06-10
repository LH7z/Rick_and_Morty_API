const params = new URLSearchParams(window.location.search);
const info = params.get('info');

const parts = info.split('/');
const categoria = parts[parts.length - 2];


const infos = document.getElementsByClassName('infos')[0]
const big_infos = document.getElementById('big-infos')
const info_bg = document.getElementById('info-bg')

fetch(`${info}`)
.then(response => {
  if (!response.ok) {
    throw new Error('Erro na requisição: ' + response.status);
  }
  return response.json(); // ou response.text() / response.blob()
})
.then(data => {
  if (categoria == "character") {
    createChar(data)
  }
  if (categoria == "location") {
    createLoc(data)
  }
  if (categoria == "episode") {
    createEp(data)
  }
})
.catch(error => {
  console.error('Erro:', error);
});


function createChar(data) {

  const image = document.getElementById('image')
  image.src = data.image
  const name = document.createElement('h1')
  name.innerHTML = `${data.name}`
  infos.appendChild(name)
  const gender = document.createElement('h3')
  gender.innerHTML = `Gênero: ${data.gender}`
  infos.appendChild(gender)
  const species = document.createElement('h3')
  species.innerHTML = `Espécie: ${data.species}`
  infos.appendChild(species)
  const status = document.createElement('h3')
  status.innerHTML = `Status: ${data.status}`
  infos.appendChild(status)
  const type = document.createElement('h3')
  type.innerHTML = `Tipo: ${data.type}`
  infos.appendChild(type)
  const origin = document.createElement('h3')
  origin.innerHTML = `Origem: ${data.origin['name']}`
  infos.appendChild(origin)
  const location = document.createElement('h3')
  location.innerHTML = `Localização: ${data.location['name']}`
  infos.appendChild(location)

  data.episode.forEach(element => {
    fetch(`${element}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.status);
      }
      return response.json(); // ou response.text() / response.blob()
    })
    .then(data => {
      const div = document.createElement('div')
      div.classList.add('card')
      div.style = 'padding:1rem;margin: 0 1rem;'
      const epName = document.createElement('h1')
      epName.innerHTML = `${data.name}`
      div.appendChild(epName)

      const episode = document.createElement('h3')
      episode.innerHTML = `${data.episode}`
      div.appendChild(episode)

      const airDate = document.createElement('h3')
      airDate.innerHTML = `${data.air_date}`
      div.appendChild(airDate)

      const url = document.createElement('a')
      url.href = `show.html?info=${data.url}`  //Escrever pra dar fetch no data.url
      url.innerHTML = 'Saiba mais'
      div.appendChild(url)

      big_infos.appendChild(div)
      //console.log(data); // manipule os dados aqui
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  });
}

function createLoc(data) {
  console.log(data);

  // dimension name type Residents
  info_bg.innerHTML = 'Habitantes do planeta:'
  const name = document.createElement('h1')
  name.innerHTML = `${data.name}`
  infos.appendChild(name)
  const dimension = document.createElement('h3')
  dimension.innerHTML = `Dimensão: ${data.dimension}`
  infos.appendChild(dimension)
  const type = document.createElement('h3')
  type.innerHTML = `Tipo: ${data.type}`
  infos.appendChild(type)

  data.residents.forEach(element => {
    fetch(`${element}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.status);
      }
      return response.json(); // ou response.text() / response.blob()
    })
    .then(data => {

      const div = document.createElement('div')
      div.classList.add('card')
      div.style = 'padding:1rem;margin: 0 1rem;'

      const image = document.createElement('img')
      image.src = data.image
      image.style = 'width:200px;pointer-events: none;user-drag: none;-webkit-user-drag: none;'
      div.appendChild(image)

      const name = document.createElement('h1')
      name.innerHTML = `${data.name}`
      div.appendChild(name)

      const gender = document.createElement('h3')
      gender.innerHTML = `${data.gender}`
      div.appendChild(gender)

      const species = document.createElement('h3')
      species.innerHTML = `${data.species}`
      div.appendChild(species)

      const status = document.createElement('h3')
      status.innerHTML = `${data.status}`
      div.appendChild(status)

      const type = document.createElement('h3')
      type.innerHTML = `${data.type}`
      div.appendChild(type)

      const url = document.createElement('a')
      url.href = `show.html?info=${data.url}`  //Escrever pra dar fetch no data.url
      url.innerHTML = 'Saiba mais'
      div.appendChild(url)

      big_infos.appendChild(div)
      //console.log(data); // manipule os dados aqui
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  });
}

function createEp(data) {
  console.log(data);

  // dimension name type Residents
  info_bg.innerHTML = 'Personagens deste episodio:'
  const name = document.createElement('h1')
  name.innerHTML = `${data.name}`
  infos.appendChild(name)
  const air_date = document.createElement('h3')
  air_date.innerHTML = `Data de lançamento: ${data.air_date}`
  infos.appendChild(air_date)
  const episode = document.createElement('h3')
  episode.innerHTML = `Episodio: ${data.episode}`
  infos.appendChild(episode)


  data.characters.forEach(element => {
    fetch(`${element}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.status);
      }
      return response.json(); // ou response.text() / response.blob()
    })
    .then(data => {
      const div = document.createElement('div')
      div.classList.add('card')
      div.style = 'padding:1rem;margin: 0 1rem;'

      const image = document.createElement('img')
      image.src = data.image
      image.style = 'width:200px;pointer-events: none;user-drag: none;-webkit-user-drag: none;'
      div.appendChild(image)

      const name = document.createElement('h1')
      name.innerHTML = `${data.name}`
      div.appendChild(name)

      const gender = document.createElement('h3')
      gender.innerHTML = `${data.gender}`
      div.appendChild(gender)

      const species = document.createElement('h3')
      species.innerHTML = `${data.species}`
      div.appendChild(species)

      const status = document.createElement('h3')
      status.innerHTML = `${data.status}`
      div.appendChild(status)

      const type = document.createElement('h3')
      type.innerHTML = `${data.type}`
      div.appendChild(type)

      const url = document.createElement('a')
      url.href = `show.html?info=${data.url}`  //Escrever pra dar fetch no data.url
      url.innerHTML = 'Saiba mais'
      div.appendChild(url)

      big_infos.appendChild(div)
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  });
}

let isDragging = false


function autoScroll() {
  if (!isDragging) {
    big_infos.scrollLeft += 1;
  }


  // Quando chega ao fim, volta pro início
  if (big_infos.scrollLeft + big_infos.clientWidth >= big_infos.scrollWidth) {
    big_infos.scrollLeft = 0;
  }
}

setInterval(autoScroll, 20); // quanto menor o valor, mais rápido


let isDown = false;
let startX;
let scrollLeft;

big_infos.addEventListener('mousedown', (e) => {
  isDown = true;
  isDragging = true;
  big_infos.classList.add('active');
  startX = e.pageX - big_infos.offsetLeft;
  scrollLeft = big_infos.scrollLeft;
});

big_infos.addEventListener('mouseleave', () => {
  isDown = false;
  setTimeout(() => {
    isDragging = false;
  }, 4000);
});

big_infos.addEventListener('mouseup', () => {
  isDown = false;
  setTimeout(() => {
    isDragging = false;
  }, 4000);
});

big_infos.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - big_infos.offsetLeft;
  const walk = (x - startX) * 1; //Sensibilidade
  big_infos.scrollLeft = scrollLeft - walk;
});
