const dragEvents = ["dragenter", "dragover", "dragleave", "drop"];
const draggableElement = document.querySelector(".drag");
const fileInputElement = document.querySelector("[type=file]");
fileInputElement.addEventListener("change", function (e) {
  displayImage(fileInputElement.files[0]);
});
dragEvents.forEach((event) =>
  draggableElement.addEventListener(event, function (e) {
    e.preventDefault();
  })
);
dragEvents.slice(0, 2).forEach((event) => {
  draggableElement.addEventListener(event, activeState);
});
dragEvents.slice(2).forEach((event) => {
  draggableElement.addEventListener(event, notActiveState);
});

draggableElement.addEventListener("drop", function (e) {
  const dataTransfer = e.dataTransfer;
  const image = dataTransfer.files;
  displayImage(image[0]);
});
function activeState() {
  draggableElement.classList.add("dragging");
}
function notActiveState() {
  draggableElement.classList.remove("dragging");
}
function displayImage(img) {
  const imgUrl = URL.createObjectURL(img);
  const avatarElement = draggableElement.querySelector("img");
  avatarElement.src = imgUrl;
}
