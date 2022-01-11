// MODO OSCURO 

const lightModeButton = document.getElementById ("light-mode")
const body = document.getElementById ("body")
const label = document.getElementById ("toggle-label")

lightModeButton.onclick = () => {
    body.classList.toggle ("light-mode")
    if (body.className === "light-mode") {
        label.innerHTML = "Modo oscuro"
    }
    else {
        label.innerHTML = "Modo claro"
    }
}



// MOSTRAR U OCULTAR SECCIONES

const showEpisodes = document.querySelector("#show-episodes");
const showLocations = document.querySelector("#show-locations");
const showCharacters = document.querySelector("#show-characters");

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
  hideSection(locations);
  hideSection(characters);
	allEpisodes();
};

showLocations.onclick = () => {
  showSection(locations);
  hideSection(characters);
  hideSection(episodes);

};

showCharacters.onclick = () => {
  showSection(characters);
  hideSection(episodes);
  hideSection(locations);

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

//CARD PERSONAJES

const createCharacterCards = (data) => {
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
        <img href="https://www.placedog.net/60">
        </div>    
        </article>
        `
    );
  }, " ");

  episodes.innerHTML = html;
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
      first.classList.add("disabled")
      prev.classList.add("disabled");
    } else if (currentPage === lastPage) {
      next.classList.add("disabled");
      last.classList.add("disabled");
    } else {
      first.classList.remove("disabled")
			prev.classList.remove("disabled")
			next.classList.remove("disabled")
			last.classList.remove("disabled")
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
