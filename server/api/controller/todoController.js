const Todo = require("../model/todo");

exports.all = (req, res) => {
  try {
    Todo.find({ deleted: false }, function (err, resp) {
      if (err) throw err;
      res.status(200).json(resp);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.find = (req, res) => {
  try {
    Todo.findById(req.params.id, function (err, resp) {
      if (err) throw err;
      res.status(200).json(resp);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.insert = (req, res) => {
  try {
    Todo.create(req.body, function (err, resp) {
      if (err) throw err;
      res.status(200).json(resp);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.update = (req, res) => {
  try {
    Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      function (err, resp) {
        if (err) throw err;
        res.status(200).json(resp);
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.delete = (req, res) => {
  try {
    Todo.findByIdAndUpdate(
      req.params.id,
      {
        deleted: true,
        new: true,
      },
      function (err, resp) {
        if (err) throw err;
        res.status(200).json(resp);
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.recover = (req, res) => {
  try {
    Todo.findByIdAndUpdate(
      req.params.id,
      {
        deleted: false,
        new: true,
      },
      function (err, resp) {
        if (err) throw err;
        res.status(200).json(resp);
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};
