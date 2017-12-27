
const helper = {
  pad(number) {
    return ('0' + number).slice(-2);
  },
  humanNumber(number) {
    if (number > 1000 * 1000) {
      return (number / 1000 / 1000).toFixed(2) + 'M';
    }

    if (number > 1000) {
      return (number / 1000).toFixed(2) + 'K';
    }
    return number;
  },

  getTime(duration) {
    let minutes = Math.floor(duration / 1000 / 60);
    let second = Math.floor(duration / 1000 - minutes * 60);

    return `${this.pad(minutes)}: ${this.pad(second)}`;
  }
};

export default helper;