class SearchBoxModel {
  setTotalDataToShow(dataLength) {
    this.total = Math.min(dataLength, 10);
  }

  getTotalDataToShow() {
    return this.total;
  }
}

export default SearchBoxModel;
