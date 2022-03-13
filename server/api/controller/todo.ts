import { Todo } from "../model";

const all = (_: any, res: any) => {
  try {
    Todo.find({ deleted: false }, (err: Error, data: any) => {
      if (err) throw err;
      res.status(200).json(data);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const find = (req: any, res: any) => {
  try {
    Todo.findById(req.params.id, (err: Error, data: any) => {
      if (err) throw err;
      res.status(200).json(data);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const insert = (req: any, res: any) => {
  try {
    Todo.create(req.body, (err: Error, data: any) => {
      if (err) throw err;
      res.status(200).json(data);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const update = (req: any, res: any) => {
  try {
    Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (err: Error, data: any) => {
        if (err) throw err;
        res.status(200).json(data);
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};

const remove = (req: any, res: any) => {
  try {
    Todo.findByIdAndUpdate(
      req.params.id,
      {
        deleted: true,
        new: true,
      },
      (err: Error, data: any) => {
        if (err) throw err;
        res.status(200).json(data);
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};

const recover = (req: any, res: any) => {
  try {
    Todo.findByIdAndUpdate(
      req.params.id,
      {
        deleted: false,
        new: true,
      },
      (err: Error, data: any) => {
        if (err) throw err;
        res.status(200).json(data);
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};

export default {
  all,
  find,
  insert,
  update,
  remove,
  recover,
}