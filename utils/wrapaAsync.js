// module.exports = (fn) => {
//     return (req, res, next) => {
//         fn(req, res, next);
//     }
// }
// utils/wrapAsync.js
module.exports = function (fn) {
    return function (req, res, next) {
      fn(req, res, next).catch(next); // Catch any error and pass it to the next middleware
    };
  };
  