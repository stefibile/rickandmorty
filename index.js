// MODO OSCURO

const lightModeButton = document.getElementById("light-mode");
const body = document.getElementById("body");
const label = document.getElementById("toggle-label");

lightModeButton.onclick = () => {
  body.classList.toggle("light-mode");
  if (body.className === "light-mode") {
    label.innerHTML = "Modo oscuro";
  } else {
    label.innerHTML = "Modo claro";
  }
};

// MOSTRAR U OCULTAR SECCIONES

const notFound = document.querySelector("#not-found");

const showEpisodes = document.querySelector("#show-episodes");
const showLocations = document.querySelector("#show-locations");
const showCharacters = document.querySelector("#show-characters");

const inputEpisodes = document.querySelector("#input-episodes");
const inputLocations = document.querySelector("#input-locations");
const inputCharacters = document.querySelector("#input-characters");

const episodes = document.querySelector("#episodes");
const locations = document.querySelector("#locations");
const characters = document.querySelector("#characters");
const details = document.querySelector("#details");
const pagination = document.querySelector("#pagination");
const totalResults = document.querySelector("#totalResults");
const resultContainer = document.querySelector("#results-container");

const showSection = (section) => {
  if (section.classList.contains("hidden")) {
    return section.classList.remove("hidden");
  }
};

const hideSection = (section) => {
  if (section.classList.contains("hidden")) {
    return section;
  } else {
    return section.classList.add("hidden");
  }
};

showEpisodes.onclick = () => {
  showSection(episodes);
  showSection(inputEpisodes);
  showSection(pagination);
  showSection(resultContainer);
  hideSection(locations);
  hideSection(characters);
  hideSection(inputCharacters);
  hideSection(inputLocations);
  hideSection(details);
  allEpisodes();
  resetPagination();
};

showLocations.onclick = () => {
  showSection(locations);
  showSection(inputLocations);
  showSection(pagination);
  showSection(resultContainer);
  hideSection(characters);
  hideSection(episodes);
  hideSection(inputCharacters);
  hideSection(inputEpisodes);
  hideSection(details);
  allLocations();
  resetPagination();
};

showCharacters.onclick = () => {
  showSection(characters);
  showSection(inputCharacters);
  showSection(pagination);
  showSection(resultContainer);
  hideSection(episodes);
  hideSection(locations);
  hideSection(inputEpisodes);
  hideSection(inputLocations);
  hideSection(details);
  resetPagination();
};

showNotFound = () => {
  hideSection(episodes);
  hideSection(locations);
  hideSection(characters);
  showSection(notFound);
  hideSection(pagination);
  hideSection(resultContainer);
};

const baseUrl = "https://rickandmortyapi.com/api/";
let toFetch = "";
let sectionOpened = "";
let toFilter = [];

//FETCH MOSTRAR TODOS LOS PERSONAJES

fetch(`${baseUrl}character`)
  .then((res) => res.json())
  .then((data) => {
    createCharacterCards(data.results);
    toFilter = data.results;
    sectionOpened = "character"
  });

//FETCH MOSTRAR EPISODIOS

const allEpisodes = () => {
  fetch(`${baseUrl}episode`)
    .then((res) => res.json())
    .then((data) => {
      createEpisodesCards(data.results);
      toFilter = data.results;
      sectionOpened = "episode"
    });
};

//FETCH MOSTRAR LOCACIONES

const allLocations = () => {
  fetch(`${baseUrl}location`)
    .then((res) => res.json())
    .then((data) => {
      createLocationsCards(data.results);
      toFilter = data.results;
      sectionOpened = "location"
    });
};

//FETCH BUSCAR PERSONAJES

const findCharacters = (characterToSearch) => {
  fetch(`${baseUrl}character/?name=${characterToSearch}`)
    .then((res) => res.json())
    .then((data) => {
      !data.results ? showNotFound() : createCharacterCards(data.results);
    });
};

//FETCH BUSCAR EPISODIOS

const findEpisodes = (episodeToSearch) => {
  fetch(`${baseUrl}episode/?name=${episodeToSearch}`)
    .then((res) => res.json())
    .then((data) => {
      !data.results ? showNotFound() : createEpisodesCards(data.results);
    });
};

