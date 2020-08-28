// You can edit ALL of the code here

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  searchTheEpisodes();
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;


  episodeList.forEach((episode) => {

    const containerName = document.createElement("div");
    containerName.className = "container";

    const divRow = document.createElement("div");
    divRow.className = "row";

    const divCard = document.createElement("div");
    divCard.className = "card col-4";

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
    rootElem.appendChild(containerName);
    containerName.appendChild(divRow);
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
  const searchNavBar = document.createElement("nav");
  searchNavBar.className = "navbar navbar - light bg - light";

  const searchFormElement = document.createElement("form");
  searchFormElement.className = "form-inline";

  const inputElement = document.createElement("input");
  inputElement.className = "form-control mr-sm-2";
  const inputSpanElement = document.createElement("span");
  inputSpanElement.innerText = `Displaying ${episode.length} episodes match the current search`;



}



//const AllEpisodes = getAllEpisodes();