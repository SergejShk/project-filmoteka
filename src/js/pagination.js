import Pagination from 'tui-pagination';
import ApiService from './api-service';
import NormalizeDataApi from './normalize-data-api';
import articlesTpl from '../templates/articlesTpl.hbs';
// import HandleQueryTrendingApi from './handle-query-trending-api';

// const handleQueryTrendingApi = new HandleQueryTrendingApi();
const apiService = new ApiService();
const normalizeDataApi = new NormalizeDataApi();
const galleryListEl = document.querySelector('.gallery__grid');

let windowWidth = null;

if (window.innerWidth < 768) windowWidth = 4;
else if (window.innerWidth < 1200) windowWidth = 8;
else windowWidth = 9;

const container = document.getElementById('tui-pagination-container');
const pagination = new Pagination(container, {
  itemsPerPage: 9,
  visiblePages: 5,
  centerAlign: true,
  template: {
    currentPage: '<a class="page-btn is-selected">{{page}}</a>',
    page: '<a class="page-btn">{{page}}</a>',
    moveButton: `<button class="move-btn move-btn-{{type}}"></button>`,
    disabledMoveButton:
      '<button class="move-btn move-btn-{{type}} disabled" disabled></button>',
    moreButton: '<a class="page-btn next-is-ellip last-child">...</a>',
  },
});

pagination.on('afterMove', event => {
  const currentPage = event.page;
  fetchPerPage(currentPage);
});

async function fetchPerPage(page) {
  apiService.query = '';
  apiService.page = page;

  // const response = await handleQueryTrendingApi.handleQueryTrendingDataApi();

  const response = await apiService.getTrendingArticles();
  const genres = await apiService.getGenres();

  const normalizedData = await normalizeDataApi.updateDataTranding(
    response,
    genres
  );

  galleryListEl.innerHTML = articlesTpl(normalizedData);
  // console.log(response);
  if (page === 1) pagination.reset(response.total_results);

window.scroll({
  top: 0,
  left: 0,
  behavior: 'smooth'
});

}

document.onload = fetchPerPage(1);