//FETCH BUSCAR LOCACIONES

const findLocations = (locationToSearch) => {
  fetch(`${baseUrl}location/?name=${locationToSearch}`)
    .then((res) => res.json())
    .then((data) => {
      !data.results ? showNotFound() : createLocationsCards(data.results);
    });
};

inputCharacters.oninput = () => {
  characterToSearch = inputCharacters.value;
  findCharacters(characterToSearch);
  hideSection(resultContainer);
};

inputEpisodes.oninput = () => {
  episodeToSearch = inputEpisodes.value;
  findEpisodes(episodeToSearch);
  hideSection(resultContainer);
};

inputLocations.oninput = () => {
  locationToSearch = inputLocations.value;
  findLocations(locationToSearch);
  hideSection(resultContainer);
};

//AGREGAR VISTA DE DETALLE DE CADA CARD

const searchForCardInformation = (id) => {
  fetch(`https://rickandmortyapi.com/api/${toFetch}/${id}`)
    .then((res) => res.json())
    .then((data) => {
      toFetch === "character" && createDetailViewForCharacters(data);
      toFetch === "location" && createDetailViewForLocations(data);
      toFetch === "episode" && createDetailViewForEpisodes(data);
    });
};

const createDetailViewForCharacters = (data) => {
  showSection(details);
  hideSection(pagination);
  hideSection(resultContainer);
  details.innerHTML = `
        <div class="detail-container">
        <article class="card">
        <button class="close-button" id="close-button">X</button>
        <h2 class="title">${data.name}</h2>
        <img src="${data.image}">
        <div class="status">
        <h3>${data.status}</h3>
        <h3> - ${data.species}</h3>
        </div>
        <h3>${data.gender}</h3>
        <div class="status-location">
        <h4>Last known location:</h4>
        <h3>${data.location.name}</h3> 
        </div>        
        </article>
        </div>
        `;
  const closeButton = document.querySelector("#close-button");
  closeButton.onclick = () => hideSection(details);
};

const createDetailViewForLocations = (data) => {
  showSection(details);
  hideSection(pagination);
  hideSection(resultContainer);
  details.innerHTML = `
        <div class="detail-container">
        <article class="card">
        <button class="close-button" id="close-button">X</button>
        <h2 class="title">${data.name}</h2> 
        <img src="img/rick-and-morty-space-assorted-planets-wallpaper.jpg" alt="">
        <div class="subtitle-card">
				<h3>Dimension:</h3>
        <h4>${data.dimension}</h4>
				</div>
        <div class="subtitle-card">
				<h3>Type:</h3>
        <h4>${data.type}</h4>
				</div>      
        </article>
        </div>
        `;
  const closeButton = document.querySelector("#close-button");
  closeButton.onclick = () => hideSection(details);
};

const createDetailViewForEpisodes = (data) => {
  showSection(details);
  hideSection(pagination);
  hideSection(resultContainer);
  details.innerHTML = `
        <div class="detail-container">
        <article class="card">
        <button class="close-button" id="close-button">X</button>
        <h2 class="title">${data.name}</h2> 
        <img src="img/rick-morty-critica.jpg" alt="">
        <div class="subtitle-card">
				<h3>Episode:</h3>
        <h4>${data.episode}</h4>
				</div>
        <div class="subtitle-card">
				<h3>Air date:</h3>
        <h4>${data.air_date}</h4>
				</div>      
        </article>
        </div>
        `;
  const closeButton = document.querySelector("#close-button");
  closeButton.onclick = () => hideSection(details);
};

const addClickToCards = () => {
  const cards = document.querySelectorAll(".card");
  for (let i = 0; i < cards.length; i++) {
    cards[i].onclick = () => {
      const id = cards[i].id;
      searchForCardInformation(id);
    };
  }
};

//CARD PERSONAJES

