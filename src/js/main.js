import ApiService from './api-service';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import articlesTpl from '../templates/articlesTpl.hbs';
const apiService = new ApiService();

const galleryListEl = document.querySelector('.gallery__grid');
const paginationBtnContainerEl = document.querySelector(
  '.pagination__container'
);

console.log(galleryListEl);
const handleQueryApi = async () => {
  try {
    Loading.circle('Loading...');
    const data = await apiService.getTrendingArticles();

    renderArticlesMarkup(data);
    Loading.remove();
  } catch (error) {
    Loading.remove();
    console.log(error);
  }
};

const renderArticlesMarkup = articles => {
  galleryListEl.innerHTML = articlesTpl(articles);
};

handleQueryApi();

const paginationBtnHandle = async e => {
  const textContentClickedBtn = e.target.textContent;

  if (!isNaN(textContentClickedBtn)) {
    apiService.changePage(textContentClickedBtn);
  }
  if (textContentClickedBtn === '-') {
    apiService.decrementPage();
  }
  if (textContentClickedBtn === '+') {
    apiService.incrementPage();
  }
  handleQueryApi();
};

paginationBtnContainerEl.addEventListener('click', paginationBtnHandle);
