import axios from 'axios';
import API_KEY from '../../env';


class homeContentController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  async handleTVData() {
    const promises = [];
    const response = await axios.get(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`); // this promise basically has resolve(result)
    this.view.showBasicTVData(response);

    for (let i = 0; i < this.model.totalDetailText; i += 1) {
      promises.push(axios.get(`https://api.themoviedb.org/3/tv/${response.data.results[i].id}?api_key=${API_KEY}&language=en-US`));
    }

    const specificTVDataResponses = await Promise.all(promises);
    this.view.showSpecificTVData(specificTVDataResponses);
  }


  async handleOnTheatersData() {
    const promises = [];
    const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`);
    this.view.showBasicOnTheatersData(response);

    for (let i = 0; i < this.model.totalDetailText; i += 1) {
      promises.push(axios.get(`https://api.themoviedb.org/3/movie/${response.data.results[i].id}/credits?api_key=${API_KEY}&language=en-US`));
    }

    const movieDetailResponses = await Promise.all(promises);
    this.view.showSpecificOnTheatersData(movieDetailResponses);
  }

  async handleTrendingMoviesData() {
    const response = await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=267f6c03dccb4096c3b41afeb9ac7d26');
    this.view.showTrendingMovies(response);
  }

  loadHomePageContent() {
    // You could use async await, but this looks cleaner!
    // Otherwise, you would need a try, catch block;
    Promise.all([this.handleTVData(), this.handleOnTheatersData(),
      this.handleTrendingMoviesData()]).then(() => {
      this.view.closeLoader();
    }).catch((error) => {
      console.log(error);  //eslint-disable-line
    });
  }
}

export default homeContentController;
