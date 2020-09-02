// You can edit ALL of the code here

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  searchTheEpisodes();
  selectTheEpisodeFromList();
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  // const bodyElement = document.querySelector("body");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  const containerName = document.createElement("div");
  containerName.className = "container";

  const divRow = document.createElement("div");
  divRow.className = "row";

  rootElem.appendChild(containerName);
  containerName.appendChild(divRow);

  episodeList.forEach((episode) => {

    const divCard = document.createElement("div");
    divCard.className = "card col-3";

    const divCardHeader = document.createElement("div");
    divCardHeader.className = "card-header";

    const episodeName = document.createElement("h5");
    episodeName.className = "card-title";
    episodeName.innerText = `${episode.name} - S${("0" + episode.season).slice(-2)}E${("0" + episode.number).slice(-2)}`;

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

  const inputSpanElement = document.createElement("span");
  inputSpanElement.textContent = "Display how many episodes match the current search";

  rootElem.prepend(searchNavBar);
  searchNavBar.appendChild(searchFormElement);
  searchFormElement.appendChild(inputElement)
  searchFormElement.appendChild(inputSpanElement);

  function inputSelect(e) {
    const addedInput = e.target.value.toLowerCase();

    allEpisodes.forEach((episode) => {
      if (episode.name.toLowerCase().indexOf(addedInput) !== -1 || episode.summary.toLowerCase().indexOf(addedInput) !== -1) {
        console.log(episode.name);
        const cardTitle = document.querySelectorAll("card-title");
        const cardSummary = document.querySelectorAll("card-text");
        console.log(cardTitle);
        
        cardTitle.innerText = `${episode.name} - S${("0" + episode.season).slice(-2)}E${("0" + episode.number).slice(-2)}`;
        cardSummary.innerHTML = episode.summary;

        cardTitle.innerText.style.display = "block";
        cardSummary.innerHTML.style.display = "block";

        inputSpanElement.textContent = `Displaying ${cardTitle.length}/73 episodes match the current search`;
      } else {
        cardTitle.innerText.style.display = "none";
        cardSummary.innerHTML.style.display = "none";
      }
    })
  }
  inputElement.addEventListener("keyup", inputSelect);
}


function selectTheEpisodeFromList() {
  const allEpisodes = getAllEpisodes();
  const rootElem = document.getElementById("root");
  const searchNavBar = document.createElement("nav");

  const inputGroup = document.createElement("div");
  inputGroup.className = "input-group";
  const selectElement = document.createElement("select");
  selectElement.className = "custom-select";
  selectElement.setAttribute("id", "inputGroupSelect04");
  selectElement.setAttribute("aria-label", "Example select with button addon");

  rootElem.prepend(inputGroup);
  inputGroup.appendChild(selectElement);

  allEpisodes.forEach((episode) => {
    const optionElement = document.createElement("option");
    //optionElement.setAttribute('value', );
    optionElement.innerText = `S${("0" + episode.season).slice(-2)}E${("0" + episode.number).slice(-2)}-${episode.name}`;
    selectElement.appendChild(optionElement);
  })






}