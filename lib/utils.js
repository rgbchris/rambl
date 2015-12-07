var parser = require('./lib/parser');

module.exports = {
  // string interpolation helper
  interpolate: function(str, val, indx) {
    return str.slice(0, indx) + val + str.slice(indx);
  },

  //
  backtracker: function(backtrackFlag, chain, str) {
    if (!backtrackFlag) return; 

    // Quantifier
    if (backtrackFlag === 'quantifier' &&  chain.slice(-1) === "}") {
      let indx  = chain.lastIndexOf("{");
      chain = this.interpolate(chain, parser(str), indx);
      this.backtrack = false;
      return true;
    } else {
      chain += parser(str);
    }
  }
}
