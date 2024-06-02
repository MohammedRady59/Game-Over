// ? =============> Global ===============>
const links = document.querySelectorAll(".menu a");
const loading = document.querySelector(".loading");
const mode = document.getElementById("mode");

// ! =============> When Start ===============>
getGames("superhero");

if (localStorage.getItem("theme") !== null) {
  const colorTheme = localStorage.getItem("theme");
  document.documentElement.setAttribute("data-theme", `${colorTheme}`);
  if (colorTheme === "light") {
    mode.classList.replace("fa-sun", "fa-moon");
  } else {
    mode.classList.replace("fa-moon", "fa-sun");
  }
}
// * =============> Events ===============>
mode.addEventListener("click", function () {
  if (mode.classList.contains("fa-sun")) {
    document.documentElement.setAttribute("data-theme", "light");
    mode.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    mode.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "dark");
  }
});

document.querySelector(".logout-btn").addEventListener("click", function () {
  location.href = "../index.html";
  localStorage.removeItem("token");
});

links.forEach((el) => {
  el.addEventListener("click", function () {
    links.forEach((el) => {
      el.classList.remove("active");
    });
    el.classList.add("active");
    const category = el.dataset.category;
    getGames(category);
  });
});

// ! =============> Functions ===============>
async function getGames(categoryName) {
  loading.classList.remove("d-none");
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "0f3d85454fmsh83f8de5e39ed638p16fb03jsn8ddc425d786b",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  const apiGame = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoryName}
  `,
    options
  );
  const data = await apiGame.json();
  console.log(data);
  renderData(data);
  loading.classList.add("d-none");
}

function renderData(gameData) {
  gameData.forEach((el) => {
    let videoPlayback = el.thumbnail.replace(
      "thumbnail.jpg",
      "videoplayback.webm"
    );
    const html = `
        <div class="col">
        <div  class="card h-100 bg-transparent" role="button" onmouseenter="startVideo(event)"  onmouseleave="stopVideo(event)" data-id=${el.id} >
           <div class="card-body">
  
              <figure class="position-relative">
                 <img class="card-img-top object-fit-cover h-100" src="${el.thumbnail}" />
  
               <video muted="true"  preload="none" loop   class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
                <source src="${videoPlayback}">
                </video>
  
              </figure>
  
              <figcaption>
  
                 <div class="hstack justify-content-between">
                    <h3 class="h6 small"> ${el.title} </h3>
                    <span class="badge text-bg-primary p-2">Free</span>
                 </div>
  
                 <p class="card-text small text-center opacity-50">
                    ${el.short_description}
                 </p>
  
              </figcaption>
           </div>
  
           <footer class="card-footer small hstack justify-content-between">
  
              <span class="badge badge-color">${el.genre}</span>
              <span class="badge badge-color">${el.platform}</span>
  
           </footer>
        </div>
     </div>
        `;
    document.getElementById("gameData").insertAdjacentHTML("afterbegin", html);
  });
  const card = document.querySelectorAll(".card");
  card.forEach((el) => {
    el.addEventListener("click", showDetails);
  });
}

function startVideo(event) {
  const veideoEl = event.target.querySelector("video");
  veideoEl.classList.remove("d-none");
  veideoEl.muted = true;
  veideoEl.play();
}
function stopVideo(event) {
  const veideoEl = event.target.querySelector("video");
  veideoEl.classList.add("d-none");
  //veideoEl.muted = true;
  veideoEl.pause();
}
function showDetails() {
  const id = this.dataset.id;
  console.log(id);
  location.href = `./details.html?id=${id}`;
}

/* const mainNav = document.querySelector(".menu ");
const links = document.querySelectorAll(".menu a ");

mainNav.addEventListener("click", function (e) {
  const clicked = e.target.closest(".nav-link");
  if (!clicked) return;
  links.forEach((el) => {
    el.classList.remove("active");
  });

  clicked.classList.add("active");
});
 */
