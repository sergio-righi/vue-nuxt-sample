const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    deleted: {
      type: Boolean,
    },
  },
  { collection: "todos", timestamps: true }
);

module.exports = mongoose.model("Todo", schema);
