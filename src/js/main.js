import ApiService from './api-service';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import articlesTpl from '../templates/articlesTpl.hbs';

const apiService = new ApiService();

const galleryListEl = document.querySelector('.gallery__grid');

export const getNormalizeData = async (data, genres) => {
  const newData = data.results.map(el => {
    for (let i = 0; i <= genres.length - 1; i += 1) {
      for (let k = 0; k <= el.genre_ids.length - 1; k += 1) {
        if (el.genre_ids[k] === genres[i].id) {
          el.genre_ids[k] = ' ' + genres[i].name;
        }
      }
    }
    return el;
  });
  return newData;
};

export const handleQueryApi = async () => {
  try {
    Loading.circle('Loading...');
    const data = await apiService.getTrendingArticles();
    const genres = await apiService.getGenres();
    const normalizedData = await getNormalizeData(data, genres);
    console.log(normalizedData);
    renderArticlesMarkup(normalizedData);
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
