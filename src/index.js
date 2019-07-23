import './index.scss';
import '@babel/polyfill'; // Need it for promises
import SearchBoxView from './mvc/view/searchBoxView';
import SearchBoxModel from './mvc/model/searchBoxModel';
import SearchBoxController from './mvc/controller/searchBoxController';
import HomeContentView from './mvc/view/homeContentView';
import HomeContentModel from './mvc/model/homeContentModel';
import HomeContentController from './mvc/controller/homeContentController';

// usage of file loader of jpg, pngs, etc in webpack:
// import webpackimg from './img/webpack-img.jpg'
// const img = document.createElement("img")
// img.src = webpackimg
// document.body.appendChild(img)

// Helpful resources for promises and async/await:
// https://alligator.io/js/async-functions/ and https://www.codingame.com/playgrounds/347/javascript-promises-mastering-the-asynchronous/chaining-the-promises
const homeContentModel = new HomeContentModel();
const homeContentView = new HomeContentView(homeContentModel);
const homeContentController = new HomeContentController(homeContentView, homeContentModel);
homeContentController.loadHomePageContent();

const searchBoxView = new SearchBoxView();
const searchBoxModel = new SearchBoxModel();
const searchBoxController = new SearchBoxController(searchBoxView, searchBoxModel);
searchBoxController.handleDropdownDisplay();
searchBoxController.getTrendingDataAndShow();
searchBoxController.handleKeywordSearch();
