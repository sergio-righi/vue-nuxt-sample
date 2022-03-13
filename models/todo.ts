import { helpers } from 'utils';

interface ITodo {
  _id?: string;
  name: string;
  createdAt: number;
  deleted: boolean;
}

class Todo implements ITodo {
  id?: string;
  name: string;
  createdAt: number;
  deleted: boolean;

  constructor(property: ITodo = { _id: helpers.objectId(), name: "", createdAt: Date.now(), deleted: false }) {
    this.id = property._id;
    this.name = property.name;
    this.createdAt = property.createdAt;
    this.deleted = property.deleted;
  }

  canCreate() {
    return true;
  }

  canUpdate() {
    return true;
  }
}

export default Todo