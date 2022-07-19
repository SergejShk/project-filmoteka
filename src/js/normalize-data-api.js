class NormalizeDataApi {
  constructor() {}

  updateDataFilmsLibrary(data) {
    this.updateDataGenreLibrary(data);
    this.updateReleaseDate(data);
    return data;
  }

  updateDataGenreLibrary(data) {
    data.genre_ids = data.genres.map(dataEl => ' ' + dataEl.name);
    data.genre_ids.splice(2);
    data.genre_ids.push(' Other');
    return data;
  }
  updateReleaseDate(data) {
    data.release_date = data.release_date.slice(0, 4);
    return data;
  }

  updateDataTranding(data, genres) {
    const newData = data.results.map(el => {
      for (let i = 0; i <= genres.length - 1; i += 1) {
        for (let k = 0; k <= el.genre_ids.length - 1; k += 1) {
          if (el.genre_ids[k] === genres[i].id) {
            el.genre_ids[k] = ' ' + genres[i].name;
          }
          if (el.genre_ids.length > 2) {
            el.genre_ids.splice(2);
            el.genre_ids.push(' Other');
          }
        }
      }
      this.updateReleaseDate(el);
      return el;
    });
    return newData;
  }
}

export default NormalizeDataApi;
