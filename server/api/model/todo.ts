const mongoose = require('mongoose');

// interface ITodo {
//   name: string
//   deleted: boolean
// }

const schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    deleted: { type: Boolean, required: true },
  },
  { collection: "todos", timestamps: true }
);

module.exports = mongoose.model('Todo', schema);
