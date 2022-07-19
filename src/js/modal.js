import ApiService from './api-service';
import modalInfoHbs from '../templates/modalInfo.hbs';
import LocalStorageHandle from './localeStorage';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import NormalizeDataApi from './normalize-data-api';
const apiService = new ApiService();
const localStorageHandle = new LocalStorageHandle();

const refs = {
  modal: document.querySelector('[data-modal]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  galleryList: document.querySelector('.gallery__grid'),
  modalContainer: document.querySelector('.modal__container'),
  btnAddToWatched: document.querySelector('.js-addToWatched'),
  btnAddToQueue: document.querySelector('.js-addToQueue'),
};

export function watchTrailer() {
  let idBtn = document.querySelector('.film__button');

  apiService.movieId = idBtn.dataset.id;

  apiService
    .getTrailers()
    .then(data => {
      let results = data.results[0];
      let key = results.key;
      return key;
    })
    .then(key => iframeRender(key));
}

function iframeRender(key) {
  const BASE_YOUTUBE_URL = 'https://www.youtube.com/embed/';
  const instance = basicLightbox.create(
    `<button type="button" id="youtube-close-btn"><i class="fa-regular fa-circle-xmark"></i></button><iframe
      src="${BASE_YOUTUBE_URL}${key}"?autoplay=1&mute=1&controls=1>
      </iframe>
    `,
    {
      onShow: instance => {
        instance.element().querySelector('#youtube-close-btn').onclick =
          instance.close;
      },
    }
  );

  instance.show();
}

const modalInfoEventHandle = e => {
  if (e.target.nodeName !== 'BUTTON') return;
  if (e.target.classList.contains('js-add-to-watched')) {
    localStorageHandle.setToWatched();
  }
  if (e.target.classList.contains('js-add-to-queue')) {
    localStorageHandle.setToQueue();
  }
};

const addEventListeners = () => {
  const modalInfoHandle = document.querySelector('.modal-info');

  modalInfoHandle.addEventListener('click', modalInfoEventHandle);
  refs.closeModalBtn.addEventListener('click', onCloseModal);
  window.addEventListener('keydown', onCloseModalKeyboard);
};

const onOpenModal = async e => {
  e.preventDefault();
  const idTargetItem = e.target.closest('li').dataset.id;

  const fullInfo = await apiService.getFullInfoById(idTargetItem);
  console.log(fullInfo);
  refs.modalContainer.innerHTML = modalInfoHbs(fullInfo);
  const youtubeBtn = document.querySelector('.film__trailer__btn');
  youtubeBtn.addEventListener('click', e => {
    e.preventDefault();
    watchTrailer();
  });

  refs.modal.classList.remove('is-hidden');
  localStorageHandle.targetDataFilm = fullInfo;
  refs.modalContainer.innerHTML = modalInfoHbs(normalizedInfo);
  const normalizedInfo = normalizeDataApi.updateDataFilmsLibrary(fullInfo);
  refs.modal.classList.remove('is-hidden');

  localStorageHandle.targetDataFilm = normalizedInfo;

  addEventListeners();
};

const onCloseModal = e => {
  refs.modal.classList.add('is-hidden');
  window.removeEventListener('keydown', onCloseModalKeyboard);
};

const onCloseModalKeyboard = e => {
  const isEscKey = e.code === 'Escape';
  if (!isEscKey) return;
  refs.modal.classList.add('is-hidden');
  window.removeEventListener('keydown', onCloseModalKeyboard);
};

refs.galleryList.addEventListener('click', onOpenModal);
