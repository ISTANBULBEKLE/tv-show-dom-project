// This function is called with window onload calling other functions.
function setup() {
  // getAllShows();
  // console.log(getAllShows());
  createAndSelectMenuForShows();
  // fetchDataFromAPI();
  searchTheEpisodes();
  selectTheEpisodeFromList();
}

function createAndSelectMenuForShows() {
  const allShows = getAllShows();
  console.log(getAllShows());
  const showDiv = document.querySelector("#firstSelectDiv");
  const selectShow = document.querySelector("#selectShows");
  allShows.forEach((show) => {
    const showOption = document.createElement("option");
    showOption.setAttribute("value", "");
    showOption.value = show.id;
    showOption.innerText = show.name;
    selectShow.appendChild(showOption);
  });

  /* const fetchTheShowFromAPI = (id) => {
    fetch('https://api.tvmaze.com/shows/${id}/episodes');
    .then(response => response.json());
    .then(data => fetchDataFromAPI(data));
  }

  selectShow.addEventListener("change", selectFromShowMenu);

  function selectFromShowMenu(event) {
    let selectedShow = '';
    if (event.target.value === "none") {
      selectShow.innerHTML = "";
      makePageForEpisodes(event);
    } else {
      selectedShow = allShows.filter((show) => {
        return (`${show.name}` === selectedShow.value);
      });
      selectShow.innerHTML = "";
      makePageForEpisodes(selectedShow);
    };
    selectedShow.value = "";
  } */
}

/* const showList = document.querySelector('#selectShows').childNodes;
console.log(showList); */

///////////// * This function is to fetch the data from the API and for calling the initial makePageForEpisodes ();

const fetchDataFromAPI = (id) => {
  fetch(" https://api.tvmaze.com/shows/82/episodes")
    .then((response) => response.json())
    .then((data) => onCallingTheData(data));
  // .catch(err => console.log(err));
};

function onCallingTheData(data) {
  makePageForEpisodes(data);
}

/////////////////////////////////////////////////////////////////////////////////////////////

// This function creates a card for each episode and grab them as a whole on screen with window.onload.
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  const containerName = document.querySelector(".container");
  const divRow = document.querySelector("#cardContainer");

  episodeList.forEach((episode) => {
    const divCard = document.createElement("div");
    divCard.className = "card col-3";
    const divCardHeader = document.createElement("div");
    divCardHeader.className = "card-header";
    const episodeName = document.createElement("h5");
    episodeName.className = "card-title";
    episodeName.innerText = `${
      episode.name
    } - S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;
    const episodeImage = document.createElement("img");
    episodeImage.className = "card-img-top";
    episodeImage.src = episode.image.medium;
    const cardPElement = document.createElement("p");
    cardPElement.className = "card-text";
    cardPElement.innerHTML = episode.summary;
    const cardFooter = document.createElement("div");
    cardFooter.className = "card-footer";
    const cardFooterLink = document.createElement("a");
    cardFooterLink.className = "card-link";
    cardFooterLink.innerHTML = "The data has(originally) come from TVMaze.com";
    cardFooterLink.href = "https://www.tvmaze.com/";
    divRow.appendChild(divCard);
    divCard.appendChild(divCardHeader);
    divCardHeader.appendChild(episodeName);
    divCard.appendChild(episodeImage);
    divCard.appendChild(cardPElement);
    divCard.appendChild(cardFooter);
    cardFooter.appendChild(cardFooterLink);
  });
}

// This function search and list for input value that matches with the values in the 'card title' or 'card summary'.
function searchTheEpisodes() {
  const rootElem = document.querySelector("#root");
  const allEpisodes = onCallingTheData();
  const inputSearchElement = document.querySelector("#inputSearch");
  const inputSpanElement = document.querySelector(".searchHolder");

  function inputSelect(e) {
    const addedInput = e.target.value.toLowerCase();
    const cardList = document.querySelectorAll(".card");

    let list = Array.from(cardList);
    list.forEach(function (card) {
      if (card.innerText.toLowerCase().indexOf(addedInput) !== -1) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
    let newList = list.filter((item) => item.style.display === "block");
    inputSpanElement.textContent = `Search result: ${newList.length}/${list.length} episodes match the current search`;
  }
  inputSearchElement.addEventListener("input", inputSelect);
}
// This function  selects episode and shows that episode only in the window.
function selectTheEpisodeFromList() {
  const allEpisodes = onCallingTheData();
  const secondSelectDiv = document.querySelector("#secondSelectDiv");
  const selectTheEpisodes = document.querySelector("#selectEpisodes");
  const cardContainer = document.querySelector("#cardContainer");

  allEpisodes.forEach((episode) => {
    const optionElement = document.createElement("option");
    optionElement.innerText = `S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} - ${
      episode.name
    }`;
    selectTheEpisodes.appendChild(optionElement);
  });

  selectTheEpisodes.addEventListener("change", selectFromMenu);

  function selectFromMenu(event) {
    if (event.target.value === "none") {
      cardContainer.innerHTML = "";
      makePageForEpisodes(allEpisodes);
    } else {
      const selectedEpisode = allEpisodes.filter((episode) => {
        return (
          `S${episode.season
            .toString()
            .padStart(2, "0")}E${episode.number
            .toString()
            .padStart(2, "0")} - ${episode.name}` === selectTheEpisodes.value
        );
      });
      cardContainer.innerHTML = "";
      makePageForEpisodes(selectedEpisode);
    }
    selectTheEpisodes.value = "";
  }
}

window.onload = setup;
