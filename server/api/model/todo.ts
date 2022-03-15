import mongoose, { Schema } from 'mongoose';

interface ITodo {
  name: string
  deleted: boolean
}

const schema = new Schema<ITodo>(
  {
    name: { type: String, required: true },
    deleted: { type: Boolean, required: true },
  },
  { collection: "todos", timestamps: true }
);

export default mongoose.model<ITodo>('Todo', schema);
