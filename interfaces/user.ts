export default interface UserType {
  _id?: string;
  name: string;
  email: string;
  username: string;
  password: string;
  roles: number[];
  validated: boolean;
  createdAt: number;
  deleted: boolean;
}