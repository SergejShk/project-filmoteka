const WATCED_FILMS_KEY = 'watched-films';
const QUEUE_FILMS_KEY = 'queue-films';

class LocalStorageHandle {
  constructor() {
    this.targetDataFilm = {};
    this.watchedDataFilm = [];
    this.queueDataFilms = [];
  }

  setToWatched() {
    if (this.checkExistFilmsInWatchedLocalStorage(this.targetDataFilm)) return;

    this.watchedDataFilm.push(this.targetDataFilm);
    localStorage.setItem(
      WATCED_FILMS_KEY,
      JSON.stringify(this.watchedDataFilm)
    );
  }
  getLocalStorageWatched() {
    const watchedFilmsData = localStorage.getItem(WATCED_FILMS_KEY);
    const parsedWatchedFilmsData = JSON.parse(watchedFilmsData) ?? [];
    this.watchedDataFilm = parsedWatchedFilmsData;
    return this.watchedDataFilm;
  }

  setToQueue() {
    if (this.checkExistFilmsInQueueLocalStorage(this.targetDataFilm)) return;

    this.queueDataFilms.push(this.targetDataFilm);
    localStorage.setItem(QUEUE_FILMS_KEY, JSON.stringify(this.queueDataFilms));
  }
  getLocalStorageQueue() {
    const queueFilmsData = localStorage.getItem(QUEUE_FILMS_KEY);
    const parsedQueueFilmsData = JSON.parse(queueFilmsData) ?? [];
    this.queueDataFilms = parsedQueueFilmsData;
    return this.queueDataFilms;
  }

  checkExistFilmsInQueueLocalStorage(article) {
    const AllQueueFilmsInLocalStorage = this.getLocalStorageQueue();
    const idsFilmsQueueLocalStorage = AllQueueFilmsInLocalStorage.map(
      film => film.id
    );
    if (!idsFilmsQueueLocalStorage.includes(article.id)) return false;
    return true;
  }
  checkExistFilmsInWatchedLocalStorage(article) {
    const AllWatchedFilmsInLocalStorage = this.getLocalStorageWatched();
    const idsFilmsWatchedLocalStorage = AllWatchedFilmsInLocalStorage.map(
      film => film.id
    );
    if (!idsFilmsWatchedLocalStorage.includes(article.id)) return false;
    return true;
  }

  removeWatchedFilm() {
    const checkExist = this.checkExistFilmsInWatchedLocalStorage(
      this.targetDataFilm
    );
    if (checkExist) {
      this.watchedDataFilm = this.watchedDataFilm.filter(
        film => film.id !== this.targetDataFilm.id
      );
      localStorage.setItem(
        WATCED_FILMS_KEY,
        JSON.stringify(this.watchedDataFilm)
      );
    }
  }
  removeQueueFilm() {
    const checkExist = this.checkExistFilmsInQueueLocalStorage(
      this.targetDataFilm
    );
    if (checkExist) {
      this.queueDataFilms = this.queueDataFilms.filter(
        film => film.id !== this.targetDataFilm.id
      );
      localStorage.setItem(
        QUEUE_FILMS_KEY,
        JSON.stringify(this.queueDataFilms)
      );
    }
  }
}

export default LocalStorageHandle;
