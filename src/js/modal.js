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

let modalElId = [5];

export async function modals() {
  try {
    const data = await apiService.getTrendingArticles();

    addModalInfo(data);
  } catch (error) {
    console.log(error);
  }
}
function addModalInfo(articles) {
  const modalElements = articles.map(element => {
    return element;
  });

  objectFilmInfo = { ...modalElements };

  modalEl.insertAdjacentHTML(
    'beforeend',
    modalInfoHbs(objectFilmInfo[modalElId])
  );
}

modals();
