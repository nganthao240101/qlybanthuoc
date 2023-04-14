export var sanitize = function (ignore = []) {
  return (req, res, next) => {
    var data = [];
    if (req.body) {
      data = Object.keys(req.body);
      for (var i = 0; i < data.length; i++) {
        if (
          ignore.indexOf(data[i]) == -1 &&
          typeof req.body[data[i]] == "string"
        )
          req.body[data[i]] = sanitize(req.body[data[i]]);
      }
    }
    if (req.params) {
      data = Object.keys(req.params);
      for (var i = 0; i < data.length; i++) {
        if (
          ignore.indexOf(data[i]) == -1 &&
          typeof req.params[data[i]] == "string"
        )
          req.params[data[i]] = sanitize(req.params[data[i]]);
      }
    }
    if (req.query) {
      data = Object.keys(req.query);
      for (var i = 0; i < data.length; i++) {
        if (
          ignore.indexOf(data[i]) == -1 &&
          typeof req.query[data[i]] == "string"
        )
          req.query[data[i]] = sanitize(req.query[data[i]]);
      }
    }
    next();
  };
};
