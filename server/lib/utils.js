var utils = {};

utils.sleep = function(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
module.exports = utils;
