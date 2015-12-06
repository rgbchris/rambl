module.exports = {
  interpolate: function(str, val, indx) {
      return str.slice(0, indx) + val + str.slice(indx);
  }
}