const createCharacterCards = (data) => {
  showSection(characters);
  hideSection(notFound);
  toFetch = "character";
  const html = data.reduce((acc, curr) => {
    return (
      acc +
      `
        <article class="card" id="${curr.id}">
        <h2 class="title">${curr.name}</h2>
        <img src="${curr.image}">
        </article>
        `
    );
  }, " ");
  characters.innerHTML = html;
  addClickToCards();
  pageChange(toFetch);
};

//CARD EPISODIOS

const createEpisodesCards = (data) => {
  showSection(episodes);
  hideSection(notFound);
  toFetch = "episode";
  const html = data.reduce((acc, curr) => {
    return (
      acc +
      `
        <article class="card" id="${curr.id}">
        <h2 class="title">${curr.name}</h2> 
        <img src="img/rick-morty-critica.jpg" alt="">
        </article>
        `
    );
  }, " ");

  episodes.innerHTML = html;
  addClickToCards();
  pageChange(toFetch);
};

//CARD LOCACIONES

const createLocationsCards = (data) => {
  showSection(locations);
  hideSection(notFound);
  toFetch = "location";
  const html = data.reduce((acc, curr) => {
    return (
      acc +
      `
        <article class="card" id="${curr.id}">
        <h2 class="title">${curr.name}</h2>
        <img src="img/rick-and-morty-space-assorted-planets-wallpaper.jpg" alt="">
        </article>
        `
    );
  }, " ");

  locations.innerHTML = html;
  addClickToCards();
  pageChange(toFetch);
};

//SORTING (medio mentiroso porque con la paginacion solo lo hace en cada pagina)

const aToZ = document.querySelector("#a-z");
const zToA = document.querySelector("#z-a");

aToZ.onclick = () => {
  toFilter.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
  sectionOpened === "character" && createCharacterCards(toFilter)
  sectionOpened === "episode" && createEpisodesCards(toFilter)
  sectionOpened === "location" && createLocationsCards(toFilter)
};

zToA.onclick = () => {
  toFilter.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
  sectionOpened === "character" && createCharacterCards(toFilter.reverse())
  sectionOpened === "episode" && createEpisodesCards(toFilter.reverse())
  sectionOpened === "location" && createLocationsCards(toFilter.reverse())
};

//PAGINACION
pageInput = document.querySelector("#page-number");
let currentPage = 1;
pageInput.value = 1;

const resetPagination = () => {
  currentPage = 1;
  pageInput.value = 1;
};

const pageChange = (toFetch) => {
  const first = document.querySelector("#first");
  const next = document.querySelector("#next");
  const prev = document.querySelector("#prev");
  const last = document.querySelector("#last");

  const findLastPage = () => {
    fetch(`${baseUrl}${toFetch}`)
      .then((res) => res.json())
      .then((data) => {
        lastPage = data.info.pages;
        totalResults.innerHTML = data.info.count;
        pageInput.setAttribute("max", lastPage);
      });
  };

  const disableButtons = () => {
    if (currentPage === 1) {
      first.classList.add("disabled");
      prev.classList.add("disabled");
    } else if (currentPage === lastPage) {
      next.classList.add("disabled");
      last.classList.add("disabled");
    } else {
      first.classList.remove("disabled");
      prev.classList.remove("disabled");
      next.classList.remove("disabled");
      last.classList.remove("disabled");
    }
  };

  findLastPage();
  disableButtons();

  const searchInformation = () => {
    fetch(`${baseUrl}${toFetch}?page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => {
        toFetch === "character" && createCharacterCards(data.results);
        toFetch === "location" && createLocationsCards(data.results);
        toFetch === "episode" && createEpisodesCards(data.results);
        toFilter = data.results;
        hideSection(resultContainer);
      });
    disableButtons();
    
  };

  pageInput.onchange = (event) => {
    event.preventDefault();
    currentPage = pageInput.value;
    searchInformation();
  };

  first.onclick = () => {
    currentPage = 1;
    pageInput.value = 1;
    searchInformation();
  };

  prev.onclick = () => {
    currentPage--;
    pageInput.value--;
    searchInformation();
  };

  next.onclick = () => {
    currentPage++;
    pageInput.value++;
    searchInformation();
  };

  last.onclick = () => {
    currentPage = lastPage;
    pageInput.value = lastPage;
    searchInformation();
  };
};
