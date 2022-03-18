import { Todo } from "../models";

const all = (_: any, res: any) => {
  Todo.find({ deleted: false }, (err: Error, data: any) => {
    if (err) throw err;
    res.status(200).json(data);
  });
};

const find = (req: any, res: any) => {
  Todo.findById(req.params.id, (err: Error, data: any) => {
    if (err) throw err;
    res.status(200).json(data);
  });
};

const insert = (req: any, res: any) => {
  Todo.create(req.body, (err: Error, data: any) => {
    if (err) throw err;
    res.status(200).json(data);
  });
};

const update = (req: any, res: any) => {
  Todo.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, function (err, data) {
    if (err) throw err;
    res.status(200).json(data);
  });
};

const remove = (req: any, res: any) => {
  Todo.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true }, function (err, data) {
    if (err) throw err;
    res.status(200).json(data);
  });
};

const recover = (req: any, res: any) => {
  Todo.findByIdAndUpdate(req.params.id, { deleted: false }, { new: true }, function (err, data) {
    if (err) throw err;
    res.status(200).json(data);
  });
};

export default {
  all,
  find,
  insert,
  update,
  remove,
  recover,
}