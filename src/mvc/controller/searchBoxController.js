import axios from 'axios';
import API_KEY from '../../env';

class SearchBoxController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  handleDropdownDisplay() {
    this.view.displayDropdown();
  }

  getTrendingDataAndShow() {
    axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`).then((response) => {
      this.model.setTotalDataToShow(response.data.results.length);
      this.view.generateTrendingViews(this.model.getTotalDataToShow(), response);
    });
  }

  handleKeywordSearch() {
    this.view.listenForKeywords(this);
  }

  getKeywordDataAndShow(keyword) {
    // Make a new timeout set to go off in 800ms
    axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US
      &query=${keyword}&page=1&include_adult=false`)
      .then((response) => {
        this.view.generateKeywordViews(this.model.getTotalDataToShow(), response);
      }).catch((error) => {
          console.log(error); //eslint-disable-line
      });
  }
}

export default SearchBoxController;
