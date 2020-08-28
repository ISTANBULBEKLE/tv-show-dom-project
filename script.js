// You can edit ALL of the code here

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  episodeList.forEach((episode) => {

    let containerName = document.createElement("div");
    containerName.className = "container";

    let divRow = document.createElement("div");
    divRow.className = "row";

    let divCard = document.createElement("div");
    divCard.className = "card col-4";

    let divCardHeader = document.createElement("div");
    divCardHeader.className = "card-header";

    let episodeName = document.createElement("h5");
    episodeName.className = "card-title";
    episodeName.innerText = `${episode.name} - S${("0" + episode.season).slice(-2)}E${("0" + episode.number ).slice(-2)}`;

    let episodeImage = document.createElement("img");
    episodeImage.className = "card-img-top";
    episodeImage.src = episode.image.medium;

    let cardPElement = document.createElement("p");
    cardPElement.className = "card-text";
    cardPElement.innerHTML = episode.summary;

    let cardFooter = document.createElement("div");
    cardFooter.className = "card-footer";

    let cardFooterLink = document.createElement("a");
    cardFooterLink.className = "card-link";
    cardFooterLink.href = "https: //www.tvmaze.com/";

    // Appending the created elements
    cardFooter.appendChild(cardFooterLink);
    divCard.appendChild(cardFooter);
    divCard.appendChild(cardPElement);
    divCard.appendChild(episodeImage);
    divCardHeader.appendChild(episodeName);
    divCard.appendChild(divCardHeader);
    divRow.appendChild(divCard);
    containerName.appendChild(divRow);
    rootElem.appendChild(containerName);
  })
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;

}

window.onload = setup;