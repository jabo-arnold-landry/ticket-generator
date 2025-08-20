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
  }
});
