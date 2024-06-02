// ? =============> Global ===============>
const inputs = document.querySelectorAll("input");
const mode = document.getElementById("mode");

// ! =============> When Start ===============>

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

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  if (validationLogin(inputs[0]) && validationLogin(inputs[1])) {
    setForm();
  }
});
inputs.forEach((el) => {
  el.addEventListener("input", function () {
    validationLogin(this);
  });
});
// ! =============> Functions ===============>
function setForm() {
  const user = {
    email: inputs[0].value,
    password: inputs[1].value,
  };
  console.log(user);
  loginForm(user);
}

async function loginForm(userData) {
  const api = await fetch(`https://movies-api.routemisr.com/signin`, {
    method: "post",
    body: JSON.stringify(userData),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const response = await api.json();
  console.log(response);
  if (response.message === "success") {
    localStorage.setItem("token", response.token);
    location.href = "./home.html";
  } else {
    document.getElementById("msg").innerHTML = response.message;
  }
}
//  =============> Validation ===============>
function validationLogin(element) {
  const text = element.value;
  const regex = {
    email:
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  };
  if (regex[element.id].test(text)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.remove("is-vaild");
    element.classList.add("is-invalid");
    return false;
  }
}
