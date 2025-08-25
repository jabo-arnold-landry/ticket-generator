const dragEvents = ["dragenter", "dragover", "dragleave", "drop"];
const draggableElement = document.querySelector(".drag");
const fileInputElement = document.querySelector("[type=file]");
let isUploaded = false;
fileInputElement.addEventListener("input", function (e) {
  displayImage(fileInputElement.files[0]);
});
dragEvents.forEach((event) =>
  draggableElement.addEventListener(event, function (e) {
    e.preventDefault();
  })
);
dragEvents.slice(0, 2).forEach((event) => {
  draggableElement.addEventListener(event, () => {
    draggableElement.classList.add("dragging");
  });
});
dragEvents.slice(2).forEach((event) => {
  draggableElement.addEventListener(event, () => {
    draggableElement.classList.remove("dragging");
  });
});
draggableElement.addEventListener("drop", function (e) {
  const dataTransfer = e.dataTransfer;
  const image = dataTransfer.files;
  displayImage(image[0]);
});
const avatarElement = draggableElement.querySelector("img");

const imageFileLabel = draggableElement.querySelector("label");
const btn = draggableElement.querySelector("button");
function displayImage(img) {
  const allowedTypes = ["image/png", "image/jpeg"];
  if (!allowedTypes.includes(img.type))
    return alert("only jpeg and png files allowed");
  const imageSize = img.size / 1024;
  if (imageSize > 580) {
    alert("the image KB is large");
    return;
  }

  const imgUrl = URL.createObjectURL(img);
  avatarElement.src = imgUrl;
  avatarElement.width = 100;
  avatarElement.height = 70;
  imageFileLabel.textContent = "change Image";
  imageFileLabel.classList.add("active-label");
  isUploaded = true;
  btn.hidden = false;
  return;
}
draggableElement.addEventListener("click", function (e) {
  if (e.target.matches("button")) {
    avatarElement.src = "images/icon-upload.svg";
    avatarElement.width = 35;
    avatarElement.height = 40;
    imageFileLabel.textContent = "Drag and Drop or click to upload";
    imageFileLabel.classList.remove("active-label");
    btn.hidden = true;
    isUploaded = false;
  }
});
const form = document.querySelector("form");
const nameInput = document.getElementById("full-names");
const gitHubInput = document.getElementById("github-names");
const emailInput = document.querySelector("#email-address");
const outlineError = "1px solid var(--Orange-700)";
const formSection = document.querySelector(".fom-section");
const ticketTemplete = document.querySelector(".ticket-template");
const ticketProfile = document.querySelector(".ticket-profile");

[nameInput, emailInput, emailInput].forEach((input) => {
  input.addEventListener("input", function (e) {
    e.target.style.outline = "none";
  });
});
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!nameInput.value) {
    nameInput.style.outline = outlineError;
    return alert("your name is required");
  }
  const emailRegex = /^[\w\d]+@\w{5}\.\w{2,3}$/gim;
  if (!emailRegex.test(emailInput.value)) {
    emailInput.style.outline = outlineError;
    return alert("the email is invalid");
  }
  if (!gitHubInput.value) {
    gitHubInput.style.outline = outlineError;
    return alert("your github account as well!");
  }
  if (!isUploaded) {
    draggableElement.style.border = "1px solid var(--Orange-700)";
    return alert("image required");
  }
  ticketCreation();
});

function ticketCreation() {
  formSection.style.display = "none";
  ticketTemplete.style.display = "flex";
  document.querySelector(".names").textContent = `${nameInput.value}!`;
  document.querySelector(".email").textContent = emailInput.value;
  document.querySelector(".ticket-name").textContent = nameInput.value;
  document.querySelector(
    ".ticket-github"
  ).textContent = `@${gitHubInput.value}`;
  const randomNumber = Math.ceil(Math.random() * 2000);
  document.querySelector(".ticket-code").textContent = `#${randomNumber}`;
  ticketProfile.src = avatarElement.src;
}
