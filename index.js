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
  hideSection(locations);
  hideSection(characters);
  hideSection(inputCharacters);
  hideSection(inputLocations);
  allEpisodes();
};

showLocations.onclick = () => {
  showSection(locations);
  showSection(inputLocations);
  hideSection(characters);
  hideSection(episodes);
  hideSection(inputCharacters);
  hideSection(inputEpisodes);
  allLocations();
};

showCharacters.onclick = () => {
  showSection(characters);
  showSection(inputCharacters);
  hideSection(episodes);
  hideSection(locations);
  hideSection(inputEpisodes);
  hideSection(inputLocations);
};

showNotFound = () => {
  hideSection(episodes);
  hideSection(locations);
  hideSection(characters);
  showSection(notFound);
};

const baseUrl = "https://rickandmortyapi.com/api/";

//FETCH MOSTRAR TODOS LOS PERSONAJES

fetch(`${baseUrl}character`)
  .then((res) => res.json())
  .then((data) => {
    createCharacterCards(data.results);
  });

//FETCH MOSTRAR EPISODIOS

const allEpisodes = () => {
  fetch(`${baseUrl}episode`)
    .then((res) => res.json())
    .then((data) => {
      createEpisodesCards(data.results);
    });
};

//FETCH MOSTRAR LOCACIONES

const allLocations = () => {
  fetch(`${baseUrl}location`)
    .then((res) => res.json())
    .then((data) => {
      createLocationsCards(data.results);
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
};

inputEpisodes.oninput = () => {
  episodeToSearch = inputEpisodes.value;
  findEpisodes(episodeToSearch);
};

inputLocations.oninput = () => {
  locationToSearch = inputLocations.value;
  findLocations(locationToSearch);
};

//CARD PERSONAJES

const createCharacterCards = (data) => {
  showSection(characters);
  hideSection(notFound);
  const html = data.reduce((acc, curr) => {
    return (
      acc +
      `
        <article class="card">
        <h2 class="title">${curr.name}</h2>
        <img src="${curr.image}">
        <div class="status">
        <h3>${curr.status}</h3>
        <h3> - ${curr.species}</h3>
        </div>
        <h3>${curr.gender}</h3>
        <div class="status-location">
        <h4>Last known location:</h4>
        <h3>${curr.location.name}</h3> 
        </div>    
        </article>
        `
    );
  }, " ");

  characters.innerHTML = html;
};

//CARD EPISODIOS

const createEpisodesCards = (data) => {
  showSection(episodes);
  hideSection(notFound);
  const html = data.reduce((acc, curr) => {
    return (
      acc +
      `
        <article class="card">
        <h2 class="title">${curr.name}</h2>
				<div class="subtitle-card">
				<h3>Episode:</h3>
        <h4>${curr.episode}</h4>
				</div>
        <div class="subtitle-card">
				<h3>Air date:</h3>
        <h4>${curr.air_date}</h4>
				</div>
        <div class="subtitle-card">
        <h4>Characters seen:</h4>
        <img class="small" src="https://www.placedog.net/60">
        </div>    
        </article>
        `
    );
  }, " ");

  episodes.innerHTML = html;
};

//CARD LOCACIONES

const createLocationsCards = (data) => {
  showSection(locations);
  hideSection(notFound);
  const html = data.reduce((acc, curr) => {
    return (
      acc +
      `
        <article class="card">
        <h2 class="title">${curr.name}</h2>
				<div class="subtitle-card">
				<h3>Dimension:</h3>
        <h4>${curr.dimension}</h4>
				</div>
        <div class="subtitle-card">
				<h3>Type:</h3>
        <h4>${curr.type}</h4>
				</div>
        <div class="subtitle-card">
        <h4>Residents:</h4>
        <img class="small" src="https://www.placecage.com/200/300">
        </div>    
        </article>
        `
    );
  }, " ");

  locations.innerHTML = html;
};

//PAGINACION

const pageChange = () => {
  pageInput = document.querySelector("#page-number");
  let currentPage = 1;
  pageInput.value = currentPage;

  const first = document.querySelector("#first");
  const next = document.querySelector("#next");
  const prev = document.querySelector("#prev");
  const last = document.querySelector("#last");

  const findLastPage = () => {
    fetch(`${baseUrl}character`)
      .then((res) => res.json())
      .then((data) => {
        lastPage = data.info.pages;
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
    fetch(`${baseUrl}character?page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => {
        createCharacterCards(data.results);
      });
    pageInput.value = currentPage;
    disableButtons();
  };

  pageInput.onchange = (event) => {
    event.preventDefault();
    currentPage = pageInput.value;
    searchInformation();
  };

  first.onclick = () => {
    currentPage = 1;
    searchInformation();
  };

  prev.onclick = () => {
    currentPage--;
    searchInformation();
  };

  next.onclick = () => {
    currentPage++;
    searchInformation();
  };

  last.onclick = () => {
    currentPage = lastPage;
    searchInformation();
  };
};

pageChange();
