// ! =============> When Start ===============>
const mode = document.getElementById("mode");

if (localStorage.getItem("theme") !== null) {
  const colorTheme = localStorage.getItem("theme");
  document.documentElement.setAttribute("data-theme", colorTheme);
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

const id = location.search;
const paramsId = new URLSearchParams(id);

const finallyID = paramsId.get("id");

(async function () {
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "0f3d85454fmsh83f8de5e39ed638p16fb03jsn8ddc425d786b",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${finallyID}`,
      options
    );
    const result = await response.json();
    console.log(result);
    displayData(result);
  } catch (error) {
    console.error(error);
  }
})();

function displayData(resultData) {
  const html = `
    
    
    <div class="col-md-4">
    <figure>
       <img src="${resultData.thumbnail}" class="w-100" alt="details image" />
    </figure>
 </div>
 <div class="col-md-8">
 
    <div>
       <nav aria-label="breadcrumb">
          <ol class="breadcrumb" class="text-light">
             <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
             <li class="breadcrumb-item text-info" aria-current="page">${resultData.title}</li>
          </ol>
       </nav>
 
       <h1>${resultData.title}</h1>
 
       <h3>About ${resultData.title}</h3>
       <p>${resultData.description}</p>
 
       
    </div>
 </div>

    `;
  document.getElementById("detailsData").insertAdjacentHTML("afterbegin", html);

  const backgroundImage = resultData.thumbnail.replace(
    "thumbnail",
    "background"
  );
  document.body.style.cssText = `
  background-image: url(${backgroundImage});
  background-position: center;
  background-size: cover;
  
  `;
}
