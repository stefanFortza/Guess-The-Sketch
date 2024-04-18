const rightArrow = document.querySelector("#right-arrow");
const leftArrow = document.querySelector("#left-arrow");
const image = document.querySelector("form img");
let avatarId = Math.floor(Math.random() * 12);
image.src = `/assets/icons/icon${avatarId}.png`;

rightArrow.addEventListener("click", (e) => {
  if (avatarId == 11) {
    avatarId = 0;
  } else {
    avatarId++;
  }
  image.src = `/assets/icons/icon${avatarId}.png`;
});

leftArrow.addEventListener("click", (e) => {
  if (avatarId == 0) {
    avatarId = 11;
  } else {
    avatarId--;
  }
  image.src = `/assets/icons/icon${avatarId}.png`;
});

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  //   e.preventDefault();
  const inp = document.createElement("input");
  inp.name = "avatar";
  inp.value = image.src;
  e.target.appendChild(inp);
  console.log(e.target);
});
