class homeContentView {
  constructor(model) {
    this.model = model;
  }

  showBasicTVData(response) {
    const detailText = document.getElementsByClassName('detail-text');

    for (let i = 0; i < this.model.totalDetailText; i += 1) {
      detailText[i].children[0].innerHTML = response.data.results[i].name;
    }

    const smallPic = document.querySelectorAll('.small-pic img');
    for (let i = 0; i < this.model.totalSmallPic; i += 1) {
      smallPic[i].src = `https://image.tmdb.org/t/p/w300/${response.data.results[i + 1].backdrop_path}`;
    }

    const bigPic = document.querySelectorAll('.big-pic > img');
    bigPic[0].src = `https://image.tmdb.org/t/p/w500/${response.data.results[0].backdrop_path}`;

    // image sizes are avialible here: https://developers.themoviedb.org/3/configuration/get-api-configuration
    // note that :w500 and w1920 are also supported for backdrops (https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400)
    const detailPic = document.getElementsByClassName('detail-pic');
    detailPic[0].src = `https://image.tmdb.org/t/p/w185/${response.data.results[0].poster_path}`;
  }

  showSpecificTVData(specificTVDataResponses) {
    const detailText = document.getElementsByClassName('detail-text');

    for (let i = 0; i < this.model.totalDetailText; i += 1) {
      const nextAirDate = specificTVDataResponses[i].data.next_episode_to_air.air_date;
      detailText[i].children[1].innerHTML = `Next episode: ${nextAirDate}`;
    }
  }

  showBasicOnTheatersData(response) {
    const title = document.querySelectorAll('.column:nth-child(2) .detail-text h2');
    let detailTextIndex = 2;
    for (let i = 0; i < this.model.totalDetailText; i += 1) {
      title[detailTextIndex].innerHTML = response.data.results[i].original_title;
      detailTextIndex -= 1;
    }

    let smallPicIndex = 0;
    const smallPic = document.querySelectorAll('.column:nth-child(2) .small-pic img');

    for (let i = 2; i > 0; i -= 1) {
      smallPic[smallPicIndex].src = `https://image.tmdb.org/t/p/w300/${response.data.results[i].backdrop_path}`;
      smallPicIndex += 1;
    }

    const bigPic = document.querySelectorAll('.big-pic > img');
    bigPic[1].src = `https://image.tmdb.org/t/p/w500/${response.data.results[0].backdrop_path}`;

    const detailPic = document.getElementsByClassName('detail-pic');
    detailPic[1].src = `https://image.tmdb.org/t/p/w185/${response.data.results[0].poster_path}`;
  }

  showSpecificOnTheatersData(specificMovieDetailResponses) {
    const cast = document.querySelectorAll('.column:nth-child(2) .detail-text h4');
    let castIndex = 2;
    for (let i = 0; i < this.model.totalDetailText; i += 1) {
      cast[castIndex].innerHTML = `${specificMovieDetailResponses[i].data.cast[0].name}, ${specificMovieDetailResponses[i].data.cast[1].name}`;
      castIndex -= 1;
    }
  }

  showTrendingMovies(response) {
    const trendingImage = document.getElementsByClassName('trending-img');
    const title = document.querySelectorAll('.trending-list li h3 ');
    const overview = document.querySelectorAll('.trending-list li p ');
    const totalImage = 3;
    for (let i = 0; i < totalImage; i += 1) {
      trendingImage[i].src = `https://image.tmdb.org/t/p/w154/${response.data.results[i].poster_path}`;
      title[i].innerHTML = `${response.data.results[i].original_title}`;
      overview[i].innerHTML = `${response.data.results[i].overview}`;
    }
  }

  closeLoader() {
    document.getElementsByClassName('loader')[0].style.display = 'none';
  }
}

export default homeContentView;
