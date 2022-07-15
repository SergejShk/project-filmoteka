import ApiService from './api-service';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import articlesTpl from '../templates/articlesTpl.hbs';


const apiService = new ApiService();

const galleryListEl = document.querySelector('.gallery__grid');

const handleQueryApi = async () => {
  try {
    Loading.circle('Loading...');
    const data = await apiService.getTrendingArticles();

    renderArticlesMarkup(data.results);
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
