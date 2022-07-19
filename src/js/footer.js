// import { comandFooter } from '../images/footer/comand-footer';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import footerTpl from '../templates/footerTpl.hbs';
import '../sass/index.scss';

// const imgContainer = document.querySelector('.gallery');
const modal = document.getElementById('myModal');
const modalCont = document.querySelector('.modal-content');

const btn = document.getElementById('myBtn');

const span = document.getElementsByClassName('close')[0];

let timerId = null;
btn.onclick = function (event) {
  event.preventDefault();
  modal.style.display = 'block';
  modalCont.classList.add('one');
  modalCont.classList.remove('out');
  clearInterval(timerId);
};

span.addEventListener('click', fetchArticles);

function fetchArticles() {
  modalCont.classList.add('out');
  modalCont.classList.remove('one');
  timerId = setInterval(() => {
    modal.style.display = 'none';
  }, 3000);
}

// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = 'none';
//   }
// };

new SimpleLightbox('.gallery a', {
  navText: ['&#5130;', '&#5125;'],
  animationSpeed: '250ms',
  captionPosition: 'bottom',
  captionsData: 'alt',
  captionDelay: '250ms',
});
