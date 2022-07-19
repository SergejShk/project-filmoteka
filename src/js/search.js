import ApiService from './api-service';
import { refs } from './refs';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import NormalizeDataApi from './normalize-data-api';
import HandleQueryTrendingApi from './handle-query-trending-api';
import RenderGallery from './render-gallery';

const apiService = new ApiService();
const renderTrending = new HandleQueryTrendingApi();
const normalizeDataApi = new NormalizeDataApi();
const renderGallery = new RenderGallery();

refs.form.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();
  apiService.page = 1;
  apiService.query = refs.formInput.value.trim();

  if (apiService.query === '') {
    refs.errWarning.classList.remove('visually-hidden');
    renderTrending.handleQueryTrendingDataApi();
    return;
  }
  refs.errWarning.classList.add('visually-hidden');

  try {
    Loading.circle('Loading...');
    const data = await apiService.getArticlesBySearch();
    if (data.results.length === 0) {
      refs.errWarning.classList.remove('visually-hidden');
      renderTrending.handleQueryTrendingDataApi();
      refs.formInput.value = '';
      return;
    }
    const genres = await apiService.getGenres();
    const normalizedData = await normalizeDataApi.updateDataTranding(data, genres);
    renderGallery.renderGalleryMarkup(normalizedData);
    refs.formInput.value = '';
    Loading.remove();

    return data;
  } catch (error) {
    Loading.remove();
    console.log(error);
  }
}
