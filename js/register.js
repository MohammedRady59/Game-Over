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
  if (
    validation(inputs[0]) &&
    validation(inputs[1]) &&
    validation(inputs[2]) &&
    validation(inputs[3]) &&
    validation(inputs[4])
  ) {
    setForm();
  }
});

inputs.forEach((el) => {
  el.addEventListener("input", function () {
    validation(this);
  });
});

// ! =============> Functions ===============>
function setForm() {
  const user = {
    first_name: inputs[0].value,
    last_name: inputs[1].value,
    email: inputs[2].value,
    password: inputs[3].value,
    age: inputs[4].value,
  };
  console.log(user);
  regesterForm(user);
}

async function regesterForm(userData) {
  const api = await fetch(`https://movies-api.routemisr.com/signup`, {
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
    location.href = "./index.html";
  } else {
    document.getElementById("msg").innerHTML = response.errors?.email.message;
  }
}
//  =============> Validation ===============>

function validation(element) {
  const text = element.value;
  const regex = {
    firstName:
      /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/,
    lastName:
      /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/,
    email:
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    age: /^([1-7][0-9]|80)$/,
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
