class SearchBoxView {
  displayDropdown() {
    window.addEventListener('click', (e) => {
      if (document.querySelector('.search-form > input').contains(e.target)) {
        document.getElementsByClassName('search-dropdown')[0].style.display = 'block';
      } else {
        document.getElementsByClassName('search-dropdown')[0].style.display = 'none';
      }
    });

    window.addEventListener('scroll', () => {
      document.getElementsByClassName('search-dropdown')[0].style.display = 'none';
    });
  }


  generateTrendingViews(dataLength, response) {
    const list = document.querySelector('.search-dropdown > ul');
    for (let i = 0; i < dataLength; i += 1) {
      let text;
      const node = document.createElement('li');

      if (response.data.results[i].original_title === undefined) {
        text = document.createTextNode(`${response.data.results[i].name}`);
      } else {
        text = document.createTextNode(`${response.data.results[i].original_title}`);
      }
      node.appendChild(text);
      list.appendChild(node);
    }
  }

  listenForKeywords(controller) {
    // Init a timeout variable to be used below
    let timeout = null;
    // Listen for keystroke events
    const searchBox = document.querySelector('.search-form > input');
    searchBox.onkeyup = () => {
      // Clear the timeout if it has already been set.
      // This will prevent the previous task from executing
      // if it has been less than <MILLISECONDS>
      clearTimeout(timeout);
      // remove all child inside <ul>
      const list = document.querySelector('.search-dropdown > ul');
      const trendingSearchesHeader = document.querySelector('.search-dropdown > h1');
      trendingSearchesHeader.style.display = 'none';

      while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
      }

      // Make a new timeout set to go off in 800ms
      timeout = setTimeout(() => {
        if (searchBox.value !== '') {
          controller.getKeywordDataAndShow(searchBox.value);
        }
      }, 500);

    }
  }

  generateKeywordViews(dataLength, response) {
    const list = document.querySelector('.search-dropdown > ul');
    for (let i = 0; i < dataLength; i += 1) {
      const node = document.createElement('li');
      let text;
      if (response.data.results[i].media_type === 'movie') {
        text = document.createTextNode(`${response.data.results[i].title} (Movie)`);
      } else if (response.data.results[i].media_type === 'person') {
        text = document.createTextNode(`${response.data.results[i].name} (Person)`);
      } else {
        text = document.createTextNode(`${response.data.results[i].name} (Show)`);
      }
      node.appendChild(text);
      list.appendChild(node);
    }
  }
}

export default SearchBoxView;
