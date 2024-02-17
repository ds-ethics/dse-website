const nextSectionButton = document.querySelector('.btn_fer');
const sections = document.querySelectorAll('.intro_f');
let currentSectionIndex = 0;

nextSectionButton.addEventListener('click', () => {
  sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
  currentSectionIndex = (currentSectionIndex + 1) % sections.length;
});
