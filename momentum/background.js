const images = ["0.jpeg", "1.jpeg", "2.jpeg", "3.jpeg", "4.png", "5.png"];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");

bgImage.id = "background";

bgImage.src = `img/${chosenImage}`;

document.body.appendChild(bgImage);
