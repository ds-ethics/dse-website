document.addEventListener('DOMContentLoaded', function() {
    const slideshowImages_mob = document.querySelectorAll(".mobile-intro-slideshow img");

const nextImageDelay = 9000;
let currentImageCounter = 0; // setting a variable to keep track of the current image (slide)

// slideshowImages[currentImageCounter].style.display = "block";
slideshowImages_mob[currentImageCounter].style.opacity = 1;

setInterval(nextImage, nextImageDelay);

function nextImage() {
  // slideshowImages[currentImageCounter].style.display = "none";
  slideshowImages_mob[currentImageCounter].style.opacity = 0;

  currentImageCounter = (currentImageCounter+1) % slideshowImages_mob.length;

  // slideshowImages[currentImageCounter].style.display = "block";
  slideshowImages_mob[currentImageCounter].style.opacity = 1;
}

