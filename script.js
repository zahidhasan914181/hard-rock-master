
const form = document.getElementById('form')
const search = document.getElementById('searchData')
const result = document.getElementById('result')
// Make sure the client is loaded before calling this method.


/// api URL ///
const apiURL = 'https://api.lyrics.ovh';

form.addEventListener('submit', e=> {
    e.preventDefault();
    searchValue = search.value.trim();

    if(!searchValue){
        alert("There is nothing to search")
    }
    else{ 
        searchSong(searchValue)
    }
})

// Key up event listner
const searchOnKeyUp =() =>{
    searchValue = search.value.trim();
    searchSong(searchValue)
}
//search song 
async function searchSong(searchValue){
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`)
    const data = await searchResult.json();

    // console.log(finaldata)
    showData(data);
}

//display final result in DO
function showData(data){
  
    result.innerHTML = `
   
    <ul class="song-list">
      ${data.data
        .map(song=> `<li class = "single-list row my-3 p-3">
                    <div class ="col-md-9">
                        <h3><strong>${song.artist.name}</strong></h3> -${song.title}
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                    <span class = "btn btn-success" data-artist="${song.artist.name}" data-songtitle="${song.title}"> get lyrics</span><div>
                </li>`
        )
        .join('')}
    </ul>
  `;


}




//event listener in get lyrics button
result.addEventListener('click', e=>{
    const clickedElement = e.target;

    //checking clicked elemet is button or not
    if (clickedElement.tagName === 'SPAN'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');
        
        getLyrics(artist, songTitle)
    }
})

// Get lyrics for song
async function getLyrics(artist, songTitle) {
  
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);

    const data = await res.json();
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    result.innerHTML = ` 
    <h1 class= text-center><strong>${artist}</strong> - ${songTitle}</h1><ul>
    <p class= text-center>${lyrics}</p>
`    
    
}

//event listener in get song button
result.addEventListener('click', e=>{
    const clickedElement = e.target;

    //checking clicked elemet is button or not
    if (clickedElement.tagName === 'DIV'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');
        
        execute(artist, songTitle);
    }
    
})