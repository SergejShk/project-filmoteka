const axios = require('axios').default;

class ApiService {
  constructor() {
    this.searchQuery = '';
  }

  async getTrendingArticles() {
    const URL = 'https://api.themoviedb.org/3/';
    const KEY = '82c59d753050746a09d77670604a0453';
    

    const response = await axios.get(
      `${URL}/trending/movie/week?api_key=${KEY}`
    );
    console.log(response.data.results);
    return response.data.results;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newSearchQuery) {
    this.searchQuery = newSearchQuery;
  }
}

export default ApiService;
