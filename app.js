const API_URL =
  'https:api.themoviedb.org/4/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'  //=1 yazdığım kısıma ne yazarsam mesela hard yazarsam hard kelimesini bulunduran her şeyi karşıma getirir harika
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API =
'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';


  const form = document.querySelector("#form")
  const search = document.querySelector("#search")
  const main = document.querySelector("#main")

  getMovies(API_URL)

async function getMovies (url) {
    const res = await fetch(url)
    const data = await res.json()

    console.log(data.results)
    showMovies(data.results)
}

form.addEventListener("submit", (element) =>{

  element.preventDefault()  //Tekrarlanmaların yenilenmenin önüne geçmek için prevent default kullanılır.

  const searchTerm = search.value

  if(searchTerm && searchTerm !=="") {

    getMovies(SEARCH_API + searchTerm)  // search termi eklememin sebebi kişi arama yerinde belirli bir kelimeye arattığı zaman search api'den aramasını istiyorum.

    search.value ="" // arama yapıldıktan sonra boşluk kalmasın.

  } else {
    window.location.reload()  // mevcut web sayfasını yenilemek için kullanıyoruz.
  }
})

function showMovies(movies) {

  main.innerHTML=""
  
  movies.forEach((movie) => {

    const{title, poster_path, overview, vote_average} = movie

    const movieEl = document.createElement("div")
    movieEl.classList.add("movie")
    movieEl.innerHTML=`
     <img
    src="${IMG_PATH + poster_path}"
    alt="c"
  />
  <div class="movie-info">
    <h3>${title}</h3>
    <span class="${getClassByRate(vote_average)}">${vote_average}</span>
  </div>
  <div class="overview">
    <h3>${title} <small>overview</small></h3 >
    <p>
      ${overview}
    </p>
  </div>
</div> 
    `
    main.appendChild(movieEl)
  })

}

function getClassByRate(vote) {

  if(vote >=7) {

    return "green"
  } else if (vote >=5) {
    return "orange"
  } else {
    return "red"
  }

}