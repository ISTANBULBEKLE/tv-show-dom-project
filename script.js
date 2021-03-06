// This function is called with window onload calling other functions.

function setup() {
  createAndSelectMenuForShows();
  createSummaryCardForShows();
  searchTheEpisodes();
  selectTheEpisodeFromList();
}
const selectShow = document.querySelector("#selectShows");

///////////////////////////////////////////////////////////////////////////////////////////////

// * This function will create a card for each show with mentioned information.

function createSummaryCardForShows() {
  const allShows = getAllShows();
  const showContainer = document.querySelector("#showContainer");

  allShows.forEach((show) => {
    const showCard = document.createElement("div");
    showCard.id = "showCard";
    showCard.className = "card mb-3";
    showCard.style = "max-width: 540px;";
    const showCardRow = document.createElement("div");
    showCardRow.className = "row no-gutters";

    const showCardRowDiv1 = document.createElement("div");
    showCardRowDiv1.className = "col-md-4";
    const showCardRowDiv1Img = document.createElement("img");
    showCardRowDiv1Img.className = "crd-img";
    showCardRowDiv1Img.id = "showCardImg";

    if (show.image !== null) {
      showCardRowDiv1Img.src = show.image.original;
    }

    showCardRowDiv1Img.alt = "This is the img of show";
    const showCardRowDiv2 = document.createElement("div");
    showCardRowDiv2.className = "col-md-8";
    const showCardRowDiv2Div1 = document.createElement("div");
    showCardRowDiv2Div1.className = "card-body";
    const showCardTitle = document.createElement("h5");
    showCardTitle.className = "card-title";
    showCardTitle.innerText = show.name;
    const showCardSummary = document.createElement("p");
    showCardSummary.className = "card-text";

    showCardSummary.innerHTML = show.summary;

    const showCardBody = document.createElement("div");
    showCardBody.className = "card-body";
    const showCardBodyUlElement = document.createElement("ul");
    showCardBodyUlElement.className = "list-group list-group-flush";

    const showBodyLiElement1 = document.createElement("li");
    showBodyLiElement1.className = "list-group-item text-right";
    showBodyLiElement1.innerHTML = `Genres: ${show.genres}`;

    const showBodyLiElement2 = document.createElement("li");
    showBodyLiElement2.className = "list-group-item text-right";
    showBodyLiElement2.innerHTML = `Status: ${show.status}`;

    const showBodyLiElement3 = document.createElement("li");
    showBodyLiElement3.className = "list-group-item text-right";
    showBodyLiElement3.innerHTML = `Rating: ${show.rating.average}`;

    const showBodyLiElement4 = document.createElement("li");
    showBodyLiElement4.className = "list-group-item text-right";
    showBodyLiElement4.innerHTML = `Runtime: ${show.runtime}`;

    showContainer.appendChild(showCard);
    showCard.appendChild(showCardRow);
    showCardRow.appendChild(showCardRowDiv1);
    showCardRowDiv1.appendChild(showCardRowDiv1Img);
    showCardRow.appendChild(showCardRowDiv2);
    showCardRowDiv2.appendChild(showCardRowDiv2Div1);
    showCardRowDiv2Div1.appendChild(showCardTitle);
    showCardRowDiv2Div1.appendChild(showCardSummary);
    showCardRow.appendChild(showCardBody);
    showCardBody.appendChild(showCardBodyUlElement);
    showCardBodyUlElement.appendChild(showBodyLiElement1);
    showCardBodyUlElement.appendChild(showBodyLiElement2);
    showCardBodyUlElement.appendChild(showBodyLiElement3);
    showCardBodyUlElement.appendChild(showBodyLiElement4);
  });
}

/////////////////////////////////////////////////////////////////////////////////////////////////

// This function will populate the names of the shows by calling gelAllShows () function;

function createAndSelectMenuForShows() {
  const allShows = getAllShows();
  const sortedAllShows = allShows.sort(function (a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  const selectShow = document.querySelector("#selectShows");
  sortedAllShows.forEach((show) => {
    const showOption = document.createElement("option");
    showOption.value = show.id;
    showOption.innerText = show.name;
    selectShow.appendChild(showOption);
  });

  selectShow.addEventListener("change", (event) => {
    const showContainer = document.querySelector("#showContainer");
    if (event.target.value === "") {
      showContainer.style.display = "flex";
    } else {
      fetchEpisodesFromAPI(event.target.value);
      showContainer.style.display = "none";
    }
  });

  // fetchEpisodesFromAPI(sortedAllShows[0].id);
}

//////////////////////////////////////////////////////////////////////////////////////////////

// * This function is to fetch the data from the API and than render the episodes by calling the initial makePageForEpisodes () function;

const fetchEpisodesFromAPI = (id) => {
  fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
    .then((response) => response.json())
    .then((data) => makePageForEpisodes(data))
    .catch((err) => console.log(err));
};

/////////////////////////////////////////////////////////////////////////////////////////////

// This function creates a card for each episode

function makePageForEpisodes(episodeList) {
  const divRow = document.querySelector("#cardContainer");
  divRow.innerHTML = "";
  const selectTheEpisodes = document.querySelector("#selectEpisodes");
  selectTheEpisodes.innerHTML = "";
  const optionElement = document.createElement("option");
  optionElement.innerText = "All episodes";
  selectTheEpisodes.appendChild(optionElement);

  episodeList.forEach((episode) => {
    const optionElement = document.createElement("option");
    optionElement.innerText = `S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} - ${
      episode.name
    }`;

    optionElement.value = `S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;

    selectTheEpisodes.appendChild(optionElement);

    const divCard = document.createElement("div");
    divCard.className = "card col-3";

    divCard.id = `S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;
    const divCardHeader = document.createElement("div");
    divCardHeader.className = "card-header";
    const episodeName = document.createElement("h5");
    episodeName.className = "card-title";
    episodeName.innerText = `${episode.name} ${divCard.id}`;

    const episodeImage = document.createElement("img");
    episodeImage.className = "card-img-top";

    if (episode.image !== null) {
      episodeImage.src = episode.image.medium;
    }

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

///////////////////////////////////////////////////////////////////////////////////////////////

// This function search and list for input value that matches with the values in the 'card title' or 'card summary'.

function searchTheEpisodes() {
  // const rootElem = document.querySelector("#root");
  // const allEpisodes = getAllEpisodes();
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
    inputSpanElement.textContent = `Search result: ${newList.length} episodes/shows match the current search`;
  }
  inputSearchElement.addEventListener("input", inputSelect);
}

/////////////////////////////////////////////////////////////////////////////////////////////

// This function  selects episode and shows that episode only in the window.

function selectTheEpisodeFromList() {
  const selectTheEpisodes = document.querySelector("#selectEpisodes");
  selectTheEpisodes.addEventListener("change", selectFromMenu);

  function selectFromMenu(event) {
    const cardList = document.querySelectorAll(".card");

    cardList.forEach((episode) => {
      if (event.target.value === "All episodes") {
        episode.style.display = "block";
      } else {
        episode.id === event.target.value
          ? (episode.style.display = "block")
          : (episode.style.display = "none");
      }
    });
  }
}

////////////////////////////////////////////////////////////////////////////////
//*When clicked, the window.onload starting state will be displayed again.

const clearWindowButton = document.querySelector("#clearWindow");

clearWindowButton.addEventListener("click", function () {
  const showContainer = document.querySelector("#showContainer");
  showContainer.style.display = "flex";
});

////////////////////////////////////////////////////////////////////////////////////////////////

window.onload = setup;

// End of the code page
//////////////////////////////////////////////////////////////////////////////////////////////
