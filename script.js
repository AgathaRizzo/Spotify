const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result))
        .catch((error) => console.error("Erro na requisição da API:", error));
}

function displayResults(result) {
    resultPlaylist.classList.add("hidden");
    resultArtist.innerHTML = ''; // Limpa os resultados anteriores

    result.forEach(element => {
        const artistDiv = document.createElement('div');
        artistDiv.classList.add('artist-item');

        const artistName = document.createElement('p');
        artistName.innerText = element.name;

        const artistImage = document.createElement('img');
        artistImage.src = element.urlImg;
        artistImage.alt = element.name;

        artistDiv.appendChild(artistImage);
        artistDiv.appendChild(artistName);

        resultArtist.appendChild(artistDiv);
    });

    resultArtist.classList.remove('hidden');
}

searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        return;
    }
    
    requestApi(searchTerm);
});
