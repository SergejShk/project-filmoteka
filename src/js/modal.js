import ApiService from './api-service';
import modalInfoHbs from '../templates/modalInfo.hbs';

const modalEl = document.querySelector('.modal');

const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
};

refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);

function toggleModal() {
  refs.modal.classList.toggle('is-hidden');
}

const apiService = new ApiService();

let modalElId = [0];

export async function modals() {
  const data = await apiService.getTrendingArticles();

  const test = data.results;

  const modalElements = test.map(element => {
    return element;
  });

  objectFilmInfo = { ...modalElements };

  modalEl.insertAdjacentHTML(
    'beforeend',
    modalInfoHbs(objectFilmInfo[modalElId])
  );
}

modals();
