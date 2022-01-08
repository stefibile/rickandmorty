const baseUrl = "https://rickandmortyapi.com/api/"

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
      episodeHtml(data.results);
    });
};

//CARD PERSONAJES 

const createCharacterCards = (data) => {
  const characters = document.querySelector("#characters");
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


