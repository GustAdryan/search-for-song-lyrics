const buttonSearch = document.querySelector('#search')
const artistInput = document.querySelector('#artistName');
const musicName = document.querySelector('#songTitle')
const elementBody = document.querySelector('body')
const divLyrics = document.querySelector('#lyricsOutput');
const titleMusic = document.querySelector('h2');
const body = document.querySelector('p');

buttonSearch.addEventListener('click', function(event) {
    event.preventDefault()
    if(artistInput.value && musicName.value == ''){
        alert('Você ainda nao preencheu os campos')
    }  else{
        limparCampos()
        searchMusic(artistInput.value, musicName.value)
    }
})

async function searchMusic(artist, music) {
    const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${music}`);
    
    if(response.status == '200') {
        divLyrics.style.display = 'block'
        const data = await response.json();

        console.log(data);

        titleMusic.innerText = musicName.value;
        body.innerText = data.lyrics;

        divLyrics.appendChild(titleMusic);
        divLyrics.appendChild(body)

        elementBody.style.height = 'auto';
        elementBody.style.margin = '4rem 0rem'
    } else {
        alert(`Não conseguimos encontrar a letra: Verifique se esta escrita corretamente [${response.status}]`)   
    }
}

function limparCampos() {
    divLyrics.style.display = 'none';
    titleMusic.textContent = ''
    body.textContent = ''
}