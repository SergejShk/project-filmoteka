import ApiService from './api-service';
import { refs } from './refs.js';
import { getNormalizeData, handleQueryApi } from './main';
import articlesTpl from '../templates/articlesTpl.hbs';

const apiService = new ApiService();

refs.form.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  apiService.page = 1;
  apiService.query = refs.formInput.value.trim();

  if (apiService.query === '') {
    refs.errWarning.classList.remove('is-hidden');
    return;
  }

  apiService.getArticlesBySearch().then(data => {
    if (data.results.length === 0) {
      refs.errWarning.classList.remove('is-hidden');
    }

    // handleQueryApi(data.results);
    // getNormalizeData(data.results);
    refs.galleryListEl.innerHTML = articlesTpl(data.results);
  });
}
