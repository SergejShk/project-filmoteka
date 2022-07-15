import ApiService from './api-service';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import articlesTpl from '../templates/articlesTpl.hbs';
import {modals} from './modal'
const apiService = new ApiService();

 


const galleryListEl = document.querySelector(".gallery__grid")

async function handleQueryApi() {
  try {
    Loading.circle('Loading...');
    const data = await apiService.getTrendingArticles();

    appendArticlesMarkup(data);
    Loading.remove();
  } catch (error) {
    Loading.remove();
    console.log(error);
  }
}

function appendArticlesMarkup(articles) {
  galleryListEl.innerHTML = articlesTpl(articles)
}
handleQueryApi()


