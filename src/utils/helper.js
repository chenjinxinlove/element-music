
const helper = {
  humanNumber(number) {
    if (number > 1000 * 1000) {
      return (number / 1000 / 1000).toFixed(2) + 'M';
    }

    if (number > 1000) {
      return (number / 1000).toFixed(2) + 'K';
    }
    return number;
  }
};

export default helper;