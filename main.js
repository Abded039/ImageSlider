"use strict";

// selectors;

let prev = document.querySelector(".prev");
let activeImgDiv = document.querySelector(".activeImgDiv");
let next = document.querySelector(".next");
let imagesListDiv = document.querySelector(".imagesList");
let imagesList = document.querySelectorAll(".imagesList > img");
let hoverEffect = document.querySelector(".hoverEffect");
let trailer = document.querySelector(".trailer");
let volumeIcon = document.querySelector(".volumeIcon");

imagesList.forEach((image, index) => {
  image.classList.add(`img-${index}`);

  // default

  if (index == 0) {
    let current = document.querySelector(".img-0");
    current.classList.add("active");
    let defaultImg = document.createElement("img");
    defaultImg.src = current.src;
    defaultImg.classList.add("activeImg");
    activeImgDiv.appendChild(defaultImg);
  }

  // image click event
  image.addEventListener("click", (e) => {
    imagesList.forEach((img) => {
      if (img.classList.contains("active")) {
        img.classList.remove("active");
      }
      e.target.classList.add("active");
    });
    activeImgDiv.innerHTML = "";
    let targetedImg = e.currentTarget;
    let activeImg = document.createElement("img");
    activeImg.classList.add("activeImg");
    activeImg.src = targetedImg.src;
    activeImgDiv.appendChild(activeImg);
    clickEffect.volume = 0.1;
  });

  // image hover event
  image.addEventListener("mouseover", () => {
    hoverEffect.volume = 0.1;
    hoverEffect.play();
  });
});

// previous button
prev.addEventListener("click", (e) => {
  let currentActiveImage = document.querySelector("img.active");
  let currentIndexImage = [...imagesList].indexOf(currentActiveImage);
  --currentIndexImage;
  let previousImage = [...imagesList][currentIndexImage];
  imagesList.forEach((img) => {
    img.classList.remove("active");
  });

  if (currentIndexImage >= 0) {
    previousImage.classList.add("active");
    document.querySelector(".activeImg").src = previousImage.src;
  } else {
    document
      .querySelector(`.img-${imagesList.length - 1}`)
      .classList.add("active");
    document.querySelector(".activeImg").src = [...imagesList][
      imagesList.length - 1
    ].src;
    imagesListDiv.scrollLeft += 2500;
  }

  if (
    currentIndexImage == 4 ||
    currentIndexImage == 9 ||
    currentIndexImage == 14
  ) {
    imagesListDiv.scrollLeft -= 830;
  }
});

// next button

next.addEventListener("click", (e) => {
  let currentActiveImage = document.querySelector("img.active");
  let currentIndexImage = [...imagesList].indexOf(currentActiveImage);
  let nextImage = [...imagesList][++currentIndexImage];
  imagesList.forEach((img) => {
    img.classList.remove("active");
  });
  if (nextImage) {
    nextImage.classList.add("active");
    document.querySelector(".activeImg").src = nextImage.src;
  } else {
    document.querySelector(".img-0").classList.add("active");
    document.querySelector(".activeImg").src = [...imagesList][0].src;
    imagesListDiv.scrollLeft -= 2500;
  }

  if (
    currentIndexImage == 5 ||
    currentIndexImage == 10 ||
    currentIndexImage == 14
  ) {
    imagesListDiv.scrollLeft += 850;
  }
});

trailer.play();
trailer.volume = 0.1;

volumeIcon.addEventListener("click", () => {
  if (volumeIcon.classList.contains("fa-volume-high")) {
    volumeIcon.className = "fa-solid fa-volume-xmark volumeIcon";
    volumeIcon.style.color = "red";
    trailer.pause();
  } else {
    volumeIcon.className = "fa-solid fa-volume-high volumeIcon";
    volumeIcon.style.color = "white";
    trailer.play();
  }
});
