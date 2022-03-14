const Todo = require("../model/todo.ts");

const all = (_, res) => {
  try {
    Todo.find({ deleted: false }, (err, data) => {
      if (err) throw err;
      res.status(200).json(data);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const find = (req, res) => {
  try {
    Todo.findById(req.params.id, (err, data) => {
      if (err) throw err;
      res.status(200).json(data);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const insert = (req, res) => {
  try {
    Todo.create(req.body, (err, data) => {
      if (err) throw err;
      res.status(200).json(data);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const update = (req, res) => {
  try {
    Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      (err, data) => {
        if (err) throw err;
        res.status(200).json(data);
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};

const remove = (req, res) => {
  try {
    Todo.findByIdAndUpdate(
      req.params.id,
      {
        deleted: true,
        new: true,
      },
      (err, data) => {
        if (err) throw err;
        res.status(200).json(data);
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};

const recover = (req, res) => {
  try {
    Todo.findByIdAndUpdate(
      req.params.id,
      {
        deleted: false,
        new: true,
      },
      (err, data) => {
        if (err) throw err;
        res.status(200).json(data);
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  all,
  find,
  insert,
  update,
  remove,
  recover,
}