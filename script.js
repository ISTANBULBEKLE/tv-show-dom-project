// You can edit ALL of the code here

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  searchTheEpisodes();
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  const bodyElement = document.querySelector("body");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  const containerName = document.createElement("div");
  containerName.className = "container";

  const divRow = document.createElement("div");
  divRow.className = "row";

  bodyElement.appendChild(containerName);
  containerName.appendChild(divRow);

  episodeList.forEach((episode) => {

    const divCard = document.createElement("div");
    divCard.className = "card col-3";

    const divCardHeader = document.createElement("div");
    divCardHeader.className = "card-header";

    const episodeName = document.createElement("h5");
    episodeName.className = "card-title";
    episodeName.innerText = `${episode.name} - S${("0" + episode.season).slice(-2)}E${("0" + episode.number ).slice(-2)}`;

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

    // Appending the created elements

    divRow.appendChild(divCard);
    divCard.appendChild(divCardHeader);
    divCardHeader.appendChild(episodeName);
    divCard.appendChild(episodeImage);
    divCard.appendChild(cardPElement);
    divCard.appendChild(cardFooter);
    cardFooter.appendChild(cardFooterLink);
  })

}

window.onload = setup;

// Search Bar creation and search function
function searchTheEpisodes() {
  const rootElem = document.getElementById("root");
  const allEpisodes = getAllEpisodes();

  const searchNavBar = document.createElement("nav");
  searchNavBar.className = "navbar navbar-light bg-light";

  const searchFormElement = document.createElement("form");
  searchFormElement.className = "form-inline";

  const inputElement = document.createElement("input");
  inputElement.className = "form-control mr-sm-2";
  inputElement.setAttribute("type", "search");
  inputElement.setAttribute("placeholder", "Search");
  inputElement.setAttribute("aria-label", "Search");

  console.log(inputElement);
  const inputSpanElement = document.createElement("span");
  inputSpanElement.textContent = "Display how many episodes match the current search"
  console.log(inputSpanElement);


  rootElem.appendChild(searchNavBar);
  searchNavBar.appendChild(searchFormElement);
  searchFormElement.appendChild(inputElement)
  searchFormElement.appendChild(inputSpanElement);

  console.log(searchNavBar);

  const episodeNames = [];
  const episodeSummary = [];

  allEpisodes.forEach((episode) => {
    episodeNames.push(episode.name);
    episodeSummary.push(episode.summary);
  });

  console.log(episodeNames);

  function inputSelect(e) {
    const addedInput = e.target.value.toLowerCase();
    console.log(addedInput);
    for (i = 0; i < episodeNames.length; i++) {
      if (episodeNames[i].toLowerCase().indexOf(addedInput) !== -1 || episodeSummary[i].toLowerCase().indexOf(addedInput) !== -1) {

        episodeNames[i].style.display = "block";
        episodeSummary[i].style.display = "block";
        inputSpanElement.textContent = `Displaying ${episodeNames[i].length} episodes match the current search`;

      } else {
        episodeNames[i].style.display = "none";
        episodeSummary[i].style.display = "none";
      }
    }
    console.log(addedInput);
  }

  inputElement.addEventListener("change", inputSelect);
  console.log(inputElement);
}



//const AllEpisodes = getAllEpisodes();